import { getPlayerDetails } from "@/actions/player";
import DashboardNav from "@/components/commons/dashboard-nav";
import { buttonVariants } from "@/components/ui/button";
import ProfileHeader from "@/components/user/profile-header";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const player = await getPlayerDetails();

  if (!player.username) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center flex-col gap-4">
        <p className="text-black/30 text-2xl font-bold">
          You need to create a player profile to join an event.
        </p>
        <Link
          href="/dashboard/edit-profile"
          className={buttonVariants({ variant: "default" })}
        >
          Create profile
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
