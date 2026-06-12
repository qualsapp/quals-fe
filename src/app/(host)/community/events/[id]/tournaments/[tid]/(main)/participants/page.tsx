import {
  getTournament,
  getTournamentParticipants,
} from "@/actions/tournament";
import { getEvent } from "@/actions/event";
import ParticipantsManager from "@/components/participant/participants-manager";
import { TournamentResponse } from "@/types/tournament";
import { FilterParams } from "@/types/global";

import React from "react";

type Props = {
  params: Promise<{ id: string; tid: string }>;
  searchParams: Promise<FilterParams>;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const perSlot = (category: string) =>
  category === "double" || category === "mixed" ? 2 : 1;

const page = async ({ params, searchParams }: Props) => {
  const { id, tid } = await params;
  const { all_tournaments } = await searchParams;

  if (all_tournaments === "true") {
    const event = await getEvent(id);
    const tournaments = event?.tournaments || [];

    const groups = await Promise.all(
      tournaments.map(async (t) => {
        const participantsResponse = await getTournamentParticipants(
          String(t.id),
          { page: 1, page_size: 100 },
        );
        const slots = perSlot(t.category);
        const max = Math.floor(Number(t.participants_count) / slots);
        return { tournament: t, participants: participantsResponse.participants || [], max };
      }),
    );

    return (
      <div className="container flex flex-col gap-12 py-10 md:py-16">
        {groups.map(({ tournament, participants, max }) => (
          <div key={tournament.id} className="space-y-4">
            <h2 className="text-xl font-bold capitalize border-b-2 border-primary pb-2">
              {tournamentLabel(tournament)}
            </h2>
            <ParticipantsManager
              tournamentId={String(tournament.id)}
              category={tournament.category}
              participants={participants}
              maxParticipants={max}
              editable={false}
            />
          </div>
        ))}
      </div>
    );
  }

  const tournament = await getTournament(tid);

  if (!tournament?.id || tournament.error) {
    return <div className="container py-10 md:py-16">No tournament found</div>;
  }

  // MANUAL tournaments are host-managed (add/remove); AUTO is view-only.
  const editable = tournament.mode === "MANUAL";

  const participantsResponse = await getTournamentParticipants(
    String(tournament.id),
    {
      page: 1,
      page_size: 100,
    },
  );

  const slots = perSlot(tournament.category);
  const maxParticipants = Math.floor(
    Number(tournament.participants_count) / slots,
  );

  return (
    <div className="container flex flex-col items-center py-10 md:py-16">
      <ParticipantsManager
        tournamentId={String(tournament.id)}
        category={tournament.category}
        participants={participantsResponse.participants || []}
        maxParticipants={maxParticipants}
        editable={editable}
      />
    </div>
  );
};

export default page;
