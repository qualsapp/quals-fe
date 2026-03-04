import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Settings2 } from "lucide-react";
import DeleteEventButton from "./delete-event";
import { EventResponse } from "@/types/event";

type Props = {
  event: EventResponse;
};

const LayoutActions = ({ event }: Props) => {
  const { id } = event;
  return (
    <div className="flex gap-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/community/events/${id}/edit`}>
            <Button variant="outline" aria-label="Edit Event">
              <Edit2 />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Edit Event</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/community/events/${id}/rules?type=${event.sport_type.slug}`}
          >
            <Button variant="outline">
              <Settings2 />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Edit Rules</p>
        </TooltipContent>
      </Tooltip>

      <DeleteEventButton eventId={id} />
    </div>
  );
};

export default LayoutActions;
