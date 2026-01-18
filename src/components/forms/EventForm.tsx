"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
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
import React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { TimePicker } from "../ui/time-picker";
import DatePicker from "../date-picker";
import { eventServices } from "@/services/event-services";
import { useMutation } from "@tanstack/react-query";
import { EventParams, EventResponse } from "@/types/events";
import { useRouter } from "next/navigation";

type Props = {
  event?: EventResponse;
};

const eventSchema = z.object({
  type: z
    .string()
    .refine(
      (value) =>
        value === "weekly" || value === "tournament" || value === "friendly",
      {
        message: "Please select an event type",
      }
    ),
  name: z.string().min(1, "Name is required"),
  sport: z.string().min(1, "Sport is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  dates: z
    .any()
    .refine((value) => value instanceof Date || value instanceof Object, {
      message: "Please select a date and time",
    }),
  isRepeat: z.boolean(),
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

const EventForm = ({ event }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: event?.type || "",
      name: event?.name || "",
      sport: event?.sport || "",
      location: event?.location || "",
      description: event?.description || "",
      dates: event
        ? event.type === "weekly"
          ? new Date(event.start_date)
          : { from: new Date(event.start_date), to: new Date(event.end_date) }
        : undefined,
      isRepeat: event?.isRepeat || false,
    },
  });

  const watchDates = form.watch("dates");

  const { mutateAsync } = useMutation({
    mutationFn: async (data: EventParams) => {
      if (data.event_id) return await eventServices.update(data);
      return await eventServices.create(data);
    },
    onSuccess: () => {
      form.reset();
    },
    onError: () => {
      console.log("Error creating event");
    },
  });

  const onSubmit = (data: z.infer<typeof eventSchema>) => {
    // add community_id from cookies
    // const params: EventParams = {
    //   community_id: "",
    //   ...data,
    // };

    // if (event?.id) {
    //   params.event_id = event.id;
    // }

    // mutateAsync(params);
    router.push(`/community/events/123/rules?type=${data.sport}`);
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    if (watchDates) {
      const newDate = new Date(watchDates);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12
        );
      }
      form.setValue("dates", newDate);
    }
  };

  const handleDateChange = (date: Date | DateRange) => {
    form.setValue("dates", date);
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
                    form.setValue("dates", undefined);
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

          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              mode={form.watch("type") === "weekly" ? "single" : "range"}
              selected={watchDates}
              onSelect={handleDateChange}
              disabled={form.watch("type") === ""}
            />

            <TimePicker
              date={
                form.watch("type") === "weekly" ? watchDates : watchDates?.from
              }
              handleTimeChange={handleTimeChange}
              disabled={form.watch("type") === "" || !watchDates}
            />

            {form.formState.errors.dates && (
              <FormMessage>
                {String(form.formState.errors.dates.message)}
              </FormMessage>
            )}
          </div>
        </div>

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
                  disabled={form.watch("type") !== "weekly"}
                />
              </FormControl>
              <FormLabel htmlFor="isRepeat">Repeat event</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Create Event</Button>
      </form>
    </Form>
  );
};

export default EventForm;
