import React from "react";
import { Badge } from "../ui/badge";
import { cn, eventState } from "@/lib/utils";
import { EventResponse } from "@/types/event";
import dayjs from "dayjs";
import {
  eventBadgeVariants,
  eventLineupStates,
} from "@/lib/constants/event-states";

type Props = {
  event: EventResponse;
};

const EventLineup = ({ event }: Props) => {
  const state = eventState(event);
  return (
    <div className={cn(eventLineupStates[state], "space-y-3 border-l-2  p-3")}>
      <p className="font-bold">{event.title}</p>
      <p>{event.description}</p>

      <div className="flex gap-2">
        <Badge variant="gray" className="font-bold !rounded-sm">
          {dayjs(event.start_time).format("DD MMM")} -{" "}
          {dayjs(event.end_time).format("DD MMM")}
        </Badge>
        <Badge variant="info" className="font-bold !rounded-sm">
          Tournament
        </Badge>
        <Badge
          variant={
            eventBadgeVariants[state] as "destructive" | "secondary" | "gray"
          }
          className="font-bold !rounded-sm capitalize"
        >
          {state}
        </Badge>
      </div>
    </div>
  );
};

export default EventLineup;
