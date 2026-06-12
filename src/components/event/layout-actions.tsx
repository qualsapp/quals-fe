import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Plus, Settings2 } from "lucide-react";
import DeleteEventButton from "./delete-event";
import DeleteTournamentButton from "./delete-tournament";
import { EventResponse } from "@/types/event";

type Props = {
  event: EventResponse;
  // When set, actions target a specific tournament (edit its rules / delete it)
  // instead of the event itself.
  tournamentId?: string;
  // When set, renders the primary "Add tournament" button (host only).
  addHref?: string;
};

const LayoutActions = ({ event, tournamentId, addHref }: Props) => {
  const { id } = event;
  const slug = event.sport_type?.slug;
  const rulesHref = tournamentId
    ? `/community/events/${id}/rules?type=${slug}&tid=${tournamentId}`
    : `/community/events/${id}/rules?type=${slug}`;

  return (
    <div className="flex items-center gap-3">
      {addHref && (
        <Link href={addHref}>
          <Button aria-label="Add tournament" className="gap-2">
            <Plus className="h-4 w-4" /> Add tournament
          </Button>
        </Link>
      )}

      {/* Edit · Rules · Delete cluster */}
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

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={rulesHref}>
              <Button variant="outline" aria-label="Edit Rules">
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
    </div>
  );
};

export default LayoutActions;
