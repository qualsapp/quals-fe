"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TournamentResponse } from "@/types/tournament";

type Props = {
  tournaments: TournamentResponse[];
};

const STATUSES = [
  { label: "All", value: "" },
  { label: "Live", value: "ongoing" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
];

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const TabFilterBar = ({ tournaments }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!tournaments.length) return null;

  const tab = pathname.split("/").pop() || "matches";
  const isMatches = tab === "matches";

  const tournamentParam = searchParams.get("tournament");
  const isAllMode = !tournamentParam || tournamentParam === "all";
  const active = !isAllMode
    ? tournaments.find((t) => String(t.id) === tournamentParam)
    : undefined;
  const status = searchParams.get("status") || "";

  const setStatus = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("status", value);
    else params.delete("status");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const setTournament = (tid: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tid) params.set("tournament", tid);
    else params.delete("tournament");
    params.delete("status");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          <ListFilter className="h-4 w-4" /> Filter by
        </span>

        {/* Tournament filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-9 items-center gap-2 rounded-lg border border-primary/20 bg-white px-3 text-sm font-semibold text-primary capitalize outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/30">
            <span className="h-[7px] w-[7px] rounded-[2px] bg-secondary" />
            {isAllMode || !active ? "All Tournaments" : tournamentLabel(active)}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[200px]">
            <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Tournament
            </DropdownMenuLabel>
            <DropdownMenuItem
              className={cn(
                "flex cursor-pointer items-center justify-between",
                isAllMode && "font-semibold text-primary",
              )}
              onClick={() => setTournament(null)}
            >
              All Tournaments
              {isAllMode && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
            {tournaments.map((t) => {
              const isActive = !isAllMode && String(t.id) === tournamentParam;
              return (
                <DropdownMenuItem
                  key={t.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between capitalize",
                    isActive && "font-semibold text-primary",
                  )}
                  onClick={() => setTournament(String(t.id))}
                >
                  {tournamentLabel(t)}
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status filter — Matches tab only */}
        {isMatches && (
          <>
            <span className="hidden h-5 w-px bg-border sm:block" />
            <div className="flex gap-1 rounded-xl bg-muted p-1">
              {STATUSES.map((s) => {
                const isActive = status === s.value;
                return (
                  <button
                    key={s.value || "all"}
                    type="button"
                    onClick={() => setStatus(s.value)}
                    className={cn(
                      "flex items-center rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {s.value === "ongoing" && !isActive && (
                      <span className="mr-1.5 h-[7px] w-[7px] rounded-full bg-green-500" />
                    )}
                    {s.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TabFilterBar;
