export type GroupsResponse = GroupResponse[];

export type GroupResponse = {
  id: number;
  name: string;
  participants: {
    id: number;
    name: string;
    type: "single" | "double";
  }[];
  matches: null;
  error?: string;
};

export type GroupParticipantsParams = {
  participant_ids: number[];
};
