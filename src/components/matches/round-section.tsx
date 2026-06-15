"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GripVertical, Lock, Pencil, X } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import MatchCard from "@/components/commons/match-card";
import { Button } from "@/components/ui/button";
import { MatchResponse } from "@/types/match";
import { cn } from "@/lib/utils";
import { reorderMatches } from "@/actions/match";

type Props = {
  roundName: string;
  matches: MatchResponse[];
  base: string;
  tournamentId: number | string;
};

const isUpcoming = (m: MatchResponse) => m.status === "upcoming";

const matchLabel = (m: MatchResponse) =>
  [m.participant_a?.name, m.participant_b?.name]
    .filter(Boolean)
    .join(" vs ") || "TBD";

const groupByCourt = (matches: MatchResponse[]) =>
  Object.values(
    matches.reduce(
      (acc, match) => {
        const court = match.court_number;
        if (!acc[court]) acc[court] = { court, matches: [] };
        acc[court].matches.push(match);
        return acc;
      },
      {} as Record<number, { court: number; matches: MatchResponse[] }>,
    ),
  );

const SortableRow = ({
  match,
  position,
  projectedCourt,
}: {
  match: MatchResponse;
  position: number;
  projectedCourt: number;
}) => {
  const locked = !isUpcoming(match);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: match.id, disabled: locked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-md border bg-card px-3 py-2",
        isDragging && "opacity-70 shadow-lg",
        locked && "opacity-60",
      )}
    >
      {locked ? (
        <Lock className="size-4 shrink-0 text-muted-foreground" />
      ) : (
        <button
          type="button"
          className="shrink-0 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
      )}

      <span className="w-7 shrink-0 text-center text-sm font-bold">
        {position}
      </span>

      <span className="flex-1 truncate text-sm font-medium">
        {matchLabel(match)}
      </span>

      <span className="shrink-0 text-xs text-muted-foreground">
        Court {locked ? match.court_number : projectedCourt}
      </span>

      {locked && (
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
          {match.status}
        </span>
      )}
    </div>
  );
};

const RoundSection = ({ roundName, matches, base, tournamentId }: Props) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [order, setOrder] = useState<MatchResponse[]>(matches);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Courts available in this round, inferred from current assignments. Used to
  // preview the court a match will land on (backend snakes courts by position).
  const courtsCount = useMemo(
    () => Math.max(1, ...matches.map((m) => m.court_number || 0)),
    [matches],
  );

  const upcomingCount = useMemo(
    () => matches.filter(isUpcoming).length,
    [matches],
  );

  const startEditing = () => {
    setOrder(matches);
    setEditing(true);
  };

  const cancelEditing = () => {
    setOrder(matches);
    setEditing(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.findIndex((m) => m.id === active.id);
    const newIndex = order.findIndex((m) => m.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const moved = arrayMove(order, oldIndex, newIndex);

    // Locked (live/completed) matches must keep their exact positions; only the
    // upcoming matches flow into the remaining slots in their new relative order.
    const upcomingQueue = moved.filter(isUpcoming);
    const rebuilt = order.map((m) =>
      isUpcoming(m) ? (upcomingQueue.shift() as MatchResponse) : m,
    );
    setOrder(rebuilt);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await reorderMatches(
      tournamentId,
      order.map((m) => m.id),
    );
    setSaving(false);

    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Order of play updated");
    setEditing(false);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 border-y py-3">
        <h3 className="text-2xl font-bold text-neutral-300 md:text-4xl">
          {roundName}
        </h3>

        {editing ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={cancelEditing}
              disabled={saving}
            >
              <X className="size-4" /> Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save order"}
            </Button>
          </div>
        ) : (
          upcomingCount > 1 && (
            <Button variant="outline" size="sm" onClick={startEditing}>
              <Pencil className="size-4" /> Edit order
            </Button>
          )
        )}
      </div>

      {editing ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={order.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mx-auto flex max-w-xl flex-col gap-2">
              {order.map((match, index) => (
                <SortableRow
                  key={match.id}
                  match={match}
                  position={index + 1}
                  projectedCourt={(index % courtsCount) + 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div
          className={cn(
            "grid gap-y-16 md:gap-8 md:gap-y-16",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {groupByCourt(matches).map((court) => (
            <div
              key={court.court}
              className="flex flex-col items-center space-y-4"
            >
              <h3 className="text-center text-xl font-bold">
                Court {court.court}
              </h3>
              {court.matches.map((match, index) => (
                <MatchCard
                  key={match.id}
                  index={index}
                  type="order_of_play"
                  match={match}
                  url={`${base}/matches/${match.id}`}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoundSection;
