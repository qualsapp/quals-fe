import React from "react";
import TournamentBracket from "@/components/commons/tournament-bracket";
import { getBrackets, getTournament } from "@/actions/tournament";
import { Match } from "@/types/bracket";
import dayjs from "dayjs";
import { SCHEDULED_AT_FORMAT } from "@/lib/constants/date";
import { MatchSetModel } from "@/types/match";

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

  const getAccumulatedScore = (sets: MatchSetModel[], type: "a" | "b") => {
    if (!sets) return "0";
    const total = sets.reduce((acc, set) => {
      if (set.set_score_a === null || set.set_score_b === null) return acc;
      if (type === "a" && set.set_score_a > set.set_score_b) return acc + 1;
      if (type === "b" && set.set_score_b > set.set_score_a) return acc + 1;

      return acc;
    }, 0);

    return String(total);
  };

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
                isWinner:
                  bracket.match.winner?.id === bracket.match.participant_a.id,
                resultText: getAccumulatedScore(bracket.match.match_sets, "a"),
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
                isWinner:
                  bracket.match.winner?.id === bracket.match.participant_b.id,
                resultText: getAccumulatedScore(bracket.match.match_sets, "b"),
              },
            ]
          : []),
      ],
      court_number: bracket.match?.court_number,
      href: bracket.match?.id
        ? `/community/events/${id}/tournaments/${tid}/matches/${bracket.match?.id}`
        : undefined,
      startTime: bracket.match?.scheduled_at
        ? dayjs(bracket.match?.scheduled_at).format(SCHEDULED_AT_FORMAT)
        : "",
      sets: bracket.match?.match_sets || [],
    };
  });

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex-col space-y-10">
        <TournamentBracket
          matches={matchData}
          tournament={tournament}
          isEditable
        />
      </div>
    </div>
  );
};

export default page;
