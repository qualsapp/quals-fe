"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import JoinTournamentForm from "../forms/JoinTournamentForm";
import { Button, buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import { EventResponse } from "@/types/event";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

type Props = {
  event: EventResponse;
  playerId: string;
};

const JoinEvent = ({ event, playerId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { player } = useUser();

  if (event.tournament?.is_player_joined) {
    return (
      <Badge
        className={cn(
          "px-3 py-1 text-sm font-semibold uppercase tracking-wide rounded-none",
          "bg-white text-green-700 border-2 border-green-600",
          "shadow-sm",
        )}
      >
        <Check className="w-4 h-4 mr-1" />
        Joined
      </Badge>
    );
  }
  const handleCloseModal = () => {
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Join Event
      </Button>

      <Dialog
        defaultOpen={isOpen}
        open={isOpen}
        onOpenChange={handleCloseModal}
      >
        <DialogContent className="space-y-2">
          <DialogTitle className="text-center">
            Are you sure you want to join this event?
          </DialogTitle>
          {player ? (
            <JoinTournamentForm
              closeModal={handleCloseModal}
              event={event}
              playerId={playerId}
            />
          ) : (
            <div>
              <p className="text-center text-sm text-gray-500">
                You need to create a player profile to join an event.
              </p>
              <Link href="/player-details" className={buttonVariants()}>
                Create profile
              </Link>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinEvent;
