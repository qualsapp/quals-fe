import { DateRange } from "react-day-picker";

export type EventParams = {
  community_id: string;
  event_id?: string;
  type: string;
  name: string;
  sport: string;
  location: string;
  description: string;
  dates: DateRange | Date;
  isRepeat: boolean;
};

export type RulesParams = {
  game_mode: string;
  seat_per_group: number;
  score_type?: string;
  total_sets?: string;
  match_type?: string;
  final_point?: string;
};

export interface EventResponse
  extends Omit<EventParams, "dates" | "community_id" | "event_id"> {
  id: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
}
