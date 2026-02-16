import React from "react";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  names: string[];
  image?: string;
};

const Player = ({ names, image }: Props) => {
  return (
    <Item className="p-2 flex flex-nowrap">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src={image || "https://github.com/evilrabbit.png"} />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        {names.map((name, index) => (
          <ItemTitle key={index}>{name}</ItemTitle>
        ))}
      </ItemContent>
    </Item>
  );
};

export default Player;
