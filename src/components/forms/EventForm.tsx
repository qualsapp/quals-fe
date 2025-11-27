"use client";
import { days } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { time } from "console";

type Props = {};

const eventSchema = z.object({
  type: z.enum(["weekly", "tournament", "friendly"]).or(z.string()),
  name: z.string().min(1, "Name is required"),
  sport: z.string().min(1, "Sport is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  dates: z.string().optional(),
  time: z.string().optional(),
  isRepeat: z.boolean(),
  // day: z.enum(days).or(z.string()),
  // time: z.string(),
});
// .superRefine(({ day, time }, ctx) => {
//   if (day === "") {
//     ctx.addIssue({
//       path: ["day"],
//       code: "custom",
//       message: "Day is required",
//     });
//   }

//   if (!days.includes(day)) {
//     ctx.addIssue({
//       path: ["day"],
//       code: "custom",
//       message: "Day must be a valid day of the week",
//     });
//   }

//   if (time === "") {
//     ctx.addIssue({
//       path: ["time"],
//       code: "custom",
//       message: "Time is required",
//     });
//   }
// });

const EventForm = (props: Props) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: "",
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof eventSchema>) => {
    console.log(data);
    // router.push("/community/create/community-members");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event type</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => {
                    form.setValue("type", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tipe event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="tournament">Tournament</SelectItem>
                      <SelectItem value="friendly" disabled>
                        Friendly
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Downtown Badminton Club" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => {
                    form.setValue("sport", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="weekly">Badminton</SelectItem>
                      <SelectItem value="tournament">Padel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Downtown Badminton Club" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of your community..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
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

        <div className="space-y-3">
          <Label>Schedule</Label>

          <div className="flex items-start space-x-4">
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
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                {form.watch("type") === "weekly" ? (
                  <Calendar
                    mode="single"
                    className="rounded-lg border shadow-sm"
                  />
                ) : (
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="rounded-lg border shadow-sm"
                  />
                )}
              </PopoverContent>
            </Popover>

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Time (e.g., 07:00, 14:00)"
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className="text-xs">
            Time format (e.g., 07:00, 14:00)
          </FormDescription>

          <FormField
            control={form.control}
            name="isRepeat"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    id="isRepeat"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormLabel htmlFor="isRepeat">Repeat event</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Create Event</Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
