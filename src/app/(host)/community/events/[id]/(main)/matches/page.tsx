import React from "react";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/commons/match-card";
import Modal from "@/components/commons/state-modal";

import { getEvent } from "@/actions/event";
import { getMatches } from "@/actions/match";

import { FilterParams } from "@/types/global";
import { MatchResponse } from "@/types/match";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<FilterParams>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const searchParamsData = await searchParams;

  const event = await getEvent(id);

  console.log(event);

  if (!event) {
    return (
      <div className="py-8 md:py-10 space-y-10">
        <div className="container flex flex-col items-center">
          <p>No event found</p>
        </div>
      </div>
    );
  }

  const { matches } = await getMatches({
    tournament_id: event.tournament?.id,
    ...searchParamsData,
  });

  if (!matches || matches?.length === 0) {
    return (
      <div className="py-8 md:py-10 space-y-10">
        <div className="container flex flex-col items-center">
          <p>No matches found</p>
        </div>
      </div>
    );
  }

  const matchesByCourt = Object.values(
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

  return (
    <div className="py-8 md:py-10 space-y-10">
      <div className="container flex flex-col items-center">
        <Tabs
          defaultValue={searchParamsData.match_tab || "live"}
          className="w-full space-y-10"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="live">
              <Link href={`/community/events/${id}/matches?match_tab=live`}>
                Live
              </Link>
            </TabsTrigger>
            <TabsTrigger value="order_of_play">
              <Link
                href={`/community/events/${id}/matches?match_tab=order_of_play`}
              >
                Order of Play
              </Link>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="live">
            <div className="grid grid-cols-1 gap-4 place-items-center">
              {matches.map((match, index) => (
                <MatchCard
                  key={index}
                  match={match}
                  type="live"
                  url={`/community/events/${id}/matches/${match.id}`}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="order_of_play">
            <div className={cn("grid gap-4", `grid-cols-3`)}>
              {matchesByCourt.map((court) => (
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
                      type="order_of_play"
                      match={match}
                      url={`/community/events/${id}/matches/${match.id}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Modal isOpen={searchParamsData.welcome || false}>
        <Image
          width={1920}
          height={1080}
          src="/images/welcome.jpeg"
          alt="welcome"
        />
      </Modal>
    </div>
  );
};

export default page;
