"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MatchResponse } from "@/types/match";
import Player from "@/components/commons/player";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { WsBaseUrl } from "@/lib/env";

type Props = {
  initialMatch: MatchResponse;
  matchId: string;
};

const LiveMatchScoreBadminton = ({ initialMatch, matchId }: Props) => {
  const [match, setMatch] = useState<MatchResponse>(initialMatch);
  const router = useRouter();

  console.log("initialMatch", initialMatch);

  useEffect(() => {
    const ws = new WebSocket(`${WsBaseUrl}/matches/${matchId}/live`);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const updatedMatch: { data: MatchResponse } = JSON.parse(event.data);
        console.log("updatedMatch", updatedMatch);
        if (updatedMatch.data.status !== "ongoing") {
          ws.close();
          router.refresh();
        }
        setMatch(updatedMatch.data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [matchId]);

  const curSet = useMemo(() => {
    return match.match_sets?.find((set) => !set.is_finished);
  }, [match.match_sets]);

  return (
    <div>
      <hr />
      <div className="flex justify-between items-center rounded-lg py-4 gap-6">
        <div className="flex flex-row items-center justify-between">
          <Player
            names={match.participant_a.name.split("/")}
            className="flex-col md:flex-row"
          />
        </div>
        {match.match_sets && match.match_sets?.length > 0 ? (
          <div className="space-y-3 flex flex-col items-center">
            <div className="flex gap-6 items-center">
              <p className={cn("text-4xl")}>{curSet?.set_score_a || 0}</p>
              <p className="text-base font-semibold text-gray-400">VS</p>
              <p className={cn("text-4xl")}>{curSet?.set_score_b || 0}</p>
            </div>
          </div>
        ) : (
          <p className="text-2xl font-bold">VS</p>
        )}
        <Player
          names={match.participant_b.name.split("/")}
          className="flex-col md:flex-row md:flex-row-reverse"
        />
      </div>
      <div className="flex gap-6 justify-center border-y">
        {match?.match_sets?.map((set, index) => {
          if (set.is_finished)
            return (
              <p key={index}>
                <span
                  className={cn(
                    set.is_finished && set.set_score_a > set.set_score_b
                      ? "font-semibold text-red-400"
                      : "text-gray-700",
                  )}
                >
                  {set.set_score_a}
                </span>
                &nbsp;-&nbsp;
                <span
                  className={cn(
                    set.is_finished && set.set_score_a < set.set_score_b
                      ? "font-semibold text-red-400"
                      : "text-gray-700",
                  )}
                >
                  {set.set_score_b}
                </span>
              </p>
            );
        })}
      </div>
    </div>
  );
};

export default LiveMatchScoreBadminton;
