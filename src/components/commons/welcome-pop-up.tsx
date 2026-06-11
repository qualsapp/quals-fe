"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen open onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,26rem)] max-w-none border-0 bg-transparent p-0 shadow-none sm:max-w-none"
      >
        <DialogTitle className="sr-only">Welcome to Quals</DialogTitle>
        <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          {props.children}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
