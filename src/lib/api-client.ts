import { ApiUrl } from "./env";

export interface ApiRequestInit extends RequestInit {
  params?: Record<string, any>;
  paramsSerializer?: (params: any) => string;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestInit = {},
): Promise<T> {
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
    headers: headers,
    body: body,
    // Next.js 14+ caching strategy
    cache: options.cache || "no-store",
  };

  const response = await fetch(`${ApiUrl}${endpoint}${queryString}`, config);

  if (!response.ok) {
    // Try to parse the error message if possible
    try {
      const errorData = await response.json();
      return Promise.reject(errorData);
    } catch {
      return Promise.reject(response);
    }
  }

  return response.json();
}
