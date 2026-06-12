import React from "react";
import Image from "next/image";

import MatchCard from "@/components/commons/match-card";
import Modal from "@/components/commons/state-modal";

import { getMatches } from "@/actions/match";

import { FilterParams } from "@/types/global";
import { MatchResponse } from "@/types/match";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string; tid: string }>;
  searchParams: Promise<FilterParams>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id, tid } = await params;
  const searchParamsData = await searchParams;

  const base = `/community/events/${id}/tournaments/${tid}`;

  // `status` is now driven by the Filter-by bar (e.g. ongoing | scheduled |
  // completed); empty = all matches. It is already an API-valid value, so it
  // passes straight through. page_size: 0 asks the API for the full schedule
  // (without it the API defaults to 10 and silently truncates).
  const { matches } = await getMatches({
    tournament_id: tid,
    ...searchParamsData,
    page_size: 0,
  });

  const matchesByRound = () => {
    if (!matches) return [];

    return Object.values(
      matches.reduce(
        (acc, match) => {
          const round = match.tournament_bracket?.round_name || "Unknown Round";
          if (!acc[round]) {
            acc[round] = { round, matches: [] };
          }
          acc[round].matches.push(match);
          return acc;
        },
        {} as Record<string, { round: string; matches: MatchResponse[] }>,
      ),
    );
  };

  const matchesByCourt = (matches: MatchResponse[]) => {
    if (!matches) return [];

    return Object.values(
      matches.reduce(
        (acc, match) => {
          const court = match.court_number;
          if (!acc[court]) {
            acc[court] = { court, matches: [] };
          }
          acc[court].matches.push(match);
          return acc;
        },
        {} as Record<number, { court: number; matches: MatchResponse[] }>,
      ),
    );
  };

  return (
    <div className="py-2 md:py-4 space-y-10">
      <div className="container flex flex-col gap-16">
        {(matches === null || matches?.length === 0) && (
          <div className="flex flex-col items-center py-10">
            <p className="text-muted-foreground">
              No matches found for this filter.
            </p>
          </div>
        )}

        {matchesByRound().map((round) => (
          <div key={round.round} className="space-y-4">
            <h3 className="text-4xl font-bold text-center text-neutral-300 border-y py-3">
              {round.round}
            </h3>
            <div
              className={cn(
                "grid gap-y-16 md:gap-8 md:gap-y-16",
                `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`,
              )}
            >
              {matchesByCourt(round.matches).map((court) => (
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
      </div>

      <Modal isOpen={searchParamsData.welcome || false}>
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
