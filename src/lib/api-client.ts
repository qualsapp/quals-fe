import { logout } from "@/actions/auth";
import { ApiUrl } from "./env";
import { getCookies } from "@/actions/helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiRequestInit extends RequestInit {
  params?: Record<string, any>;
  paramsSerializer?: (params: any) => string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestInit = {},
): Promise<T> {
  const token = await getCookies();
  const { headers, params, paramsSerializer, body, ...customConfig } = options;

  let queryString = "";
  if (params) {
    if (paramsSerializer) {
      queryString = `?${paramsSerializer(params)}`;
    } else {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      queryString = `?${searchParams.toString()}`;
    }
  }

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

  if (!response.ok) {
    try {
      const errorData = await response.json();
      if (response.status === 401) {
        console.log("401");
        logout();
      }
      return Promise.reject(errorData);
    } catch {
      return Promise.reject(response);
    }
  }

  return response.json();
}
