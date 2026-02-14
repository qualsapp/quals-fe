"use client";
import { EventsResponse } from "@/types/event";
import React from "react";
import EventLineup from "../commons/event-lineup";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  events: EventsResponse["events"];
};

const PlayerEventList = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-0">
      {events.map((eventData) => (
        <Link href={`/events/${eventData.id}`}>
          <div
            key={eventData.id}
            className="hover:bg-gray-100 flex justify-between items-center pr-4"
          >
            <EventLineup event={eventData} />
            <Button variant="outline">Join Event</Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PlayerEventList;
