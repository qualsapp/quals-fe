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
    <Dialog
      defaultOpen
      open
      onOpenChange={(next) => {
        if (!next) handleClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,26rem)] max-w-none overflow-visible border-0 bg-transparent p-0 shadow-none sm:max-w-none"
      >
        <DialogTitle className="sr-only">Welcome to Quals</DialogTitle>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:select-none">
            {props.children}
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute -right-3 -top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-xl ring-1 ring-black/10 transition hover:scale-105 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
