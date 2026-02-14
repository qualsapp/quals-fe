import { getEvent } from "@/actions/event";
import GroupParticipantsForm from "@/components/forms/GroupParticipantsForm";
import React from "react";

type Props = {
  params: Promise<{ id: string; group_id: string }>;
};

const page = async (props: Props) => {
  const { id, group_id } = await props.params;

  const event = await getEvent(id);
  console.log(event.tournament?.seat_per_group);
  return (
    <div>
      <GroupParticipantsForm
        seatPerGroup={Number(event.tournament?.seat_per_group)}
      />
    </div>
  );
};

export default page;
