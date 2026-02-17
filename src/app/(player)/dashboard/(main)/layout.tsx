import { getPlayerDetails } from "@/actions/player";
import DashboardNav from "@/components/commons/dashboard-nav";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/user/profile-header";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const player = await getPlayerDetails();

  if (!player) {
    return (
      <div className="container">
        <p>Please complete your profile</p>
        <Link href="/player-details">
          <Button>Complete Profile</Button>
        </Link>
      </div>
    );
  }

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
