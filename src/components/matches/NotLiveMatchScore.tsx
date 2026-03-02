import React from "react";
import { MatchResponse, MatchSetModel } from "@/types/match";
import { cn } from "@/lib/utils";
import Player from "../commons/player";

type Props = {
  match: MatchResponse;
};

const NotLiveMatchScore = ({ match }: Props) => {
  const setScore = (set: MatchSetModel[]) => {
    let score_a = 0;
    let score_b = 0;
    set.forEach((set) => {
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
  return (
    <div className="flex md:flex-row flex-col justify-between items-center rounded-lg p-6 gap-6 md:gap-0 border-y">
      <Player names={match.participant_a.name.split("/")} />

      {match.match_sets && match.match_sets?.length > 0 ? (
        <div className="space-y-3 flex flex-col items-center">
          <div className="flex gap-3">
            <p
              className={cn(
                "w-16 h-24 flex items-center justify-center text-6xl border border-gray-400",
                setScore(match.match_sets).score_a >
                  setScore(match.match_sets).score_b
                  ? "bg-primary text-secondary"
                  : "",
              )}
            >
              {setScore(match.match_sets).score_a}
            </p>
            <p
              className={cn(
                "w-16 h-24 flex items-center justify-center text-6xl border border-gray-400",
                setScore(match.match_sets).score_a <
                  setScore(match.match_sets).score_b
                  ? "bg-primary text-secondary"
                  : "",
              )}
            >
              {setScore(match.match_sets).score_b}
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

export default NotLiveMatchScore;
