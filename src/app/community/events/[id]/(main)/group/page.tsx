import DashboardNav from "@/components/commons/dashboard-nav";
import GroupTable from "@/components/commons/group-table";
import MatchCard from "@/components/commons/match-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { group } from "console";
import { pl, ro } from "date-fns/locale";
import { CircleX } from "lucide-react";

import React from "react";

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
    <div className="py-10 md:py-16 space-y-10">
      <div className="container flex space-y-10 flex-col items-center">
        <h3 className="text-xl font-bold">Group A</h3>
        <div className="overflow-x-auto w-full">
          <GroupTable players={players} results={groupResult} />
        </div>
      </div>
    </div>
  );
};

export default page;
