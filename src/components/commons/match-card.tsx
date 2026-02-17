import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

import { Button } from "../ui/button";
import Link from "next/link";
import { Timer } from "lucide-react";

type Props = {
  type: "live" | "order_of_play";
  court_number: string | number;
  event_id: string | number;
  match_id: string | number;
};

const MatchCard = ({ type, court_number, event_id, match_id }: Props) => {
  return (
    <Card className="w-full max-w-sm p-0">
      <CardHeader className="bg-primary rounded-t-lg pt-2 pb-1">
        <CardTitle className="mb-0">
          <Link
            href={`/community/events/${event_id}/matches/${match_id}`}
            className="underline text-center block text-secondary"
          >
            <Button
              variant="link"
              className="text-secondary w-full text-center underline"
              size="sm"
            >
              {type === "live"
                ? `Court ${court_number}`
                : `Match ${court_number}`}
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center py-0">
        <div>
          <Item>
            <ItemMedia>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="flex flex-col">
                <p>Player A1</p>
                <p>Player A2</p>
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item>
            <ItemMedia>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="flex flex-col">
                <p>Player B1</p>
                <p>Player B2</p>
              </ItemTitle>
            </ItemContent>
          </Item>
        </div>
        <div>
          <Item>
            <ItemContent>
              <ItemTitle>
                <div className="h-3 w-3 rounded-full bg-green-400 ring-3 ring-green-100"></div>
                <p>21</p>
                <p>22</p>
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item>
            <ItemContent>
              <ItemTitle>
                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                <p>21</p>
                <p>22</p>
              </ItemTitle>
            </ItemContent>
          </Item>
        </div>
      </CardContent>

      <CardFooter className="bg-primary-100 rounded-b-lg py-2 flex justify-between items-center">
        <p className="font-bold">
          Final .{" "}
          {type === "order_of_play"
            ? `Court ${court_number}`
            : `Match ${court_number}`}
        </p>
        <p className="font-semibold flex items-center gap-1">
          <Timer /> 20:00
        </p>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
