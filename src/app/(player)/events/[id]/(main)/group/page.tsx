import { getEvent } from "@/actions/event";
import { getGroups } from "@/actions/group";
import { getMatches } from "@/actions/match";
import GroupList from "@/components/group/group-list";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

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

  const [groups, matches] = await Promise.all([
    getGroups(String(event.tournament.id)),
    getMatches({ tournament_id: String(event.tournament.id) }),
  ]);

  const groupWithMatches = groups?.map((group) => {
    const groupMatches = group.matches?.map((groupMatch) => {
      const matchSet = matches?.matches?.find(
        (match) => match?.id === groupMatch.id,
      );
      return {
        ...groupMatch,
        match_sets: matchSet?.match_sets || null,
      };
    });
    return { ...group, matches: groupMatches };
  });

  if (!groups) {
    return <div>No groups found</div>;
  }

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container flex space-y-10 flex-col items-center">
        <GroupList
          groups={groupWithMatches}
          seatPerGroup={Number(event.tournament.seat_per_group)}
          tournamentId={String(event.tournament.id)}
          isEditable={false}
        />
      </div>
    </div>
  );
};

export default page;
