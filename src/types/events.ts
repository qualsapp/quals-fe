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
  id?: string | number;
  community_id?: string;
  event_id?: string;
  seat_per_group: number | string;
  score_type?: string;
  total_sets?: string;
  match_type?: string;
  final_point?: string;
};

export interface EventResponse extends Omit<
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

export interface EventsResponse {
  events: EventResponse[];
}

export type MatchRule = {
  id: number;
  scoring_system: string;
  max_point_per_set: number;
  deuce: boolean;
  max_deuce_point: number;
  best_of_sets: number;
  race_to: number;
};

export interface RuleParams extends Omit<MatchRule, "id"> {
  format: string;
  category: string;
  total_participants: number;
  groups_count: number;
  seat_per_group: number;
  top_advancing_group: number;
}

export interface RulesResponse extends RuleParams {
  id: number;
  event: EventResponse;
  match_rule: MatchRule;
}
