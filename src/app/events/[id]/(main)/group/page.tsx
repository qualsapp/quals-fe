import { getEvent } from "@/actions/event";
import { getHostProfile } from "@/actions/host";
import GroupTable from "@/components/commons/group-table";

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

  const { community } = await getHostProfile();

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
