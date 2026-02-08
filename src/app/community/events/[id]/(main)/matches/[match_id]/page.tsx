import BadmintonBoard from "@/components/score-boards/badminton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import FullScreenWrapper from "@/components/commons/full-screen";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id, match_id } = await params;

  // to do: match detail api call

  return (
    <div className="container max-w-3xl mx-auto py-10 lg:py-16 space-y-8">
      <div className="flex flex-row gap-3 justify-center items-center">
        <p className="text-lg font-semibold">Fri 12/5/2025</p>
        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        <p className="text-lg font-semibold">Court 3</p>
        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        <p className="text-lg font-semibold">Match 1</p>
      </div>

      <div className="flex justify-between items-center rounded-lg p-6 border-y ">
        <Item className="p-2 flex flex-nowrap">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Player A1</ItemTitle>
            <ItemTitle>Player A2</ItemTitle>
          </ItemContent>
        </Item>

        <p className="text-2xl font-bold">VS</p>

        <Item className="p-2 flex flex-nowrap">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Player B1</ItemTitle>
            <ItemTitle>Player B2</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className="flex justify-center">
        <Button>Start Match</Button>
      </div>
    </div>
  );
};

export default page;
