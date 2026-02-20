import React from "react";
import { getMatch } from "@/actions/match";
import Player from "@/components/commons/player";
import BackButton from "@/components/commons/back-button";
import { cn } from "@/lib/utils";
import { MatchSetModel } from "@/types/match";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
};

const page = async ({ params }: Props) => {
  const { id, match_id } = await params;

  const match = await getMatch(match_id);

  const setScore = (set: MatchSetModel[]) => {
    let score_a = 0;
    let score_b = 0;
    set.forEach((set) => {
      if (set.is_finished) {
        if (set.score_a > set.score_b) {
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

  if (!match) {
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
                        set.is_finished && set.score_a > set.score_b
                          ? "text-red-400"
                          : "text-gray-400",
                      )}
                    >
                      {set.score_a}
                    </span>
                    &nbsp;:&nbsp;
                    <span
                      className={cn(
                        "font-semibold",
                        set.is_finished && set.score_a < set.score_b
                          ? "text-red-400"
                          : "text-gray-400",
                      )}
                    >
                      {set.score_b}
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
      </div>
    </div>
  );
};

export default page;
