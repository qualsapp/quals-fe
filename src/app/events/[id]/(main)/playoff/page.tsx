import React from "react";

import TournamentBracket from "@/components/commons/tournament-bracket";

import { getHostProfile } from "@/actions/host";
import { getEvent } from "@/actions/event";
import { getTournament } from "@/actions/tournament";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const { community } = await getHostProfile();

  const event = await getEvent(id);

  if (!event.tournament?.id) {
    return <div>No tournament found</div>;
  }

  const tournament = await getTournament(community.id, id, event.tournament.id);

  const matchData = tournament?.tournament_brackets.map((match) => {
    return {
      id: match.id,
      round: match.round,
      name: `Match ${match.match_number}`,
      tournamentRoundText: match.round,
      match_number: match.match_number,
      nextMatchId: match.next_bracket_id,
      nextLooserMatchId: null,
      state: "SCHEDULED",
      participants:
        match.participants?.length > 0
          ? match.participants.map((participant) => {
              return {
                id: participant.id,
                name: participant.name,
                score: participant?.score || null,
                seed: participant?.seed || null,
                isWinner: participant?.isWinner || null,
              };
            })
          : [],
      startTime: "",
    };
  });

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex-col space-y-10">
        <TournamentBracket
          matches={matchData}
          communityId={community.id}
          event={event}
        />
      </div>
    </div>
  );
};

export default page;
