import React from "react";

import DashboardNav from "@/components/commons/dashboard-nav";
import { cookies } from "next/headers";
import { communityService } from "@/services/community-service";
import { MapPin } from "lucide-react";
import { CommunityResponse } from "@/types/community";

const menus = [
  { label: "Events", href: "/community/events" },
  { label: "Members", href: "/community/members" },
  { label: "Statistic", href: "/community/statistic" },
];

const getCommunityById = async (id: string) => {
  const cookieStore = await cookies();
  return communityService.getById(id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieStore.get("token")?.value}`,
    },
  });
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const community = (await getCommunityById("9")) || ({} as CommunityResponse);
  const community = {
    name: "Community",
    address: "Address",
    description: "Description",
  };
  // console.log("Community Layout:", community);

  return (
    <>
      <div className="py-10 space-y-10">
        <div className="container flex flex-col gap-4">
          <div className="border-y py-3 space-y-2">
            <h2 className="text-4xl">
              Welcome to <strong>{community.name}</strong>
            </h2>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-destructive" />{" "}
              {community.address}
            </p>
            <p className="text-gray-400">{community.description}</p>
          </div>

          <div className=" flex justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase text-gray-300">
                COMMUNITY INFO
              </h2>
              <p>Host</p>
              <p>Praba</p>
              <p>Praba 2</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase text-gray-300">
                MEMBERS
              </h2>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase text-gray-300">
                EVENTS
              </h2>
            </div>
          </div>
        </div>
        <div className="bg-primary-50">
          <div className="container">
            <DashboardNav menus={menus} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
