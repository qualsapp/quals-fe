import React from "react";

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UpdateRuleBeforeMatch from "@/components/match/update-rule-before-match";
import { getMatch, getMatches } from "@/actions/match";
import Player from "@/components/commons/player";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/commons/back-button";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
};

const page = async ({ params }: Props) => {
  const { id, match_id } = await params;

  const match = await getMatch(match_id);

  return (
    <div className="container max-w-3xl mx-auto py-10 lg:py-16">
      <div className="flex flex-col space-y-8">
        <BackButton
          href={`/community/events/${id}/matches`}
          label="Back to Matches"
        />
        <div className="flex flex-row gap-3 justify-center items-center">
          <p className="text-lg font-semibold">
            {match.scheduled_at || "Not Scheduled"}
          </p>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <p className="text-lg font-semibold">Court {match.court_number}</p>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <p className="text-lg font-semibold">
            Match {match.tournament_bracket.match_number}
          </p>
        </div>

        <div className="flex justify-between items-center rounded-lg p-6 border-y ">
          <Player names={match.participant_a.name.split("/")} />

          <p className="text-2xl font-bold">VS</p>

          <Player names={match.participant_b.name.split("/")} />
        </div>
        <UpdateRuleBeforeMatch type="badminton" />
      </div>
    </div>
  );
};

export default page;
