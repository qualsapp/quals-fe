import { ApiUrl } from "./env";
import { getCookies } from "@/actions/helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiRequestInit extends RequestInit {
  params?: Record<string, any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Thrown by apiClient on any non-2xx response. Carries the HTTP status and the
// parsed error body so callers (and the Sentry chokepoint) can branch on it.
export class ApiClientError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.body = body;
  }
}

// Pulls a human-readable message out of the backend's JSON error body
// (the gateway returns `{ error: ... }` / `{ message: ... }`).
function extractMessage(body: unknown): string | undefined {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (typeof record.error === "string") return record.error;
    if (typeof record.message === "string") return record.message;
  }
  return undefined;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestInit = {},
): Promise<T> {
  const token = await getCookies();
  const { headers, params, body, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...(token?.value && { Authorization: `Bearer ${token?.value}` }),
    },
    body: body,
    // Next.js 14+ caching strategy
    cache: options.cache || "no-store",
  };
  const url = new URL(`${ApiUrl}${endpoint}`);
  // Build the query string manually: passing params straight to URLSearchParams
  // serializes undefined/null as the literal strings "undefined"/"null" (which
  // the backend then rejects, e.g. tournament_id=undefined → 400). Skip them.
  if (params) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        search.set(key, String(value));
      }
    }
    url.search = search.toString();
  }

  let response: Response;
  try {
    response = await fetch(url, config);
  } catch (cause) {
    // fetch() rejects (e.g. TypeError "fetch failed") when no response is
    // received at all — backend down, connection refused, DNS, offline.
    // status 0 marks "never reached the server"; surface a clear message.
    return Promise.reject(
      new ApiClientError(
        "Unable to reach the server. Please check your connection and try again.",
        0,
        cause,
      ),
    );
  }

  // Read the body once as text, then parse: tolerates empty bodies (e.g. 204)
  // and non-JSON error pages without throwing here.
  const rawBody = await response.text();
  let json: unknown = null;
  if (rawBody) {
    try {
      json = JSON.parse(rawBody);
    } catch {
      json = null;
    }
  }

  if (!response.ok) {
    const message =
      extractMessage(json) ||
      response.statusText ||
      `Request failed with status ${response.status}`;
    return Promise.reject(new ApiClientError(message, response.status, json));
  }

  return json as T;
}
