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

type Props = {};

const menus = [
  { label: "Matches", href: `/community/events/123/matches` },
  { label: "Group", href: `/community/events/123/group` },
  { label: "Playoff", href: `/community/events/123/playoff` },
];

const players = [
  "Evil Rabbit",
  "Swift Fox",
  "Mighty Lion",
  "Cunning Wolf",
  "Brave Tiger",
];

const groupResult = [
  ["-", "2-3", "1-4", "3-2", "4-1"],
  ["3-2", "-", "2-3", "4-1", "1-4"],
  ["4-1", "3-2", "-", "2-3", "1-4"],
  ["2-3", "1-4", "3-2", "-", "4-1"],
  ["1-4", "4-1", "2-3", "3-2", "-"],
];

const page = (props: Props) => {
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex flex-col lg:flex-row gap-5 justify-between">
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Quals OPEN 2025</h2>
          <Badge variant="gray" className="font-bold !rounded-sm">
            9 Oct - 12 Oct
          </Badge>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum
          </p>

          <p>Detail Event here</p>
        </div>
        <div className="flex gap-3 lg:flex-col">
          <Button variant="outline">Edit Event</Button>
          <Button variant="destructive">Delete Event</Button>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} currentMenu="playoff" />
        </div>
      </div>

      <div className="container flex-col space-y-10">
        <TournamentBracket matches={walkOverData} />
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
