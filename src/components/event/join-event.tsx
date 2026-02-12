"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import JoinTournamentForm from "../forms/JoinTournamentForm";
import { Button } from "../ui/button";
import { EventResponse } from "@/types/event";

type Props = {
  event: EventResponse;
  playerId: string;
};

const JoinEvent = ({ event, playerId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setIsOpen(true);
        }}
      >
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
          <JoinTournamentForm
            closeModal={handleCloseModal}
            event={event}
            playerId={playerId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinEvent;
