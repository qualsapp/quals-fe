import DashboardNav from "@/components/commons/dashboard-nav";
import ProfileSection from "@/components/sections/ProfileSection";
import { userService } from "@/services/user-services";
import { cookies } from "next/headers";

import React from "react";

type Props = {
  params: Promise<{ username: string }>;
};

const page = async (props: Props) => {
  const { username } = await props.params;

  const menus = [
    { label: "My Communities", href: `/dashboard/my-communities` },
    { label: "Events", href: `/dashboard/events` },
  ];
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-6">
        <ProfileSection username={username} />
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>
    </div>
  );
};

export default page;
