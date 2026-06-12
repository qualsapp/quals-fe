import Link from "next/link";
import { Settings2 } from "lucide-react";

import { getGroups } from "@/actions/group";
import { getMatches } from "@/actions/match";
import { getEvent } from "@/actions/event";
import { getTournament } from "@/actions/tournament";
import GroupList from "@/components/group/group-list";
import { Button } from "@/components/ui/button";
import DeleteTournamentButton from "@/components/event/delete-tournament";

import React from "react";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tournament?: string }>;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { tournament } = await searchParams;

  const event = await getEvent(id);
  const tournaments = event?.tournaments || [];
  const sportSlug = event?.sport_type?.slug;

  const tid =
    tournament && tournament !== "all"
      ? tournament
      : String(tournaments[0]?.id || "");

  if (!tid) {
    return (
      <div className="container py-10 md:py-16">No tournament found</div>
    );
  }

  const tournamentData = await getTournament(tid);

  if (!tournamentData || tournamentData.error) {
    return <div>No tournament found</div>;
  }

  if (tournamentData.format !== "group_stage") {
    return (
      <div className="py-10 md:py-16 space-y-10">
        <div className="container flex space-y-10 flex-col items-center">
          Tournament is not in group stage format
        </div>
      </div>
    );
  }

  const [groups, matches] = await Promise.all([
    getGroups(String(tournamentData.id)),
    getMatches({ tournament_id: String(tournamentData.id) }),
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

  const rulesHref = `/community/events/${id}/rules?type=${sportSlug}&tid=${tid}`;

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-8">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2">
          <h2 className="text-2xl font-bold capitalize">
            {tournamentLabel(tournamentData)}
          </h2>
          <div className="flex gap-2">
            <Link href={rulesHref}>
              <Button
                variant="outline"
                size="icon"
                aria-label="Edit Tournament Rules"
              >
                <Settings2 />
              </Button>
            </Link>
            <DeleteTournamentButton
              tournamentId={tid}
              redirectTo={`/community/events/${id}/matches`}
            />
          </div>
        </div>
        <div className="flex space-y-10 flex-col items-center">
          <GroupList
            groups={groupWithMatches}
            seatPerGroup={Number(tournamentData.seat_per_group)}
            tournamentId={String(tournamentData.id)}
            isEditable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
