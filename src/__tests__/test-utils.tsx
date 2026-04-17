/* eslint-disable  */

import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

// Create a custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Mock data factories
export const mockCommunity = {
  id: 1,
  name: "Test Community",
  description: "A test community for badminton",
  sport_type: "badminton",
  location: "Test Location",
  members_count: 10,
  created_at: "2024-01-01",
};

export const mockEvent = {
  id: 1,
  name: "Test Tournament",
  description: "A test tournament",
  type: "tournament",
  sport_type: "badminton",
  start_date: "2024-03-10",
  end_date: "2024-03-11",
  location: "Test Venue",
  max_participants: 16,
  current_participants: 8,
  community_id: 1,
};

export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "player",
};

// Test helpers
export const createMockFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

// Simple test to prevent Jest error
describe("test-utils", () => {
  it("should export render function", () => {
    expect(typeof customRender).toBe("function");
  });
});
/* eslint-enable  */
