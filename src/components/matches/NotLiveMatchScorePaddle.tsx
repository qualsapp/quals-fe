import React from "react";
import { MatchResponse, MatchSetModel } from "@/types/match";
import { cn } from "@/lib/utils";
import Player from "../commons/player";

type Props = {
  match: MatchResponse;
};

const NotLiveMatchScorePaddle = ({ match }: Props) => {
  const setScore = (set: MatchSetModel[]) => {
    let score_a = 0;
    let score_b = 0;
    set.forEach((set) => {
      if (set.is_finished) {
        score_a += set.set_score_a;
        score_b += set.set_score_b;
      }
    });

    return {
      score_a,
      score_b,
    };
  };
  return (
    <div className="flex md:flex-row flex-col justify-between items-center rounded-lg p-6 border-y gap-6 d:gap-0">
      <Player names={match.participant_a.name.split("/")} />

      {match.match_sets && match.match_sets?.length > 0 ? (
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
      ) : (
        <p className="text-2xl font-bold">VS</p>
      )}

      <Player names={match.participant_b.name.split("/")} />
    </div>
  );
};

export default NotLiveMatchScorePaddle;
