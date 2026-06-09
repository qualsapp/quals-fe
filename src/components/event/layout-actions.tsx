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
import DeleteTournamentButton from "./delete-tournament";
import { EventResponse } from "@/types/event";

type Props = {
  event: EventResponse;
  // When set, actions target a specific tournament (edit its rules / delete it)
  // instead of the event itself.
  tournamentId?: string;
};

const LayoutActions = ({ event, tournamentId }: Props) => {
  const { id } = event;
  const slug = event.sport_type?.slug;
  const rulesHref = tournamentId
    ? `/community/events/${id}/rules?type=${slug}&tid=${tournamentId}`
    : `/community/events/${id}/rules?type=${slug}`;

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
          <Link href={rulesHref}>
            <Button variant="outline">
              <Settings2 />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tournamentId ? "Edit Tournament Rules" : "Edit Rules"}</p>
        </TooltipContent>
      </Tooltip>

      {tournamentId ? (
        <DeleteTournamentButton
          tournamentId={tournamentId}
          redirectTo={`/community/events/${id}`}
        />
      ) : (
        <DeleteEventButton eventId={id} />
      )}
    </div>
  );
};

export default LayoutActions;
