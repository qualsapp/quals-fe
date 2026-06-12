import React from "react";
import dayjs from "dayjs";

import TournamentBracket from "@/components/commons/tournament-bracket";
import { getEvent } from "@/actions/event";
import { getBrackets, getTournament } from "@/actions/tournament";

import { Match } from "@/types/bracket";
import { TournamentResponse } from "@/types/tournament";
import { SCHEDULED_AT_FORMAT } from "@/lib/constants/date";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tournament?: string }>;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { tournament } = await searchParams;

  const event = await getEvent(id);
  const tournaments = event?.tournaments || [];

  const tid =
    tournament && tournament !== "all"
      ? tournament
      : String(tournaments[0]?.id || "");

  if (!tid) {
    return (
      <div className="container py-10 md:py-16">No tournament found</div>
    );
  }

  const tournamentData = await getTournament(tid);

  if (!tournamentData?.id || tournamentData.error) {
    return <div>No tournament found</div>;
  }

  const brackets = await getBrackets(tournamentData.id);

  const matchData: Match[] = brackets?.map((bracket) => ({
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
                  if (set.set_score_a > set.set_score_b) acc += 1;
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
      ? `/events/${id}/tournaments/${tid}/matches/${bracket.match.id}`
      : undefined,
    startTime: bracket.match?.scheduled_at
      ? dayjs(bracket.match.scheduled_at).format(SCHEDULED_AT_FORMAT)
      : "Not Scheduled",
  }));

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-8">
        <h2 className="text-2xl font-bold capitalize border-b-2 border-primary pb-2">
          {tournamentLabel(tournamentData)}
        </h2>
        <div className="flex-col space-y-10">
          <TournamentBracket
            matches={matchData}
            tournament={tournamentData}
            isEditable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
