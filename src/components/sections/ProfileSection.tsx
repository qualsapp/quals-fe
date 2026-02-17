import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type Props = {
  username: string;
};

const ProfileSection = ({ username }: Props) => {
  return (
    <Item className={cn("p-2 flex flex-nowrap rounded-t-md rounded-b-none")}>
      <ItemMedia>
        <Avatar className="size-32">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback className="bg-gray-100 text-gray-500 uppercase font-bold">
            {username}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent>
        <ItemTitle className="text-2xl capitalize">{username}</ItemTitle>
        <ItemDescription>@{username}</ItemDescription>
        <ItemDescription>Beginner</ItemDescription>
      </ItemContent>
    </Item>
  );
};

export default ProfileSection;
