"use client";

// src/lib/api-client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // e.g. https://api.stripe.com/v1

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

  console.log("API Request Config:", { endpoint, config });

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...headers,
  //   },
  // });
  console.log("API Request:", response);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
