import { DateRange } from "react-day-picker";
import { Sport } from "./global";

export type EventParams = {
  community_id: string;
  event_id?: string;
  event_type: string;
  title: string;
  sport_type_id: string;
  location: string;
  description: string;
  dates?: DateRange | Date;
  start_time?: string;
  end_time?: string;
  isRepeat?: boolean;
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
  extends Omit<
    EventParams,
    "dates" | "community_id" | "event_id" | "sport_type_id"
  > {
  id: string;
  start_date: string;
  end_date: string;
  sport_type: Sport;
  createdAt: string;
  updatedAt: string;
}
