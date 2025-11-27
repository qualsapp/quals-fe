import DashboardNav from "@/components/commons/dashboard-nav";
import EventCard from "@/components/commons/event-card";

import React from "react";

type Props = {};

const menus = [
  { label: "Event", href: "/community/events" },
  { label: "Members", href: "/community/members" },
  { label: "Statistic", href: "/community/statistic" },
];

const page = (props: Props) => {
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex justify-between">
        <div className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-gray-300">
            COMMUNITY INFO
          </h2>
          <p>Host</p>
          <p>Praba</p>
          <p>Praba 2</p>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-gray-300">MEMBERS</h2>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-bold uppercase text-gray-300">EVENTS</h2>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} currentMenu="event" />

          {Array.from({ length: 5 }).map((_, index) => (
            <EventCard />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
