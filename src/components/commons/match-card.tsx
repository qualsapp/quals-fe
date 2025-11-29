import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Timer } from "lucide-react";

type Props = {};

const MatchCard = (props: Props) => {
  const hasStarted = false;
  return (
    <Card className="w-full max-w-sm p-0">
      <CardHeader className="bg-primary rounded-t-lg pt-2 pb-1">
        <CardTitle className="mb-0">
          {hasStarted ? (
            <Link
              href={`/community/events/123/matches/1`}
              className="underline text-center block text-secondary"
            >
              <Button
                variant="link"
                className="text-secondary w-full text-center underline"
                size="sm"
              >
                Match 1
              </Button>
            </Link>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-secondary w-full text-center underline"
                  size="sm"
                >
                  Match 1
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center">Match 1</DialogTitle>
                  <DialogDescription className="text-center">
                    Do you want to start this match?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex mx-auto">
                  <Link href={`/community/events/123/matches/1`}>
                    <Button>Start Match</Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
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
        <p className="font-bold">Final . Court 1</p>
        <p className="font-semibold flex items-center gap-1">
          <Timer /> 20:00
        </p>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
