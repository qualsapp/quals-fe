import DashboardNav from "@/components/commons/dashboard-nav";
import ProfileSection from "@/components/sections/ProfileSection";

import React from "react";

type Props = {
  params: { username: string };
};

const page = async (props: Props) => {
  const { username } = props.params;

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
          <DashboardNav menus={menus} currentMenu="My Communities" />
        </div>
      </div>
    </div>
  );
};

export default page;
