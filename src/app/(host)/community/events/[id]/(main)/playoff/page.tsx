import React from "react";
import Link from "next/link";
import { Settings2 } from "lucide-react";
import dayjs from "dayjs";

import TournamentBracket from "@/components/commons/tournament-bracket";
import { Button } from "@/components/ui/button";
import DeleteTournamentButton from "@/components/event/delete-tournament";

import { getEvent } from "@/actions/event";
import { getBrackets, getTournament } from "@/actions/tournament";

import { Match } from "@/types/bracket";
import { MatchSetModel } from "@/types/match";
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
  const sportSlug = event?.sport_type?.slug;

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
      ? `/community/events/${id}/tournaments/${tid}/matches/${bracket.match.id}`
      : undefined,
    startTime: bracket.match?.scheduled_at
      ? dayjs(bracket.match.scheduled_at).format(SCHEDULED_AT_FORMAT)
      : "",
    sets: bracket.match?.match_sets || [],
  }));

  const rulesHref = `/community/events/${id}/rules?type=${sportSlug}&tid=${tid}`;

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-8">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2">
          <h2 className="text-2xl font-bold capitalize">
            {tournamentLabel(tournamentData)}
          </h2>
          <div className="flex gap-2">
            <Link href={rulesHref}>
              <Button
                variant="outline"
                size="icon"
                aria-label="Edit Tournament Rules"
              >
                <Settings2 />
              </Button>
            </Link>
            <DeleteTournamentButton
              tournamentId={tid}
              redirectTo={`/community/events/${id}/matches`}
            />
          </div>
        </div>
        <div className="flex-col space-y-10">
          <TournamentBracket
            matches={matchData}
            tournament={tournamentData}
            isEditable
          />
        </div>
      </div>
    </div>
  );
};

export default page;
