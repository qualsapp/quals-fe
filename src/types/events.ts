import { DateRange } from "react-day-picker";
import { Sport } from "./global";

export type EventParams = {
  community_id?: string;
  event_id?: string;
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

export type RulesParams = {
  id?: string | number;
  community_id?: string;
  event_id?: string;
  format?: string;
  courts_count: number;
  category: string;
  participants_count: number;
  grouping?: boolean;
  groups_count?: number;
  seat_per_group?: number;
  top_advancing_group?: number;
  deuce: boolean;
  max_deuce_point?: number;
  scoring_system?: string;
  max_point_per_set?: number;
  best_of_sets?: number;
  race_to?: number;
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
  max_deuce_point: number;
  scoring_system: string;
  max_point_per_set: number;
  best_of_sets: number;
  race_to: number;
};

export interface RuleParams extends Omit<MatchRule, "id"> {
  courts_count: number;
  category: string;
  participants_count: number;
  grouping: boolean;
  groups_count: number;
  seat_per_group: number;
  top_advancing_group: number;
  deuce: boolean;
}

export interface RulesResponse extends RuleParams {
  id: number;
  event: EventResponse;
  match_rule: MatchRule;
}
