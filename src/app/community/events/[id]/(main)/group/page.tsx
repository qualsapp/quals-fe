import DashboardNav from "@/components/commons/dashboard-nav";
import GroupTable from "@/components/commons/group-table";
import MatchCard from "@/components/commons/match-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { EventResponse } from "@/types/event";
import { HostProfileModel } from "@/types/user";
import { group } from "console";
import { pl, ro } from "date-fns/locale";
import { CircleX } from "lucide-react";
import { cookies } from "next/headers";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

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

  if (event.tournament.format !== "group_stage") {
    return (
      <div className="py-10 md:py-16 space-y-10">
        <div className="container flex space-y-10 flex-col items-center">
          Event is not in group stage format
        </div>
      </div>
    );
  }

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
