import { getEvent } from "@/actions/event";
import GroupParticipantsForm from "@/components/forms/GroupParticipantsForm";
import React from "react";

type Props = {
  params: Promise<{ id: string; group_id: string }>;
};

const page = async (props: Props) => {
  const { id, group_id } = await props.params;

  const event = await getEvent(id);

  if (!event) {
    return <div>No event found</div>;
  }

  if (!event.tournament) {
    return <div>No tournament found</div>;
  }

  return (
    <div>
      <GroupParticipantsForm
        seatPerGroup={Number(event.tournament.seat_per_group)}
        groupId={group_id}
        tournamentId={String(event.tournament.id)}
        closeModal={() => {}}
      />
    </div>
  );
};

export default page;
