import { BracketResponse, MatchRuleResponse, Participant } from "./tournament";

export type MatchParams = {
  participant_a_id: number;
  participant_b_id: number;
  court_number: number;
};

export type MatchSetParams = {
  current_server?: string;
  point_winner?: string;
  score_side?: string;
};

export type MatchSetModel = {
  id: number;
  match_id: number;
  set_score_a: number;
  set_score_b: number;
  current_point_a: number;
  current_point_b: number;
  current_point_display_a: string;
  current_point_display_b: string;
  set_number: number;
  current_server: string;
  second_service: boolean;
  is_tiebreak: boolean;
  is_finished: boolean;
  is_deuce: boolean;
  deuce_mode: string | null;
  winner_side: string;
  match_score_a: number;
  match_score_b: number;
  can_activate_tiebreak: boolean;
  needs_deuce_decision: boolean;
  games: MatchSetModel | null;
  updated_at: string;
};

export type GroupParticipantParams = {
  tournament_group_id: number;
  participant_ids: number[];
};

export type MatchResponse = Omit<
  MatchParams,
  "participant_a" | "participant_b"
> & {
  id: number;
  tournament_bracket: BracketResponse;
  tournament_group: null;
  match_rule: MatchRuleResponse;
  participant_a: Participant;
  participant_b: Participant;
  winner: Participant | null;
  status: string;
  court_number: number;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  match_sets: MatchSetModel[] | null;
  error?: string;
};

export type MatchesResponse = {
  matches: MatchResponse[];
  page: number;
  page_size: number;
  total: number;
  error?: string;
};

// old

export type ParticipantParams = {
  id: number;
  name: string;
  type: string;
};

// export type MatchParams = {
//   id: number;
//   tournament_bracket_id: number;
//   tournament_group_id: number;
//   match_rule_id: number;
//   participant_a: ParticipantParams;
//   participant_b: ParticipantParams;
//   status: string;
//   court_number: number;
//   match_sets: string | null;
// };

// export type MatchesResponse = {
//   matches: MatchParams[];
//   page: number;
//   page_size: number;
//   total: number;
// };
