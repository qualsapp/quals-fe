import React from "react";
import TournamentBracket from "@/components/commons/tournament-bracket";
import { getBrackets, getTournament } from "@/actions/tournament";
import { Match } from "@/types/bracket";
import dayjs from "dayjs";
import { SCHEDULED_AT_FORMAT } from "@/lib/constants/date";

type Props = {
  params: Promise<{ id: string; tid: string }>;
};

const page = async ({ params }: Props) => {
  const { id, tid } = await params;

  const tournament = await getTournament(tid);

  if (!tournament?.id || tournament.error) {
    return <div>No tournament found</div>;
  }

  const brackets = await getBrackets(tournament.id);

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
                status: "PLAYED",
                resultText: String(
                  bracket.match.match_sets.reduce((acc, set) => {
                    if (set.set_score_a > set.set_score_b) {
                      acc += 1;
                    }
                    return acc;
                  }, 0),
                ),
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
                status: "PLAYED",
                resultText: "test",
              },
            ]
          : []),
      ],
      court_number: bracket.match?.court_number,
      href: bracket.match?.id
        ? `/events/${id}/tournaments/${tid}/matches/${bracket.match?.id}`
        : undefined,
      startTime: bracket.match?.scheduled_at
        ? dayjs(bracket.match?.scheduled_at).format(SCHEDULED_AT_FORMAT)
        : "Not Scheduled",
    };
  });

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex-col space-y-10">
        <TournamentBracket
          matches={matchData}
          tournament={tournament}
          isEditable={false}
        />
      </div>
    </div>
  );
};

export default page;
