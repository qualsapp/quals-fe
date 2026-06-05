"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ManualParticipantForm from "../forms/ManualParticipantForm";
import { deleteParticipant } from "@/actions/tournament";
import { Participant } from "@/types/tournament";

type Props = {
  tournamentId: string;
  // "single", "double", or "mixed"
  category: string;
  participants: Participant[];
  maxParticipants: number;
};

const ParticipantsManager = ({
  tournamentId,
  category,
  participants,
  maxParticipants,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const isDouble = category === "double" || category === "mixed";
  const isFull = participants.length >= maxParticipants;

  const handleRemove = (participantId: number) => {
    setError(undefined);
    setRemovingId(participantId);
    startTransition(async () => {
      const { error } = await deleteParticipant(String(participantId));
      setRemovingId(null);
      if (error) {
        setError(error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Participants</h2>
          <p className="text-sm text-muted-foreground">
            {participants.length} / {maxParticipants} added
          </p>
        </div>
        <Button onClick={() => setOpen(true)} disabled={isFull}>
          Add Participant
        </Button>
      </div>

      {isFull && (
        <p className="text-sm text-amber-600">
          The roster is full. Remove a participant to add a different one.
        </p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {participants.length === 0 ? (
        <div className="rounded-md border p-8 text-center text-muted-foreground">
          No participants yet. Click &ldquo;Add Participant&rdquo; to enter
          names.
        </div>
      ) : (
        <ul className="divide-y rounded-md border">
          {participants.map((participant, index) => (
            <li
              key={participant.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-sm text-muted-foreground">
                  {index + 1}.
                </span>
                <div>
                  <p className="font-medium">{participant.name}</p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {participant.type}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(participant.id)}
                disabled={isPending && removingId === participant.id}
                aria-label={`Remove ${participant.name}`}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Participant</DialogTitle>
            <DialogDescription>
              Enter the {isDouble ? "pair" : "participant"} name to add them to
              this tournament.
            </DialogDescription>
          </DialogHeader>
          <ManualParticipantForm
            tournamentId={tournamentId}
            category={category}
            closeModal={() => setOpen(false)}
            onSuccess={() => router.refresh()}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantsManager;
