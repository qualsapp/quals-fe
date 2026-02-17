"use client";
import React, { useEffect, useState } from "react";
import { SingleEliminationBracket } from "@g-loot/react-tournament-brackets";

import BracketCard from "./bracket-card";
import UpdatePlayerForm from "../forms/UpdatePlayerForm";
import { EventResponse } from "@/types/event";
import { Match, MatchComponentProps } from "@/types/bracket";

type Props = {
  matches: Match[];
  event: EventResponse;
  isEditable?: boolean;
};

const TournamentBracket = ({ matches, event, isEditable = false }: Props) => {
  // const { height, width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMatchClick = (matchId: string) => {
    setSelectedMatchId(matchId);
    setOpen(true);
  };

  return (
    <>
      <SingleEliminationBracket
        matches={matches}
        matchComponent={(props: MatchComponentProps) => (
          <BracketCard
            {...props}
            open={open}
            isEditable={isEditable}
            handleOpen={handleMatchClick}
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
        svgWrapper={({ children }: { children: React.ReactNode }) => (
          <div className="w-[90vw] h-full">
            <div className="overflow-x-scroll">{children}</div>
          </div>
        )}
      />
      {isEditable &&
        event?.tournament &&
        event.tournament.id &&
        event?.tournament?.match_rule?.id &&
        selectedMatchId && (
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
