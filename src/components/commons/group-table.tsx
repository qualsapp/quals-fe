"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { GroupResponse } from "@/types/group";
import { MatchSetModel } from "@/types/match";

type Props = {
  group: GroupResponse;
};

const GroupTable = ({ group }: Props) => {
  const players = group.participants;

  const convertResult = (sets: MatchSetModel[]) => {
    if (sets.length > 0) {
      const result = sets.reduce(
        (acc, set) => {
          if (set.set_score_a > set.set_score_b) {
            acc.a += 1;
          } else {
            acc.b += 1;
          }
          return acc;
        },
        { a: 0, b: 0 },
      );

      return `${result.a} - ${result.b}`;
    }

    return "-";
  };

  return (
    <div
      className={cn(
        "grid gap-[2px] w-auto",
        `grid-cols-[repeat(5,minmax(150px,1fr))]`,
      )}
    >
      <p className="font-bold border p-3 text-center bg-primary text-secondary border-primary rounded-tl-md ">
        Team
      </p>
      {players?.map((player, index) => (
        <p
          key={index}
          className={cn(
            "hover:bg-primary/90 font-bold border p-3 text-center bg-primary text-secondary border-primary truncate",
            index === players.length - 1 ? "rounded-tr-md" : "",
          )}
        >
          {player.name}
        </p>
      ))}

      {players?.map((_, rowIndex) => (
        <>
          <p
            className={cn(
              "font-bold border p-3 text-center bg-primary text-secondary border-primary  truncate",
              rowIndex === players?.length - 1 ? "rounded-bl-md" : "",
            )}
          >
            {players?.[rowIndex]?.name}
          </p>
          {players?.map((player, colIndex) => (
            <p
              key={colIndex}
              className={cn("border text-center p-3 border-primary")}
            >
              {player.id === players[rowIndex]?.id ? (
                <CircleX className="mx-auto text-destructive" />
              ) : (
                convertResult(
                  group.matches.find(
                    (match) =>
                      Number(match.participant_a_id) ===
                        Number(players[rowIndex]?.id) &&
                      Number(match.participant_b_id) ===
                        Number(players[colIndex]?.id),
                  )?.match_sets || [],
                )
              )}
            </p>
          ))}
        </>
      ))}
    </div>
  );
};

export default GroupTable;
