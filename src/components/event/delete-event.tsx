"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteEvent } from "@/actions/event";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";

type Props = {
  eventId: string;
};

const DeleteEventButton = ({ eventId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const { error } = await deleteEvent(eventId);
      if (error) {
        setError(error);
      } else {
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    return () => {
      setError(undefined);
    };
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        disabled={isPending}
        aria-label="Delete Event"
      >
        <Trash2 className="text-red-500" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event?
            </DialogDescription>
            {error && <p className="text-red-500">{error}</p>}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteEventButton;
