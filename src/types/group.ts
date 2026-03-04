import { MatchResponse } from "./match";

export type GroupsResponse = GroupResponse[];

export type GroupResponse = {
  id: number;
  name: string;
  participants: {
    id: number;
    name: string;
    type: "single" | "double";
  }[];
  matches: MatchResponse[];
  error?: string;
};

export type GroupParticipantsParams = {
  participant_ids: number[];
};
