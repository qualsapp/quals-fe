"use client";
import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
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
      <DialogContent className="overflow-y-hidden !p-0">
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
