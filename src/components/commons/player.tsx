import React from "react";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  names: string[];
  image?: string;
  className?: string;
};

const Player = ({ names, image, className }: Props) => {
  return (
    <Item className={cn("p-2 flex flex-nowrap", className)}>
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
