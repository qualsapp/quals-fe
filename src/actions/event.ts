"use server";
import { apiClient } from "@/lib/api-client";
import { getCookies } from "./helper";
import { EventParams, EventResponse, EventsResponse } from "@/types/event";

export const getEvents = async (): Promise<EventsResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<EventsResponse>("/events", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      events: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: error?.message || "Failed to fetch events",
    };
  }
};

export const getEvent = async (eventId: string): Promise<EventResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<EventResponse>(`/events/${eventId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return response;
  } catch (error: any) {
    return {
      id: "",
      community_id: "",
      start_date: "",
      end_date: "",
      sport_type: {} as any,
      event_type: "",
      title: "",
      sport_type_id: 0,
      location: "",
      description: "",
      error: error?.message || "Failed to fetch event details",
    } as EventResponse;
  }
};

export const createEvent = async (
  params: EventParams,
): Promise<EventResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<EventResponse>("/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(params),
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to create event",
    } as EventResponse;
  }
};

export const updateEvent = async (
  params: EventParams,
  eventId: string,
): Promise<EventResponse> => {
  const token = await getCookies();

  try {
    const response = await apiClient<EventResponse>(`/events/${eventId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(params),
    });

    return response;
  } catch (error: any) {
    return {
      error: error?.message || "Failed to update event",
    } as EventResponse;
  }
};

export const deleteEvent = async (
  eventId: string,
): Promise<{ message: string; error?: string }> => {
  const token = await getCookies();

  try {
    const response = await apiClient<{ message: string }>(
      `/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return response;
  } catch (error: any) {
    return {
      message: "",
      error: error?.message || "Failed to delete event",
    };
  }
};
