"use client";
import { EventsResponse } from "@/types/event";
import React from "react";
import EventLineup from "../commons/event-lineup";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
  events: EventsResponse["events"];
};

const PlayerEventList = ({ events }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-0">
      {events.map((event) => (
        <div
          key={event.id}
          className="hover:bg-gray-100 flex justify-between items-center pr-4"
        >
          <Link href={`/events/${event.id}`}>
            <EventLineup event={event} />
          </Link>
          <Button variant="outline" onClick={() => {}}>
            Join Event
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlayerEventList;
