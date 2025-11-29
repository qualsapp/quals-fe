import DashboardNav from "@/components/commons/dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  params: { username: string };
};

const page = async (props: Props) => {
  const { username } = props.params;

  const menus = [
    { label: "Stats", href: `/${username}` },
    { label: "Matches", href: `/${username}/matches` },
    { label: "Events", href: `/${username}/events` },
  ];
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-6">
        <Item
          className={cn("p-2 flex flex-nowrap rounded-t-md rounded-b-none")}
        >
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
        <div className="flex space-x-4">
          <Button variant="outline" className="inline">
            Edit Profile
          </Button>
          <Button variant="outline" className="inline">
            Share Profile
          </Button>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} currentMenu="stats" />
        </div>
      </div>
    </div>
  );
};

export default page;
