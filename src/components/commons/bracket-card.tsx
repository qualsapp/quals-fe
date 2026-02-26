import React from "react";
import { MatchComponentProps } from "@/types/bracket";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Eye, Video } from "lucide-react";

interface BracketCardProps extends MatchComponentProps {
  open: boolean;
  isEditable?: boolean;
  handleOpen: (matchId: string) => void;
}

function BracketCard({
  isEditable,
  bottomHovered,
  bottomParty,
  bottomWon,
  match,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topWon,
  open,
  handleOpen,
}: BracketCardProps) {
  const isFirstRound = String(match.tournamentRoundText) === "1";

  return (
    <div
      onClick={() =>
        isFirstRound && isEditable ? handleOpen(String(match.id)) : null
      }
      className={cn(
        isFirstRound && isEditable ? "cursor-pointer" : "",
        open ? "border-primary" : "",
        "relative",
      )}
    >
      <div className="border rounded-md flex flex-col">
        <Item
          className={cn(
            "p-0 gap-1 flex flex-nowrap rounded-t-md rounded-b-none",
            topHovered ? "bg-gray-100" : "",
            topWon ? "bg-primary text-secondary" : "",
          )}
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          onClick={() => {
            onPartyClick?.(topParty, topWon);
          }}
        >
          <ItemMedia className="p-2">
            <Avatar className="size-5">
              <AvatarImage src={topParty.picture} />
              <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
                {topParty.name?.split("")[0]}
              </AvatarFallback>
            </Avatar>
          </ItemMedia>

          <ItemContent className="py-2">
            <ItemTitle className="line-clamp-1 text-xs">
              {topParty?.name}
            </ItemTitle>
          </ItemContent>
          <ItemContent className="p-2 border-l">
            <ItemTitle className="font-bold">
              {topParty?.resultText || "-"}
            </ItemTitle>
          </ItemContent>
        </Item>
        <hr />
        <Item
          className={cn(
            "p-0 gap-1 flex flex-nowrap rounded-b-md rounded-t-none",
            bottomHovered ? "bg-gray-100" : "",
            bottomWon ? "bg-primary text-secondary" : "",
          )}
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <ItemMedia className="p-2">
            <Avatar className="size-5">
              <AvatarImage src={bottomParty.picture} />
              <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
                {bottomParty.name?.split("")[0] || "Q"}
              </AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1 text-xs">
              {bottomParty?.name}
            </ItemTitle>
          </ItemContent>
          <ItemContent className="border-l p-2">
            <ItemTitle className="font-bold">
              {bottomParty?.resultText || "-"}
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex space-x-2 text-gray-500 text-xs mt-1 px-2">
        {match.court_number ? (
          <>
            <span>Court {match.court_number}</span>
          </>
        ) : (
          ""
        )}
        {match.startTime ? (
          <>
            {match?.court_number && <span>|</span>}
            <span>{match.startTime}</span>
          </>
        ) : (
          ""
        )}

        {match.state === "LIVE" ? (
          <span className="ml-auto">
            <Video className="w-4 h-4 text-destructive" />
          </span>
        ) : match.href ? (
          <a href={match.href} aria-label="match detail" className="ml-auto">
            <Eye className="w-4 h-4" />
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BracketCard;
