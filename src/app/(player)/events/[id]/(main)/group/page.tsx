import { getEvent } from "@/actions/event";
import { getGroups } from "@/actions/group";
import { getHostProfile } from "@/actions/host";
import GroupTable from "@/components/commons/group-table";
import GroupList from "@/components/group/group-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const event = await getEvent(id);

  if (!event) {
    return <div>No event found</div>;
  }

  if (event?.tournament?.format !== "group_stage") {
    return (
      <div className="py-10 md:py-16 space-y-10">
        <div className="container flex space-y-10 flex-col items-center">
          Event is not in group stage format
        </div>
      </div>
    );
  }

  const groups = await getGroups(String(event.tournament.id));

  if (!groups) {
    return <div>No groups found</div>;
  }

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container flex space-y-10 flex-col items-center">
        <GroupList
          groups={groups}
          seatPerGroup={Number(event.tournament.seat_per_group)}
          tournamentId={String(event.tournament.id)}
          isEditable={false}
        />
      </div>
    </div>
  );
};

export default page;
