"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  tournaments: TournamentResponse[];
  activeId: string;
  // Base path to a tournament's tabs, e.g. "/community/events/12/tournaments".
  basePath: string;
  // When provided, renders an "Add" pill (host only).
  addHref?: string;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const TournamentSwitcher = ({
  tournaments,
  activeId,
  basePath,
  addHref,
}: Props) => {
  if (!tournaments.length && !addHref) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tournaments.map((t) => {
        const active = String(t.id) === String(activeId);
        return (
          <Link
            key={t.id}
            href={`${basePath}/${t.id}/matches`}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors",
              active
                ? "border-primary bg-primary text-white"
                : "border-primary/30 bg-white text-primary hover:border-primary",
            )}
          >
            {tournamentLabel(t)}
          </Link>
        );
      })}

      {addHref && (
        <Link
          href={addHref}
          className="flex items-center gap-1 whitespace-nowrap rounded-full border border-dashed border-primary/40 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" /> Add tournament
        </Link>
      )}
    </div>
  );
};

export default TournamentSwitcher;
