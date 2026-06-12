import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Plus } from "lucide-react";
import DeleteEventButton from "./delete-event";
import { EventResponse } from "@/types/event";

type Props = {
  event: EventResponse;
  addHref?: string;
};

const LayoutActions = ({ event, addHref }: Props) => {
  const { id } = event;

  return (
    <div className="flex items-center gap-3">
      {addHref && (
        <Link href={addHref}>
          <Button aria-label="Add tournament" className="gap-2">
            <Plus className="h-4 w-4" /> Add tournament
          </Button>
        </Link>
      )}

      <div className="flex gap-2 border-l border-border pl-3">
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

        <DeleteEventButton eventId={id} />
      </div>
    </div>
  );
};

export default LayoutActions;
