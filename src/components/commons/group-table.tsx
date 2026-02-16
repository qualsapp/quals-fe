"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { GroupResponse } from "@/types/group";

type Props = {
  players?: GroupResponse["participants"][number][];
  results?: string[][];
};

const GroupTable = ({ players, results }: Props) => {
  if (!players) {
    return <div>no Player</div>;
  }

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
            "hover:bg-primary/90 font-bold border p-3 text-center bg-primary text-secondary border-primary whitespace-nowrap",
            index === players.length - 1 ? "rounded-tr-md" : "",
          )}
        >
          {player.name}
        </p>
      ))}

      {players?.map((player, rowIndex) => (
        <>
          <p
            className={cn(
              "font-bold border p-3 text-center bg-primary text-secondary border-primary whitespace-nowrap",
              rowIndex === players?.length - 1 ? "rounded-bl-md" : "",
            )}
          >
            {players?.[rowIndex].name}
          </p>
          {players?.map((player, colIndex) => (
            <p
              key={colIndex}
              className={cn("border text-center p-3 border-primary")}
            >
              {player.id === players[rowIndex].id ? (
                <CircleX className="mx-auto text-destructive" />
              ) : (
                0
              )}
            </p>
          ))}
        </>
      ))}
    </div>
  );
};

export default GroupTable;
