import React from "react";
import { Badge } from "./badge";
import { Divider } from "./divider";
import { cn } from "@/lib/utils";

type Props = {
  steps: number;
  current: number;
  wrapperClassName?: string;
};

const Stepper = ({ steps, current, wrapperClassName = "" }: Props) => {
  return (
    <div className={cn("flex items-center gap-3 p-3", wrapperClassName)}>
      {Array.from({ length: steps }).map((_, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <Divider
              className={
                index + 1 <= current ? "border-primary" : "border-gray-200"
              }
            />
          )}

          <Badge
            key={index}
            variant={index + 1 <= current ? "default" : "gray"}
            className="h-8 w-8"
          >
            {index + 1}
          </Badge>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
