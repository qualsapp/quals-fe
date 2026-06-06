import { getEvent } from "@/actions/event";
import { getTournamentParticipants } from "@/actions/tournament";
import ParticipantsManager from "@/components/participant/participants-manager";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event?.tournament) {
    return (
      <div className="container py-10 md:py-16">No tournament found</div>
    );
  }

  const tournament = event.tournament;
  // MANUAL tournaments are host-managed (add/remove); AUTO is view-only.
  const editable = tournament.mode === "MANUAL";

  const participantsResponse = await getTournamentParticipants(
    String(tournament.id),
    {
      page: 1,
      page_size: 100,
    },
  );

  const perSlot =
    tournament.category === "double" || tournament.category === "mixed"
      ? 2
      : 1;
  const maxParticipants = Math.floor(
    Number(tournament.participants_count) / perSlot,
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
