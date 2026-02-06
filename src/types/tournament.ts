export interface TournamentResponse extends GeneralRuleParams {
  id: string;
  event_id: string;
  match_rule: MatchRuleResponse;
  tournament_brackets: TournamentBracketsResponse[];
}

export interface TournamentBracketsResponse {
  id: number;
  round: number;
  match_number: number;
  next_bracket_id: number;
  participants: Participant[];
}

export interface MatchRuleResponse extends MatchRule {
  id: number;
}

export interface TournamentParams extends GeneralRuleParams, MatchRule {
  community_id: string;
  event_id: string;
  id?: string;
}

export interface GeneralRuleParams {
  format: string;
  category: string;
  participants_count: number;
  groups_count?: number;
  seat_per_group?: number;
  top_advancing_group?: number;
  courts_count: number;
}

export type MatchRule = {
  deuce?: boolean;
  max_deuce_point?: number;
  scoring_system?: string;
  max_point_per_set?: number;
  best_of_sets?: number;
  race_to?: number;
};

export interface ParticipantsResponse {
  participants: Participant[];
  page: number;
  page_size: number;
  total: number;
}

export interface Participant {
  id: number;
  name: string;
  type: string;
  score: number;
  seed: number;
  isWinner: boolean;
}
