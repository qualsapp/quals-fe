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
