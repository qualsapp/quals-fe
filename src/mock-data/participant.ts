import { Participant, ParticipantsResponse } from "../types/tournament";

export const dummyParticipants: Participant[] = [
  { id: 1, name: "Alice Johnson", type: "PLAYER" },
  { id: 2, name: "Bob Smith", type: "PLAYER" },
  { id: 3, name: "Charlie Davis", type: "PLAYER" },
  { id: 4, name: "Diana Prince", type: "PLAYER" },
  { id: 5, name: "Ethan Hunt", type: "PLAYER" },
  { id: 6, name: "Fiona Gallagher", type: "PLAYER" },
  { id: 7, name: "George Costanza", type: "PLAYER" },
  { id: 8, name: "Hannah Abbott", type: "PLAYER" },
  { id: 9, name: "Ian McShane", type: "PLAYER" },
  { id: 10, name: "Jane Doe", type: "PLAYER" },
];

export const dummyParticipantsResponse: ParticipantsResponse = {
  participants: dummyParticipants,
  page: 1,
  page_size: 10,
  total: 10,
};
