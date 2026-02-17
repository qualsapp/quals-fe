import React from "react";

import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";

type Props = {
  name?: string;
};

const MemberCard = (props: Props) => {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{props.name || "Evil Rabbit"}</ItemTitle>
        <ItemDescription>Beginner</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" className="rounded-full">
          Kick Out
        </Button>
        <Button variant="destructive" className="rounded-full">
          Report
        </Button>
      </ItemActions>
    </Item>
  );
};

export default MemberCard;
