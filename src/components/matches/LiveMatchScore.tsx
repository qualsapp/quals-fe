"use client";

import React, { useEffect, useState } from "react";
import { MatchResponse, MatchSetModel } from "@/types/match";
import Player from "@/components/commons/player";
import { cn } from "@/lib/utils";
import { ApiUrl } from "@/lib/env";

type Props = {
  initialMatch: MatchResponse;
  matchId: string;
};

const LiveMatchScore = ({ initialMatch, matchId }: Props) => {
  const [match, setMatch] = useState<MatchResponse>(initialMatch);

  useEffect(() => {
    const ws = new WebSocket(`ws://${ApiUrl}/matches/${matchId}/live`);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const updatedMatch: MatchResponse = JSON.parse(event.data);
        setMatch(updatedMatch);
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

  const setScore = (sets: MatchSetModel[] | null) => {
    let score_a = 0;
    let score_b = 0;
    if (!sets) return { score_a, score_b };

    sets.forEach((set) => {
      if (set.is_finished) {
        if (set.set_score_a > set.set_score_b) {
          score_a += 1;
        } else {
          score_b += 1;
        }
      }
    });

    return {
      score_a,
      score_b,
    };
  };

  const currentScores = setScore(match.match_sets);

  return (
    <div className="flex md:flex-row flex-col justify-between items-center rounded-lg p-6 border-y ">
      <Player names={match.participant_a.name.split("/")} />

      {match.match_sets && match.match_sets?.length > 0 ? (
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex gap-3">
            <p
              className={cn(
                "w-16 h-24 flex items-center justify-center text-6xl border border-gray-400",
                currentScores.score_a > currentScores.score_b
                  ? "bg-primary text-secondary"
                  : "",
              )}
            >
              {currentScores.score_a}
            </p>
            <p
              className={cn(
                "w-16 h-24 flex items-center justify-center text-6xl border border-gray-400",
                currentScores.score_a < currentScores.score_b
                  ? "bg-primary text-secondary"
                  : "",
              )}
            >
              {currentScores.score_b}
            </p>
          </div>
          <div className="flex gap-6">
            {match.match_sets.map((set, index) => (
              <p key={index}>
                <span
                  className={cn(
                    "font-semibold",
                    set.is_finished && set.set_score_a > set.set_score_b
                      ? "text-red-400"
                      : "text-gray-400",
                  )}
                >
                  {set.set_score_a}
                </span>
                &nbsp;:&nbsp;
                <span
                  className={cn(
                    "font-semibold",
                    set.is_finished && set.set_score_a < set.set_score_b
                      ? "text-red-400"
                      : "text-gray-400",
                  )}
                >
                  {set.set_score_b}
                </span>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-2xl font-bold">VS</p>
      )}

      <Player names={match.participant_b.name.split("/")} />
    </div>
  );
};

export default LiveMatchScore;
