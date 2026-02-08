"use client";
import { EventsResponse } from "@/types/event";
import React from "react";
import EventLineup from "../commons/event-lineup";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";

type Props = {
  events: EventsResponse["events"];
};

const PlayerEventList = ({ events }: Props) => {
  const { mutate } = useMutation({
    mutationFn: async (eventId: string) => {},
  });

  const joinTournament = (eventId: string) => {
    mutate(eventId);
  };
  return (
    <div className="grid grid-cols-1 gap-0">
      {events.map((event) => (
        <div
          key={event.id}
          className="hover:bg-gray-100 flex justify-between items-center px-2"
        >
          <EventLineup event={event} />
          <Button
            variant="outline"
            onClick={() => joinTournament(event.tournament.id)}
          >
            Join Event
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlayerEventList;
