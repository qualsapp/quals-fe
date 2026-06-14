"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  participantCount: number;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Shown when a host switches a tournament's participant mode (AUTO <-> MANUAL)
// while it still has participants. The two modes are incompatible, so confirming
// clears the current roster before applying the change.
const ModeChangeConfirmDialog = ({
  open,
  participantCount,
  isPending,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change participant mode?</DialogTitle>
          <DialogDescription>
            Switching the participant mode will remove all{" "}
            {participantCount} current participant
            {participantCount === 1 ? "" : "s"} from this tournament. This
            can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isPending}>
            {isPending ? "Removing participants..." : "Remove & change mode"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModeChangeConfirmDialog;
