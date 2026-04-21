import { ApiUrl } from "./env";
import { getCookies } from "@/actions/helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiRequestInit extends RequestInit {
  params?: Record<string, any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

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
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url, config);

  console.log("API Response:", response);

  const json = await response.json();
  console.log("API Response:", json);

  if (json) {
    return json as T;
  } else {
    return Promise.reject(response);
  }
}
