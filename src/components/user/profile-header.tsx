"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlayerDetailResponse } from "@/types/user";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  player: PlayerDetailResponse;
};

const ProfileHeader = ({ player }: Props) => {
  return (
    <>
      <Item className={cn("p-2 flex flex-nowrap rounded-t-md rounded-b-none")}>
        <ItemMedia>
          <Avatar className="size-32">
            <AvatarImage
              src={player?.photo_url || "https://github.com/evilrabbit.png"}
            />
            <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
              {player?.username}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>

        <ItemContent>
          <ItemTitle className="text-2xl capitalize">
            {player?.display_name}
          </ItemTitle>
          <ItemDescription>@{player?.username}</ItemDescription>
          <ItemDescription className="space-x-1 mt-3">
            {player?.sport_types?.map((sport) => {
              return (
                <Badge key={sport.id} variant="outline">
                  {sport.name}
                </Badge>
              );
            })}
          </ItemDescription>
        </ItemContent>
      </Item>
      <div className="flex space-x-4">
        <Link href={`/dashboard/edit-profile`}>
          <Button variant="outline" className="inline">
            Edit Profile
          </Button>
        </Link>
        <Button variant="outline" className="inline">
          Share Profile
        </Button>
      </div>
    </>
  );
};

export default ProfileHeader;
