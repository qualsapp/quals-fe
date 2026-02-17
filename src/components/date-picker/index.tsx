/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type DatePickerProps = {
  mode?: "single" | "range" | "multiple";
  selected?: Date | DateRange | Date[];

  onSelect?: (date: any) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

const DatePicker = ({
  mode = "single",
  selected,
  onSelect,
  className,
  placeholder = "Select date",
  disabled = false,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  // Helper to safely format the display text based on mode and selected value
  const formatDateText = () => {
    if (!selected) return placeholder;

    // Single mode: expect Date
    if (mode === "single") {
      if (selected instanceof Date) {
        return format(selected, "PPP");
      }
      // Handle edge case where user passes object { from: Date } for single
      // This is to be somewhat backward compatible with the layout the user had
      if (
        typeof selected === "object" &&
        "from" in selected &&
        (selected as any).from instanceof Date
      ) {
        return format((selected as any).from, "PPP");
      }
    }

    // Range mode: expect DateRange
    if (mode === "range") {
      // Check for valid range object
      if (typeof selected === "object" && "from" in selected) {
        const range = selected as DateRange;
        return range.from ? (
          range.to ? (
            <>
              {format(range.from, "LLL dd, y")} -{" "}
              {format(range.to, "LLL dd, y")}
            </>
          ) : (
            format(range.from, "LLL dd, y")
          )
        ) : (
          placeholder
        );
      }
    }

    // Multiple mode: expect Date[]
    if (mode === "multiple" && Array.isArray(selected)) {
      return selected.length > 0
        ? `${selected.length} date(s) selected`
        : placeholder;
    }

    // Generic fallback if types don't strictly match but we can print something
    if (selected instanceof Date) return format(selected, "PPP");

    return placeholder;
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              className,
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="flex-1 truncate">{formatDateText()}</span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode={mode as any}
            selected={selected as any}
            onSelect={onSelect}
            numberOfMonths={mode === "range" ? 2 : 1}
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;

/* eslint-enable @typescript-eslint/no-explicit-any */
