import { getGroups } from "@/actions/group";
import { getMatches } from "@/actions/match";
import { getTournament } from "@/actions/tournament";
import GroupList from "@/components/group/group-list";

import React from "react";

type Props = {
  params: Promise<{ id: string; tid: string }>;
};

const page = async ({ params }: Props) => {
  const { tid } = await params;

  const tournament = await getTournament(tid);

  if (!tournament || tournament.error) {
    return <div>No tournament found</div>;
  }

  if (tournament.format !== "group_stage") {
    return (
      <div className="py-10 md:py-16 space-y-10">
        <div className="container flex space-y-10 flex-col items-center">
          Tournament is not in group stage format
        </div>
      </div>
    );
  }

  const [groups, matches] = await Promise.all([
    getGroups(String(tournament.id)),
    getMatches({ tournament_id: String(tournament.id) }),
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
          seatPerGroup={Number(tournament.seat_per_group)}
          tournamentId={String(tournament.id)}
          isEditable={true}
        />
      </div>
    </div>
  );
};

export default page;
