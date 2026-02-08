import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { EventParams, EventResponse, EventsResponse } from "@/types/event";

export const getEvents = async (): Promise<EventsResponse> => {
  const token = await getCookies();

  const response = await apiClient<EventsResponse>("/events", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const getEvent = async (eventId: string): Promise<EventResponse> => {
  const token = await getCookies();

  const response = await apiClient<EventResponse>(`/events/${eventId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};

export const createEvent = async (
  params: EventParams,
): Promise<EventResponse> => {
  const token = await getCookies();

  const response = await apiClient<EventResponse>("/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(params),
  });

  return response;
};

export const updateEvent = async (
  params: EventParams,
  eventId: string,
): Promise<EventResponse> => {
  const token = await getCookies();

  const response = await apiClient<EventResponse>(`/events/${eventId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    body: JSON.stringify(params),
  });

  return response;
};

export const deleteEvent = async (
  eventId: string,
): Promise<{ message: string }> => {
  const token = await getCookies();

  const response = await apiClient<{ message: string }>(`/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response;
};
