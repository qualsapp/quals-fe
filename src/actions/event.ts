"use server";
import { apiClient } from "@/lib/api-client";
import { EventParams, EventResponse, EventsResponse } from "@/types/event";
import { errorHandler } from "@/lib/error-handler";
import { Sport } from "@/types/global";

export const getEvents = async ({
  page,
  page_size,
  filter,
}: {
  page: number;
  page_size: number;
  filter?: {
    status?: string;
    sport_type?: string;
  };
}): Promise<EventsResponse> => {
  try {
    const response = await apiClient<EventsResponse>("/events", {
      method: "GET",
      params: {
        page,
        page_size,
        ...(filter ? filter : {}),
      },
    });

    return response;
  } catch (error: unknown) {
    return {
      events: [],
      page: 0,
      page_size: 0,
      total: 0,
      error: errorHandler(error, "Failed to fetch events"),
    };
  }
};

export const getEvent = async (eventId: string): Promise<EventResponse> => {
  try {
    const response = await apiClient<EventResponse>(`/events/${eventId}`, {
      method: "GET",
    });

    return response;
  } catch (error: unknown) {
    return {
      id: "",
      community_id: "",
      start_date: "",
      end_date: "",
      sport_type: {} as Sport,
      event_type: "",
      title: "",
      sport_type_id: 0,
      location: "",
      description: "",
      is_player_joined: false,
      error: errorHandler(error, "Failed to fetch event details"),
    } as EventResponse;
  }
};

export const createEvent = async (
  params: EventParams,
): Promise<EventResponse> => {
  try {
    const response = await apiClient<EventResponse>("/events", {
      method: "POST",
      body: JSON.stringify(params),
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to create event"),
    } as EventResponse;
  }
};

export const updateEvent = async (
  params: EventParams,
  eventId: string,
): Promise<EventResponse> => {
  try {
    const response = await apiClient<EventResponse>(`/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(params),
    });

    return response;
  } catch (error: unknown) {
    return {
      error: errorHandler(error, "Failed to update event"),
    } as EventResponse;
  }
};

export const deleteEvent = async (
  eventId: string,
): Promise<{ message: string; error?: string }> => {
  try {
    const response = await apiClient<{ message: string }>(
      `/events/${eventId}`,
      {
        method: "DELETE",
      },
    );

    return response;
  } catch (error: unknown) {
    return {
      message: "",
      error: errorHandler(error, "Failed to delete event"),
    };
  }
};
