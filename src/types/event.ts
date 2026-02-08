import { DateRange } from "react-day-picker";
import { Sport } from "./global";
import { TournamentResponse } from "./tournament";

export type EventParams = {
  event_type: string;
  title: string;
  sport_type_id: number;
  location: string;
  description: string;
  dates?: DateRange | Date;
  start_time?: string;
  end_time?: string;
  isRepeat?: boolean;
};

export type EventResponse = Omit<EventParams, "dates"> & {
  id: string;
  start_date: string;
  end_date: string;
  sport_type: Sport;
  tournament?: TournamentResponse;
  error?: string;
};

export type EventsResponse = {
  events: EventResponse[];
  page: number;
  page_size: number;
  total: number;
  error?: string;
};

// export interface EventResponse extends Omit<
//   EventParams,
//   "dates" | "community_id" | "event_id" | "sport_type_id"
// > {
//   id: string;
//   start_date: string;
//   end_date: string;
//   sport_type: Sport;
//   tournament: TournamentResponse;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface EventsResponse {
//   events: EventResponse[];
// }
