import EventForm from "@/components/forms/EventForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import React from "react";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id, match_id } = await params;
  const { type } = await searchParams;

  // to do: need match detail api
  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">
          Quals Tournament
        </h2>
        <div className="flex flex-row gap-3 justify-center">
          <p>Fri 12/5/2025</p>
          <p>Court 3</p>
          <p>Match 1</p>
        </div>
      </div>
      <div className="flex justify-between border rounded-lg p-6">
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

        <div className="space-y-3">
          <div className="flex gap-3">
            <p className="w-16 h-24 flex items-center justify-center text-6xl border border-gray-400">
              1
            </p>
            <p className="w-16 h-24 flex items-center justify-center bg-primary text-secondary text-6xl border border-gray-400">
              2
            </p>
          </div>
          <div className="flex gap-3">
            <p>
              <strong>21</strong>:14
            </p>
            <p>
              9:<strong>21</strong>
            </p>
            <p>
              15:<strong>21</strong>
            </p>
          </div>
        </div>

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
    </div>
  );
};

export default page;
