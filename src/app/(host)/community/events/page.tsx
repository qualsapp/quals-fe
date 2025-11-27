import DashboardNav from "@/components/commons/dashboard-nav";
import EventCard from "@/components/commons/event-card";
import EventLineup from "@/components/commons/event-lineup";
import EventFilterForm from "@/components/forms/EventFilterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        </div>
      </div>

      <div className="container space-y-10">
        <div className="flex justify-between">
          <EventFilterForm />

          <Link href="/community/events/create">
            <Button>Buat Event</Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <EventCard key={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-0">
          {["live", "next", "completed", "completed", "completed"].map(
            (type, index) => (
              <EventLineup type={type} key={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
