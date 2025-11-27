import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  type: "live" | "next" | "completed";
};

const states = {
  live: "border-destructive",
  next: "border-secondary",
  completed: "border-gray-400",
};

const badgeVariants = {
  live: "destructive",
  next: "secondary",
  completed: "gray",
};

const EventLineup = ({ type = "completed" }: Props) => {
  return (
    <div className={cn(states[type], "space-y-3 border-l-2  p-3")}>
      <p className="font-bold">Event 1</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, ratione.
        Fugiat exercitationem culpa libero laudantium velit odio rem illo ipsam
        id earum? Veritatis culpa, atque ad deserunt aliquid et autem.
      </p>

      <div className="flex gap-2">
        <Badge variant="gray" className="font-bold !rounded-sm">
          9 Oct - 12 Oct
        </Badge>
        <Badge variant="info" className="font-bold !rounded-sm">
          Tournament
        </Badge>
        <Badge
          variant={badgeVariants[type] as "destructive" | "secondary" | "gray"}
          className="font-bold !rounded-sm capitalize"
        >
          {type}
        </Badge>
      </div>
    </div>
  );
};

export default EventLineup;
