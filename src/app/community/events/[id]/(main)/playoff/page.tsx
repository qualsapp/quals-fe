import DashboardNav from "@/components/commons/dashboard-nav";
import KnockOffCard from "@/components/commons/knock-off-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import React from "react";

import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  MATCH_STATES,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
import TournamentBracket from "@/components/commons/tournament-bracket";
import { walkOverData } from "@/mock-data/simple-data";
import { cookies } from "next/headers";
import { hostServices } from "@/services/host-services";
import { HostProfileModel } from "@/types/user";
import { eventServices } from "@/services/event-services";
import { EventResponse } from "@/types/events";
import { tournamentServices } from "@/services/tournament-services";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const event = token
    ? await eventServices.getById(id, token)
    : ({} as EventResponse);

  const tournament = token
    ? await tournamentServices.getById(
        community.id,
        id,
        event.tournament.id,
        token,
      )
    : ({} as TournamentResponse);

  console.log("tournament", tournament);

  const matchData = tournament.tournament_brackets.map((match) => {
    return {
      id: match.id,
      round: match.round,
      name: `Match ${match.match_number}`,
      tournamentRoundText: match.round,
      match_number: match.match_number,
      nextMatchId: match.next_bracket_id,
      nextLooserMatchId: null,
      state: "SCHEDULED",
      participants:
        match.participants?.length > 0
          ? match.participants.map((participant) => {
              return {
                id: participant.id,
                name: participant.name,
                score: participant?.score || null,
                seed: participant?.seed || null,
                isWinner: participant?.isWinner || null,
              };
            })
          : [],
      startTime: "",
    };
  });

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex-col space-y-10">
        <TournamentBracket
          matches={matchData}
          communityId={community.id}
          eventId={id}
          tournamentId={event.tournament.id}
          token={token || ""}
          match_rule_id={event.tournament.match_rule.id}
        />
      </div>
      {/* <div className="container flex-col space-y-10">
        <div className="overflow-x-auto">
          <div className="flex items-center">
            <div className="space-y-10">
              <div className="flex items-center w-full">
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center">
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                      <KnockOffCard />
                    </div>
                    <div className="border w-10 h-[140px] border-l-0"></div>
                    <div className="w-10 border-t"></div>
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                      <KnockOffCard />
                    </div>
                    <div className="border w-10 h-[140px] border-l-0"></div>
                    <div className="w-10 border-t"></div>
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                    </div>
                  </div>
                </div>
                <div className="border w-10 h-[300px] border-l-0"></div>
                <div className="w-10 border-t"></div>
                <div className="flex flex-col gap-4">
                  <KnockOffCard />
                </div>
              </div>

              <div className="flex items-center w-full">
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center">
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                      <KnockOffCard />
                    </div>
                    <div className="border w-10 h-[140px] border-l-0"></div>
                    <div className="w-10 border-t"></div>
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                      <KnockOffCard />
                    </div>
                    <div className="border w-10 h-[140px] border-l-0"></div>
                    <div className="w-10 border-t"></div>
                    <div className="flex flex-col gap-4">
                      <KnockOffCard />
                    </div>
                  </div>
                </div>
                <div className="border w-10 h-[300px] border-l-0"></div>
                <div className="w-10 border-t"></div>
                <div className="flex flex-col gap-4">
                  <KnockOffCard />
                </div>
              </div>
            </div>
            <div className="border w-10 h-[590px] border-l-0"></div>
            <div className="w-10 border-t"></div>
            <div className="flex flex-col gap-4">
              <KnockOffCard />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default page;
