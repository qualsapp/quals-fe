"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import UpdateGroupParticipantForm from "../forms/UpdateGroupParticipantForm";

type Props = {
  players?: string[];
  results?: string[][];
};

const GroupTable = ({ players, results }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={cn(
        "grid gap-[2px] w-auto",
        `grid-cols-[repeat(6,minmax(150px,1fr))]`,
      )}
    >
      <p className="font-bold border p-3 text-center bg-primary text-secondary border-primary rounded-tl-md ">
        Team
      </p>
      {players?.map((player, index) => (
        <p
          key={index}
          className={cn(
            "hover:cursor-pointer hover:bg-primary/90 font-bold border p-3 text-center bg-primary text-secondary border-primary whitespace-nowrap",
            index === players.length - 1 ? "rounded-tr-md" : "",
          )}
          onClick={() => setOpen(true)}
        >
          {player}
        </p>
      ))}

      {results?.map((row, rowIndex) => (
        <>
          <p
            className={cn(
              "font-bold border p-3 text-center bg-primary text-secondary border-primary whitespace-nowrap",
              rowIndex === players?.length - 1 ? "rounded-bl-md" : "",
            )}
          >
            {players?.[rowIndex]}
          </p>
          {row.map((result, colIndex) => (
            <p
              key={colIndex}
              className={cn(
                "border text-center p-3 border-primary",
                result === "-" ? "text-destructive font-extrabold" : "",
              )}
            >
              {result === "-" ? <CircleX className="mx-auto" /> : result}
            </p>
          ))}
        </>
      ))}

      <UpdateGroupParticipantForm
        tournamentId={""}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default GroupTable;
