"use client";
import React, { useEffect, useState } from "react";
import {
  SingleEliminationBracket,
  createTheme,
} from "@g-loot/react-tournament-brackets";

import BracketCard from "./bracket-card";
import UpdatePlayerForm from "../forms/UpdatePlayerForm";
import { EventResponse } from "@/types/event";
import { Match, MatchComponentProps } from "@/types/bracket";

type Props = {
  matches: Match[];
  event: EventResponse;
  isEditable?: boolean;
};

const WhiteTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#07090D", dark: "#3E414D" },
  matchBackground: { wonColor: "#daebf9", lostColor: "#96c6da" },
  score: {
    background: { wonColor: "#87b2c4", lostColor: "#87b2c4" },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#CED1F2",
    highlightedColor: "#da96c6",
  },
  roundHeader: { backgroundColor: "#da96c6", fontColor: "#000" },
  connectorColor: "#CED1F2",
  connectorColorHighlight: "#da96c6",
  svgBackground: "#FAFAFA",
});

const TournamentBracket = ({ matches, event, isEditable = false }: Props) => {
  // const { height, width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMatchClick = (matchId: string) => {
    const match = matches.find((m) => String(m.id) === matchId);

    if (!match) return;

    setSelectedMatch(match);
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
        theme={WhiteTheme}
        options={{
          style: {
            roundHeader: {
              backgroundColor: "#d9cdcdff",
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
        selectedMatch && (
          <UpdatePlayerForm
            open={open}
            setOpen={setOpen}
            tournamentId={event?.tournament?.id}
            match_rule_id={String(event?.tournament?.match_rule?.id)}
            tournamentBracketId={String(selectedMatch.id)}
            top_advancing_group={event?.tournament.format === "group_stage"}
            participants={selectedMatch.participants}
            court={selectedMatch.court_number}
          />
        )}
    </>
  );
};

export default TournamentBracket;
