"use client";
import React from "react";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  // Match,
  MATCH_STATES,
  SVGViewer,
  createTheme,
} from "@g-loot/react-tournament-brackets";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

import { useWindowSize } from "@uidotdev/usehooks";
import { Match } from "@/types/match";
import KnockOffCard from "./knock-off-card";
import BracketCard from "./bracket-card";
import UpdatePlayerForm from "../forms/UpdatePlayerForm";

type Props = {
  matches: any;
};

const TournamentBracket = ({ matches }: Props) => {
  const { height, width } = useWindowSize();
  const [open, setOpen] = React.useState(false);
  const finalWidth = width ? Math.max(width - 50, 500) : 0;
  const finalHeight = height ? Math.max(height - 100, 500) : 0;
  return (
    <>
      <SingleEliminationBracket
        matches={matches}
        matchComponent={(props: any) => (
          <BracketCard {...props} open={open} setOpen={setOpen} />
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
          <SVGViewer width={finalWidth} height={finalHeight} {...props}>
            {children}
          </SVGViewer>
        )}
      />
      <UpdatePlayerForm open={open} setOpen={setOpen} />
    </>
  );
};

export default TournamentBracket;
