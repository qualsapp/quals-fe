import React from "react";
import { EventResponse } from "@/types/event";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";

type Props = {
  event: EventResponse;
};

const LayoutHead = ({ event }: Props) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold">{event.title}</h2>

      <Badge variant="gray" className="font-bold ">
        {dayjs(event.start_time).format("DD MMM")} -{" "}
        {dayjs(event.end_time).format("DD MMM")}
      </Badge>

      <p>{event.description}</p>
    </div>
  );
};

export default LayoutHead;
