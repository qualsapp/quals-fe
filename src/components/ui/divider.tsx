import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

const Divider = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "border-t border-[0.25px] border-gray-200 flex-grow",
        className
      )}
    />
  );
};

export { Divider };
