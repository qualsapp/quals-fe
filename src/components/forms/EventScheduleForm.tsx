"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const scheduleSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    day: z.enum(days).or(z.string()),
    time: z.string(),
  })
  .superRefine(({ day, time }, ctx) => {
    if (day === "") {
      ctx.addIssue({
        path: ["day"],
        code: "custom",
        message: "Day is required",
      });
    }

    if (!days.includes(day)) {
      ctx.addIssue({
        path: ["day"],
        code: "custom",
        message: "Day must be a valid day of the week",
      });
    }

    if (time === "") {
      ctx.addIssue({
        path: ["time"],
        code: "custom",
        message: "Time is required",
      });
    }
  });

const eventScheduleSchema = z.object({
  schedules: z.array(scheduleSchema),
});

const ScheduleItem = ({
  index,
  form,
  onRemoveSchedule,
}: {
  index: number;
  form: UseFormReturn<z.infer<typeof eventScheduleSchema>>;
  onRemoveSchedule: (index: number) => void;
}) => {
  return (
    <div className="flex flex-row gap-3">
      <FormField
        control={form.control}
        name={`schedules.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Event name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`schedules.${index}.day`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Day (e.g., Moday)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`schedules.${index}.time`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Time (e.g., 07:00 PM)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        variant="outline"
        className="rounded-full text-lg text-destructive border-destructive hover:bg-destructive hover:text-white transition-colors"
        size="icon-sm"
        type="button"
        onClick={() => onRemoveSchedule(index)}
      >
        -
      </Button>
    </div>
  );
};

const EventScheduleForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof eventScheduleSchema>>({
    resolver: zodResolver(eventScheduleSchema),
    defaultValues: {
      schedules: [{ name: "", day: "", time: "" }],
    },
  });

  const onSubmit = () => {
    router.push("/communities/create/community-members");
  };

  const handleRemoveSchedule = (index: number) => {
    const schedules = form.getValues("schedules");
    schedules.splice(index, 1);
    form.setValue("schedules", schedules);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="border lg:p-8 rounded-md ">
          <div className="space-y-3">
            {form.watch("schedules").map((item, index) => (
              <ScheduleItem
                form={form}
                index={index}
                key={index}
                onRemoveSchedule={handleRemoveSchedule}
              />
            ))}
          </div>

          <div className="text-right ">
            <Button
              type="button"
              variant="link"
              onClick={() =>
                form.trigger().then(() => {
                  if (form.formState.isValid) {
                    form.setValue("schedules", [
                      ...form.watch("schedules"),
                      { name: "", day: "", time: "" },
                    ]);
                  }
                })
              }
            >
              + Add Another Event
            </Button>
          </div>
        </div>

        <div className="text-right flex justify-between items-center">
          <Button type="button" variant="outline">
            Back
          </Button>
          <Button type="submit">Next: Community Members</Button>
        </div>
      </form>
    </Form>
  );
};

export default EventScheduleForm;
