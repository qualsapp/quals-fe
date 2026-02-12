import React from "react";
import DashboardNav from "@/components/commons/dashboard-nav";
import { MapPin } from "lucide-react";
import { getHostProfile } from "@/actions/host";

const menus = [
  { label: "Events", href: "/community/events" },
  { label: "Members", href: "/community/members" },
  { label: "Statistic", href: "/community/statistic" },
];

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { community } = await getHostProfile();

  console.log(community);

  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <>
      <div className="py-10 space-y-10">
        <div className="container flex flex-col gap-4">
          <div className=" py-3 space-y-2">
            <h2 className="text-4xl">
              Welcome to <strong>{community.name}</strong>
            </h2>
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-destructive" />{" "}
              {community.address}
            </p>
            <p className="text-gray-400">{community.description}</p>
          </div>

          {/* <div className=" flex justify-between">
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
          </div> */}
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
