import { ApiUrl } from "./env";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // Next.js 14+ caching strategy
    cache: options.cache || "no-store",
  };

  const response = await fetch(`${ApiUrl}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function internalApiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // Next.js 14+ caching strategy
    cache: options.cache || "no-store",
  };

  const response = await fetch(`${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
