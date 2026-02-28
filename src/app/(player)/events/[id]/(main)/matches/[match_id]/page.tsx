import React from "react";
import { getMatch } from "@/actions/match";
import BackButton from "@/components/commons/back-button";

import LiveMatchScore from "@/components/matches/LiveMatchScore";
import dayjs from "dayjs";
import { SCHEDULED_AT_FORMAT } from "@/lib/constants/date";
import NotLiveMatchScore from "@/components/matches/NotLiveMatchScore";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
};

const page = async ({ params }: Props) => {
  const { id, match_id } = await params;

  const match = await getMatch(match_id);

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 lg:py-16">
      <div className="flex flex-col space-y-8">
        <BackButton href={`/events/${id}/matches`} label="Back to Matches" />
        <div className="flex flex-row gap-3 justify-center items-center">
          <p className="text-lg font-semibold">
            {(match.scheduled_at &&
              dayjs(match.scheduled_at).format(SCHEDULED_AT_FORMAT)) ||
              "Not Scheduled"}
          </p>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <p className="text-lg font-semibold">Court {match.court_number}</p>
          {match.tournament_bracket?.match_number && (
            <>
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <p className="text-lg font-semibold">
                Match {match.tournament_bracket.match_number}
              </p>
            </>
          )}
        </div>

        {match.status === "ongoing" ? (
          <LiveMatchScore initialMatch={match} matchId={match_id} />
        ) : (
          <NotLiveMatchScore match={match} />
        )}
      </div>
    </div>
  );
};

export default page;
