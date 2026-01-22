"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { type DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { CheckboxCard } from "../ui/checkbox";

type Props = {};

const eventFilterScheme = z.object({
  sports: z.string().optional(),
  dates: z.string().optional(),
  type: z.array(z.string()).min(1, {
    message: "You must select at least one item.",
  }),
  status: z.array(z.string()).min(1, {
    message: "You must select at least one item.",
  }),
});

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const typeOption: Option[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Tournament", value: "tournament" },
  { label: "Friendly", value: "friendly", disabled: true },
];
const statusOption: Option[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "On going", value: "on-going" },
  { label: "Complete", value: "complete" },
];

const EventFilterForm = (props: Props) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof eventFilterScheme>>({
    resolver: zodResolver(eventFilterScheme),
    defaultValues: {
      sports: "",
      dates: "",
      type: [],
      status: [],
    },
  });

  const onSelectDate = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      form.setValue(
        "dates",
        `${range.from.toISOString()} - ${range.to.toISOString()}`,
      );
    } else {
      form.setValue("dates", "");
    }
  };

  const onSubmit = (data: z.infer<typeof eventFilterScheme>) => {
    // router.push("/communities/create/community-schedule");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-3"
      >
        <FormField
          control={form.control}
          name="sports"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="badminton">Badminton</SelectItem>
                      <SelectItem value="padel">Padel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl hidden>
                <Input hidden {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="justify-between font-normal"
            >
              {dateRange?.from && dateRange?.to
                ? dateRange.from?.toLocaleDateString() +
                  "-" +
                  dateRange.to?.toLocaleDateString()
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-lg border shadow-sm"
            />
          </PopoverContent>
        </Popover>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row gap-2">
              <FormLabel className="text-gray-400 font-semibold">
                Event Type
              </FormLabel>
              <div className="flex gap-2">
                {typeOption.map((type) => (
                  <FormField
                    key={type.value}
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem key={type.value}>
                        <FormControl>
                          <CheckboxCard
                            checked={field.value?.includes(type.value)}
                            key={type.value}
                            option={type}
                            disabled={type?.disabled}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, type.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== type.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row gap-2">
              <FormLabel className="text-gray-400 font-semibold">
                Status
              </FormLabel>
              <div className="flex gap-2">
                {statusOption.map((state) => (
                  <FormField
                    key={state.value}
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem key={state.value}>
                        <FormControl>
                          <CheckboxCard
                            checked={field.value?.includes(state.value)}
                            key={state.value}
                            option={state}
                            disabled={state?.disabled}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, state.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== state.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EventFilterForm;
