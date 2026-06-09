import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  tournament: TournamentResponse;
  href: string;
  // Optional per-card controls (edit/delete/join), rendered outside the link.
  actions?: React.ReactNode;
};

const TournamentCard = ({ tournament, href, actions }: Props) => {
  const title =
    tournament.name ||
    `${tournament.category} ${tournament.format?.replace(/_/g, " ")}`.trim();

  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-4 transition-colors hover:border-primary">
      <Link href={href} className="flex-1 space-y-2">
        <h3 className="font-semibold capitalize">{title}</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="gray" className="capitalize">
            {tournament.category}
          </Badge>
          <Badge variant="gray" className="capitalize">
            {tournament.format?.replace(/_/g, " ")}
          </Badge>
          <Badge variant="gray">{tournament.participants_count} players</Badge>
          {tournament.mode === "MANUAL" && (
            <Badge variant="gray">Manual</Badge>
          )}
        </div>
      </Link>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
};

export default TournamentCard;
