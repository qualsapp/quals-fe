import DashboardNav from "@/components/commons/dashboard-nav";
import MatchCard from "@/components/commons/match-card";
import Modal from "@/components/commons/state-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { matchServices } from "@/services/match-services";
import { EventResponse } from "@/types/events";
import { MatchesResponse } from "@/types/match";
import { HostProfileModel } from "@/types/user";
import { cookies } from "next/headers";
import Image from "next/image";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ welcome: boolean }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const searchParamsData = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const event = token
    ? await eventServices.getById(id, token)
    : ({} as EventResponse);

  const list = token
    ? await matchServices.getAll(community.id, id, event.tournament.id, token)
    : ({} as MatchesResponse);

  if (list.matches === null) {
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
      {/* <Modal isOpen={searchParamsData.welcome || false}>
        <Image
          width={1920}
          height={1080}
          src="/images/welcome.jpeg"
          alt="welcome"
        />
      </Modal> */}
    </div>
  );
};

export default page;
