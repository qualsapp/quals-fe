"use client";
import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
    router.push(window.location.pathname);
  };

  return (
    <Dialog defaultOpen={open} open={open} onOpenChange={handleOnOpenChange}>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <DialogContent className="overflow-y-hidden !p-0">
          {props.children}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Modal;
