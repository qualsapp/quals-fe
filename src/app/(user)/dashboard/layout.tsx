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
import ProfileHeader from "@/components/user/profile-header";
import { cn } from "@/lib/utils";
import { userServices } from "@/services/user-services";
import { PlayerDetailResponse } from "@/types/user";
import { cookies } from "next/headers";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const player = token
    ? await userServices.getDetail(token)
    : ({} as PlayerDetailResponse);

  console.log(player);

  const menus = [
    { label: "Events", href: `/dashboard/events` },
    { label: "My Communities", href: `/dashboard/my-communities` },
  ];
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-6">
        <ProfileHeader player={player} />
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default layout;
