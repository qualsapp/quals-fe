import React from "react";
import Image from "next/image";

import MatchCard from "@/components/commons/match-card";
import Modal from "@/components/commons/state-modal";

import { getMatches } from "@/actions/match";
import { getEvent } from "@/actions/event";

import { FilterParams } from "@/types/global";
import { MatchResponse } from "@/types/match";
import { TournamentResponse } from "@/types/tournament";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string; tid: string }>;
  searchParams: Promise<FilterParams>;
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

const groupByCourt = (matches: MatchResponse[]) =>
  Object.values(
    matches.reduce(
      (acc, match) => {
        const court = match.court_number;
        if (!acc[court]) acc[court] = { court, matches: [] };
        acc[court].matches.push(match);
        return acc;
      },
      {} as Record<number, { court: number; matches: MatchResponse[] }>,
    ),
  );

const RoundGrid = ({
  matches,
  base,
}: {
  matches: MatchResponse[];
  base: string;
}) => (
  <>
    {groupByRound(matches).map((round) => (
      <div key={round.round} className="space-y-4">
        <h3 className="text-4xl font-bold text-center text-neutral-300 border-y py-3">
          {round.round}
        </h3>
        <div
          className={cn(
            "grid gap-y-16 md:gap-8 md:gap-y-16",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {groupByCourt(round.matches).map((court) => (
            <div
              key={court.court}
              className="space-y-4 flex flex-col items-center"
            >
              <h3 className="text-xl font-bold text-center">
                Court {court.court}
              </h3>
              {court.matches.map((match, index) => (
                <MatchCard
                  key={index}
                  index={index}
                  type="order_of_play"
                  match={match}
                  url={`${base}/matches/${match.id}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

const page = async ({ params, searchParams }: Props) => {
  const { id, tid } = await params;
  const { all_tournaments, welcome, ...apiParams } = await searchParams;

  const isAllMode = all_tournaments === "true";

  type TournamentMatches = {
    tournament: TournamentResponse;
    matches: MatchResponse[];
  };

  let singleMatches: MatchResponse[] = [];
  let tournamentGroups: TournamentMatches[] = [];

  if (isAllMode) {
    const event = await getEvent(id);
    const tournaments = event?.tournaments || [];
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
  } else {
    // `status` is now driven by the Filter-by bar (e.g. ongoing | scheduled |
    // completed); empty = all matches. It is already an API-valid value, so it
    // passes straight through. page_size: 0 asks the API for the full schedule
    // (without it the API defaults to 10 and silently truncates).
    const { matches } = await getMatches({
      tournament_id: tid,
      ...apiParams,
      page_size: 0,
    });
    singleMatches = matches || [];
  }

  const isEmpty = isAllMode
    ? tournamentGroups.length === 0
    : singleMatches.length === 0;

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

        {isAllMode
          ? tournamentGroups.map(({ tournament, matches }) => {
              const base = `/community/events/${id}/tournaments/${tournament.id}`;
              return (
                <div key={tournament.id} className="space-y-8">
                  <h2 className="text-2xl font-bold text-center capitalize border-b-2 border-primary pb-2">
                    {tournamentLabel(tournament)}
                  </h2>
                  <RoundGrid matches={matches} base={base} />
                </div>
              );
            })
          : (() => {
              const base = `/community/events/${id}/tournaments/${tid}`;
              return <RoundGrid matches={singleMatches} base={base} />;
            })()}
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
