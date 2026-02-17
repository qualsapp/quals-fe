import { BracketsResponse, MatchRuleResponse, Participant } from "./tournament";

export type MatchParams = {
  participant_a_id: number;
  participant_b_id: number;
  court_number: number;
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
  tournament_bracket: BracketsResponse;
  tournament_group: null;
  match_rule: MatchRuleResponse;
  participant_a: Participant;
  participant_b: Participant;
  winner: string | null;
  status: string;
  court_number: number;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  match_sets: string | null;
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
