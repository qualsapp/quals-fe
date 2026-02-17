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
import React, { useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { TimePicker } from "../ui/time-picker";
import DatePicker from "../date-picker";

import { EventParams, EventResponse } from "@/types/event";
import { useRouter } from "next/navigation";

import { SportResponse } from "@/types/global";
import { createEvent, updateEvent } from "@/actions/event";

type Props = {
  event?: EventResponse;
  sports: SportResponse["sport_types"];
};

const eventSchema = z.object({
  type: z
    .string()
    .refine(
      (value) =>
        value === "weekly" || value === "tournament" || value === "friendly",
      {
        message: "Please select an event type",
      },
    ),
  title: z.string().min(1, "Name is required"),
  sport_type_id: z.string().min(1, "Sport is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  dates: z
    .any()
    .refine((value) => value instanceof Date || value instanceof Object, {
      message: "Please select a date and time",
    }),
  isRepeat: z.boolean(),
});

const EventForm = ({ event, sports }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: event?.event_type || "",
      title: event?.title || "",
      sport_type_id: event?.sport_type.id.toString() || "",
      location: event?.location || "",
      description: event?.description || "",
      dates: event
        ? event.event_type === "weekly" && event.start_time
          ? new Date(event.start_time)
          : event.start_time &&
            event.end_time && {
              from: new Date(event.start_time),
              to: new Date(event.end_time),
            }
        : undefined,
      isRepeat: event?.isRepeat || false,
    },
  });

  const watchDates = form.watch("dates");

  const onSubmit = (data: z.infer<typeof eventSchema>) => {
    // add community_id from cookies
    const params: EventParams = {
      title: data.title,
      event_type: data.type,
      sport_type_id: Number(data.sport_type_id),
      location: data.location,
      description: data.description,
      // isRepeat: data.isRepeat,
      start_time:
        watchDates instanceof Object
          ? watchDates.from.toISOString()
          : watchDates,
      end_time:
        watchDates instanceof Object ? watchDates.to.toISOString() : watchDates,
    };

    startTransition(async () => {
      const { error, ...res } = event?.id
        ? await updateEvent(params, event.id)
        : await createEvent(params);

      if (error) {
        setError(error);
      } else {
        form.reset();
        if (res.event_type === "tournament") {
          const sport = sports?.find((sport) => sport.id === res.sport_type.id);
          router.push(`/community/events/${res.id}/rules?type=${sport?.slug}`);
        }
      }
    });
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string,
  ) => {
    if (watchDates instanceof Date) {
      const newDate = new Date(watchDates);
      if (type === "hour") {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
        );
      } else if (type === "minute") {
        newDate.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12,
        );
      }
      form.setValue("dates", newDate);
    }

    if (watchDates instanceof Object && watchDates.from && watchDates.to) {
      if (type === "hour") {
        watchDates.from.setHours(
          (parseInt(value) % 12) + (watchDates.from.getHours() >= 12 ? 12 : 0),
        );
        watchDates.to.setHours(
          (parseInt(value) % 12) + (watchDates.to.getHours() >= 12 ? 12 : 0),
        );
      } else if (type === "minute") {
        watchDates.from.setMinutes(parseInt(value));
        watchDates.to.setMinutes(parseInt(value));
      } else if (type === "ampm") {
        const currentHours = watchDates.from.getHours();
        watchDates.from.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12,
        );
        watchDates.to.setHours(
          value === "PM" ? currentHours + 12 : currentHours - 12,
        );
      }
      form.setValue("dates", watchDates);
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
          name="title"
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
          name="sport_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => {
                    form.setValue("sport_type_id", value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sports?.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id.toString()}>
                          {sport.name}
                        </SelectItem>
                      ))}
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

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center">
          <Button disabled={isPending}>
            {isPending ? "Loading..." : event ? "Update" : "Create"} Event
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
