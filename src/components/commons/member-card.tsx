import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

type Props = {
  name?: string;
};

const MemberCard = (props: Props) => {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src="/images/quals-logo.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{props.name || "Evil Rabbit"}</ItemTitle>
        {/* <ItemDescription>Beginner</ItemDescription> */}
      </ItemContent>
      {/* <ItemActions>
        <Button variant="outline" className="rounded-full">
          Kick Out
        </Button>
        <Button variant="destructive" className="rounded-full">
          Report
        </Button>
      </ItemActions> */}
    </Item>
  );
};

export default MemberCard;
