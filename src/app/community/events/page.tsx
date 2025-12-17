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
  );
};

export default page;
