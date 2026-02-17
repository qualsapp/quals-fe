import React from "react";

import UpdateRuleBeforeMatch from "@/components/match/update-rule-before-match";
import { getMatch } from "@/actions/match";
import Player from "@/components/commons/player";
import BackButton from "@/components/commons/back-button";
import { getEvent } from "@/actions/event";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
};

const page = async ({ params }: Props) => {
  const { id, match_id } = await params;

  const [match, event] = await Promise.all([getMatch(match_id), getEvent(id)]);

  if (!match || !event) {
    return <div>Match not found</div>;
  }

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
        <UpdateRuleBeforeMatch
          matchId={match_id}
          rule={match.match_rule}
          type={event.sport_type.slug}
        />
      </div>
    </div>
  );
};

export default page;
