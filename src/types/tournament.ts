import { GroupResponse } from "./group";

export type MatchRuleParams = {
  deuce?: boolean;
  max_deuce_point?: number;
  scoring_system?: string;
  max_point_per_set?: number;
  best_of_sets?: number;
  race_to?: number;
};

export interface TournamentParams {
  format: string;
  category: string;
  participants_count: number;
  groups_count?: number;
  seat_per_group?: number;
  top_advancing_group?: number;
  courts_count: number;
}

export interface Participant {
  id: number;
  name: string;
  type: string;
  score: number;
  seed: number;
  isWinner: boolean;
}

export interface MatchRuleResponse extends MatchRuleParams {
  id: number;
  error?: string;
  message?: string;
}

export interface TournamentResponse extends TournamentParams {
  id: string;
  event_id: string;
  match_rule: MatchRuleResponse;
  tournament_brackets: TournamentBracketsResponse[];
  tournament_groups: TournamentGroupsResponse[];
  error?: string;
  message?: string;
}

export interface TournamentGroupParams {
  tournament_group_id: number;
  participant_ids: number[];
}

export interface TournamentGroupsResponse {
  id: number;
  tournament_id: number;
  participants: Participant[];
  error?: string;
  message?: string;
}

export interface TournamentBracketsResponse {
  id: number;
  round: number;
  match_number: number;
  next_bracket_id: number;
  participants: Participant[];
  error?: string;
  message?: string;
}

export interface ParticipantsResponse {
  participants: Participant[];
  page: number;
  page_size: number;
  total: number;
  error?: string;
  message?: string;
}

export type JoinTournamentParams = {
  participant: number[];
};

export interface JoinTournamentResponse {
  id?: number;
  name?: string;
  type?: "single" | "double";
  code?: string;
  error?: string;
}

export interface MatchResponse {
  id: number;
  completed_at: string | null;
  court_number: number;
  participant_a: Participant;
  participant_b: Participant;
  next_bracket_id: number;
  scheduled_at: string | null;
  started_at: string | null;
  status: string;
  winner: Participant | null;
}

export interface DetailMatchResponse extends MatchResponse {
  tournament_bracket: BracketResponse;
  tournament_group: GroupResponse;
  match_rule: MatchRuleResponse;
  error?: string;
}

export interface BracketResponse {
  id: number;
  match_number: number;
  round: number;
  next_bracket_id: number;
  matches: MatchResponse;
}

export type BracketsResponse = {
  id: number;
  match_number: number;
  round: number;
  next_bracket_id: number;
  match: MatchResponse;
}[];
