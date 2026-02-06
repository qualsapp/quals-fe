"use client";
import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  const router = useRouter();

  const handleOnOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOnOpenChange}>
      <DialogOverlay className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <DialogContent className="overflow-y-hidden">
          {props.children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
