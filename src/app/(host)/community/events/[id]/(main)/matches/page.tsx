import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings2 } from "lucide-react";

import RoundSection from "@/components/matches/round-section";
import Modal from "@/components/commons/state-modal";
import { Button } from "@/components/ui/button";
import DeleteTournamentButton from "@/components/event/delete-tournament";

import { getMatches } from "@/actions/match";
import { getEvent } from "@/actions/event";

import { FilterParams } from "@/types/global";
import { MatchResponse } from "@/types/match";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<FilterParams & { tournament?: string }>;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const groupByRound = (matches: MatchResponse[]) =>
  Object.values(
    matches.reduce(
      (acc, match) => {
        const round = match.tournament_bracket?.round_name || "Unknown Round";
        if (!acc[round]) acc[round] = { round, matches: [] };
        acc[round].matches.push(match);
        return acc;
      },
      {} as Record<string, { round: string; matches: MatchResponse[] }>,
    ),
  );

const RoundGrid = ({
  matches,
  base,
  tournamentId,
}: {
  matches: MatchResponse[];
  base: string;
  tournamentId: number | string;
}) => (
  <>
    {groupByRound(matches).map((round) => (
      <RoundSection
        key={round.round}
        roundName={round.round}
        matches={round.matches}
        base={base}
        tournamentId={tournamentId}
      />
    ))}
  </>
);

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { tournament, welcome, ...apiParams } = await searchParams;

  const event = await getEvent(id);
  const tournaments = event?.tournaments || [];
  const sportSlug = event?.sport_type?.slug;

  const isSingleMode = tournament && tournament !== "all";

  type TournamentMatches = {
    tournament: TournamentResponse;
    matches: MatchResponse[];
  };

  let tournamentGroups: TournamentMatches[] = [];

  if (isSingleMode) {
    const { matches } = await getMatches({
      tournament_id: tournament,
      ...apiParams,
      page_size: 0,
    });
    const t = tournaments.find((t) => String(t.id) === String(tournament));
    if (t) {
      tournamentGroups = [{ tournament: t, matches: matches || [] }];
    }
  } else {
    tournamentGroups = (
      await Promise.all(
        tournaments.map(async (t) => {
          const { matches } = await getMatches({
            tournament_id: String(t.id),
            ...apiParams,
            page_size: 0,
          });
          return { tournament: t, matches: matches || [] };
        }),
      )
    ).filter((g) => g.matches.length > 0);
  }

  const isEmpty = tournamentGroups.length === 0;

  return (
    <div className="py-2 md:py-4 space-y-10">
      <div className="container flex flex-col gap-16">
        {isEmpty && (
          <div className="flex flex-col items-center py-10">
            <p className="text-muted-foreground">
              No matches found for this filter.
            </p>
          </div>
        )}

        {tournamentGroups.map(({ tournament, matches }) => {
          const base = `/community/events/${id}/tournaments/${tournament.id}`;
          const rulesHref = `/community/events/${id}/rules?type=${sportSlug}&tid=${tournament.id}`;
          return (
            <div key={tournament.id} className="space-y-8">
              <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                <h2 className="text-2xl font-bold capitalize">
                  {tournamentLabel(tournament)}
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
                    tournamentId={String(tournament.id)}
                    redirectTo={`/community/events/${id}/matches`}
                  />
                </div>
              </div>
              <RoundGrid
                matches={matches}
                base={base}
                tournamentId={tournament.id}
              />
            </div>
          );
        })}
      </div>

      <Modal isOpen={welcome || false}>
        <Image
          width={1024}
          height={1536}
          src="/images/welcome.jpeg"
          alt="welcome"
        />
      </Modal>
    </div>
  );
};

export default page;
