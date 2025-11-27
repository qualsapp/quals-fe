import React from "react";
import { MatchComponentProps } from "../../types/match";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

function BracketCard({
  bottomHovered,
  bottomParty,
  bottomText,
  bottomWon,
  match,
  onMatchClick,
  onMouseEnter,
  onMouseLeave,
  onPartyClick,
  topHovered,
  topParty,
  topText,
  topWon,
}: MatchComponentProps) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {(match.href || typeof onMatchClick === "function") && (
          <a
            href={match.href}
            onClick={(event: any) =>
              onMatchClick?.({ match, topWon, bottomWon, event })
            }
          >
            <p>Match Details</p>
          </a>
        )}
      </div>
      <div className="border rounded-md flex flex-col">
        <Item
          className={cn(
            "p-2 flex flex-nowrap rounded-t-md rounded-b-none",
            topHovered ? "bg-gray-100" : "",
            topWon ? "bg-primary text-secondary" : ""
          )}
          onMouseEnter={() => onMouseEnter(topParty.id)}
          onMouseLeave={onMouseLeave}
          onClick={() => onPartyClick?.(topParty, topWon)}
        >
          {topParty?.name && (
            <ItemMedia>
              <Avatar className="size-6">
                <AvatarImage src={topParty.picture} />
                <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
                  {topParty.name?.split("")[0]}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
          )}
          <ItemContent>
            <ItemTitle>{topParty?.name}</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemTitle>{topParty?.resultText}</ItemTitle>
          </ItemContent>
        </Item>
        <div className="h-[1px] border-t border-gray-200" />
        <Item
          className={cn(
            "p-2 flex flex-nowrap rounded-b-md rounded-t-none",
            bottomHovered ? "bg-gray-100" : "",
            bottomWon ? "bg-primary text-secondary" : ""
          )}
          onMouseEnter={() => onMouseEnter(bottomParty.id)}
          onMouseLeave={onMouseLeave}
          onClick={() => onPartyClick?.(bottomParty, bottomWon)}
        >
          <ItemMedia>
            <Avatar className="size-6">
              <AvatarImage src={bottomParty.picture} />
              <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
                {bottomParty.name?.split("")[0] || "Q"}
              </AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{bottomParty?.name}</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemTitle>{bottomParty?.resultText}</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex space-x-2 text-gray-500 text-xs mt-1">
        <p>{bottomText ?? " "}</p>
        {topText && (
          <>
            <span>|</span>
            <p>{topText ?? ""}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default BracketCard;
