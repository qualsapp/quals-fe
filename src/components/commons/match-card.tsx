import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import Link from "next/link";
import { Timer } from "lucide-react";
import { MatchResponse } from "@/types/match";
import Player from "./player";
import { cn } from "@/lib/utils";

type Props = {
  type: "live" | "order_of_play";
  match: MatchResponse;
  url: string;
};

const MatchCard = ({ type, url, match }: Props) => {
  console.log(match);
  return (
    <Card className="w-full max-w-sm p-0">
      <CardHeader className="bg-primary rounded-t-lg pt-2 pb-1">
        <CardTitle className="mb-0">
          <Link
            href={url}
            className="underline text-center block text-secondary"
          >
            <Button
              variant="link"
              className="text-secondary w-full text-center underline"
              size="sm"
            >
              {type === "live"
                ? `Court ${match.court_number}`
                : `Match ${match?.tournament_bracket?.match_number}`}
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center py-0">
        <div>
          <Player names={match.participant_a.name.split("/")} image={""} />
          <Player names={match.participant_b.name.split("/")} image={""} />
        </div>
        {match.match_sets !== null && (
          <div className="flex items-center gap-3">
            {match.winner?.id === match.participant_a.id && (
              <div className="flex flex-col items-center gap-6">
                <div className="h-3 w-3 rounded-full bg-green-400 ring-3 ring-green-100"></div>
                <div className="h-3 w-3 rounded-full bg-transparent ring-3 ring-transparent"></div>
              </div>
            )}
            {match.winner?.id === match.participant_b.id && (
              <div className="flex flex-col items-center gap-6">
                <div className="h-3 w-3 rounded-full bg-transparent ring-3 ring-transparent"></div>
                <div className="h-3 w-3 rounded-full bg-green-400 ring-3 ring-green-100"></div>
              </div>
            )}
            {match.match_sets?.map((set, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <p
                  className={cn(
                    "font-semibold",
                    set.is_finished && set.score_a > set.score_b
                      ? "text-red-400"
                      : "",
                  )}
                >
                  {set.score_a}
                </p>
                <p
                  className={cn(
                    "font-semibold",
                    set.is_finished && set.score_a < set.score_b
                      ? "text-red-400"
                      : "",
                  )}
                >
                  {set.score_b}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-primary-100 rounded-b-lg py-2 flex justify-between items-center">
        <p className="font-bold">
          Final .{" "}
          {type === "order_of_play"
            ? `Court ${match.court_number}`
            : `Match ${match.tournament_bracket?.match_number}`}
        </p>
        <p className="font-semibold flex items-center gap-1">
          <Timer /> {match.scheduled_at}
        </p>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
