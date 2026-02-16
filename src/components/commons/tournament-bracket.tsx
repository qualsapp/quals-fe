"use client";
import React, { useEffect, useState } from "react";
import {
  SingleEliminationBracket,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

import { useWindowSize } from "@uidotdev/usehooks";
import BracketCard from "./bracket-card";
import UpdatePlayerForm from "../forms/UpdatePlayerForm";
import { EventResponse } from "@/types/event";
import { Match } from "@/types/match";

type Props = {
  matches: Match[];
  event: EventResponse;
  isEditable?: boolean;
};

const TournamentBracket = ({ matches, event, isEditable = false }: Props) => {
  const { height, width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const finalWidth = width ? Math.max(width - 50, 500) : 0;
  const finalHeight = height ? Math.max(height - 100, 500) : 0;

  const handleMatchClick = (matchId: number) => {
    setSelectedMatchId(matchId);
    setOpen(true);
  };

  return (
    <>
      <SingleEliminationBracket
        matches={matches}
        matchComponent={(props: any) => (
          <BracketCard
            {...props}
            open={open}
            handleOpen={isEditable ? handleMatchClick : () => {}}
          />
        )}
        options={{
          style: {
            roundHeader: {
              backgroundColor: "#7f0d0d",
              fontColor: "#f3ec19",
            },
            connectorColor: "#ccc",
            connectorColorHighlight: "#123C67",
          },
        }}
        svgWrapper={({ children, ...props }: any) => (
          <div className="w-[90vw] h-full">
            <div className="overflow-x-scroll" {...props}>
              {children}
            </div>
          </div>
        )}
        // svgWrapper={({ children, ...props }: any) => (
        //   <SVGViewer width={finalWidth} height={finalHeight} {...props}>
        //     {children}
        //   </SVGViewer>
        // )}
      />
      {isEditable &&
        event?.tournament &&
        event.tournament.id &&
        event?.tournament?.match_rule?.id && (
          <UpdatePlayerForm
            open={open}
            setOpen={setOpen}
            tournamentId={event?.tournament?.id}
            match_rule_id={String(event?.tournament?.match_rule?.id)}
            tournamentBracketId={selectedMatchId}
          />
        )}
    </>
  );
};

export default TournamentBracket;
