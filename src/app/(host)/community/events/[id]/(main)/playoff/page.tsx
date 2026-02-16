import React from "react";
import TournamentBracket from "@/components/commons/tournament-bracket";
import { getEvent } from "@/actions/event";
import { getBrackets } from "@/actions/tournament";
import { Match } from "@/types/bracket";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event.tournament?.id) {
    return <div>No tournament found</div>;
  }

  const brackets = await getBrackets(event.tournament.id);

  const matchData: Match[] = brackets?.map((bracket) => {
    return {
      id: bracket.id,
      round: bracket.round,
      name: `Match ${bracket.match_number}`,
      tournamentRoundText: bracket.round.toString(),
      match_number: bracket.match_number,
      nextMatchId: bracket.next_bracket_id,
      nextLooserMatchId: null,
      state: bracket.match?.status,
      participants: [
        ...(bracket.match?.participant_a
          ? [
              {
                id: bracket.match.participant_a.id,
                name: bracket.match.participant_a.name,
                score: bracket.match.participant_a.score || null,
                seed: null,
                isWinner: bracket.match.participant_a.isWinner,
                // sets: bracket.match.participant_a?.sets || null,
              },
            ]
          : []),
        ...(bracket.match?.participant_b
          ? [
              {
                id: bracket.match.participant_b.id,
                name: bracket.match.participant_b.name,
                score: bracket.match.participant_b.score || null,
                seed: null,
                isWinner: bracket.match.participant_b.isWinner,
                // sets: bracket.match.participant_a?.sets || null,
              },
            ]
          : []),
      ],
      court_number: bracket.match?.court_number,
      href: bracket.match?.id
        ? `/community/events/${id}/matches/${bracket.match?.id}`
        : undefined,
      startTime: bracket.match?.scheduled_at,
    };
  });

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex-col space-y-10">
        <TournamentBracket matches={matchData} event={event} isEditable />
      </div>
    </div>
  );
};

export default page;
