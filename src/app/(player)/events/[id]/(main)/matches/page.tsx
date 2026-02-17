import React from "react";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/commons/match-card";
import Modal from "@/components/commons/state-modal";

import { getEvent } from "@/actions/event";

import { getMatches } from "@/actions/match";

import { FilterParams } from "@/types/global";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<FilterParams>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const searchParamsData = await searchParams;

  const event = await getEvent(id);

  if (!event) {
    return (
      <div className="py-8 md:py-10 space-y-10">
        <div className="container flex flex-col items-center">
          <p>No event found</p>
        </div>
      </div>
    );
  }

  const { matches } = await getMatches({ tournament_id: event.tournament?.id });

  if (!matches || matches?.length === 0) {
    return (
      <div className="py-8 md:py-10 space-y-10">
        <div className="container flex flex-col items-center">
          <p>No matches found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-10 space-y-10">
      <div className="container flex flex-col items-center">
        <Tabs defaultValue="live" className="w-full space-y-10">
          <TabsList className="mx-auto">
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="order_of_play">Order of Play</TabsTrigger>
          </TabsList>
          <TabsContent value="live">
            <div className="grid grid-cols-1 gap-4 place-items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <MatchCard
                  key={index}
                  type="live"
                  court_number={index + 1}
                  event_id={id}
                  match_id={index + 1}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="order_of_play">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4 grid grid-cols-1 place-items-center">
                <h3 className="text-xl font-bold text-center">Court 1</h3>
                {Array.from({ length: 5 }).map((_, index) => (
                  <MatchCard
                    key={index}
                    type="order_of_play"
                    court_number={index + 1}
                    event_id={id}
                    match_id={index + 1}
                  />
                ))}
              </div>
              <div className="space-y-4 grid grid-cols-1 place-items-center">
                <h3 className="text-xl font-bold text-center">Court 2</h3>
                {Array.from({ length: 5 }).map((_, index) => (
                  <MatchCard
                    key={index}
                    type="order_of_play"
                    court_number={index + 1}
                    event_id={id}
                    match_id={index + 1}
                  />
                ))}
              </div>
              <div className="space-y-4 grid grid-cols-1 place-items-center">
                <h3 className="text-xl font-bold text-center">Court 3</h3>
                {Array.from({ length: 5 }).map((_, index) => (
                  <MatchCard
                    key={index}
                    type="order_of_play"
                    court_number={index + 1}
                    event_id={id}
                    match_id={index + 1}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {searchParamsData.welcome && (
        <Modal isOpen={searchParamsData.welcome || false}>
          <Image
            width={1920}
            height={1080}
            src="/images/welcome.jpeg"
            alt="welcome"
          />
        </Modal>
      )}
    </div>
  );
};

export default page;
