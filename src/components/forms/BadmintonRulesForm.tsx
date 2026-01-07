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
import { EventParams, EventResponse, RulesParams } from "@/types/events";
import { Switch } from "../ui/switch";
import {
  badmintonFinalScore,
  badmintonScoreType,
  badmintonScoring,
  knockoutSeats,
  padelScoreType,
  padelSets,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  event?: EventResponse;
};

const RulesSchema = z.object({
  knockout_seat: z.string().min(1, "Knockout Seat is required"),
  grouping: z.boolean(),
  group_amount: z.string().min(1, "Group Amount is required"),
  seat_per_group: z.string().min(1, "Seat per Group is required"),
  match_type: z.string().min(1, "Match Type is required"),
  score_type: z.string().min(1, "Score Type is required"),
  final_point: z.string().min(1, "Final Point is required"),
});

const RulesForm = ({ event }: Props) => {
  const form = useForm<z.infer<typeof RulesSchema>>({
    resolver: zodResolver(RulesSchema),
    defaultValues: {
      knockout_seat: "",
      grouping: false,
      group_amount: "",
      seat_per_group: "",
      match_type: "",
      score_type: "",
      final_point: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: RulesParams) => {
      // if (data.event_id) return await eventServices.update(data);
      // return await eventServices.create(data);
    },
    onSuccess: () => {
      form.reset();
    },
    onError: () => {
      console.log("Error creating event");
    },
  });

  const onSubmit = (data: z.infer<typeof RulesSchema>) => {
    // add community_id from cookies
    // const params: RulesParams = {
    //   // community_id: "",
    //   ...data,
    // };
    // if (event?.id) {
    //   params.event_id = event.id;
    // }
    // mutateAsync(params);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3 border rounded-md p-3">
          <FormLabel className="text-lg font-semibold text-gray-400">
            Knockout Settings
          </FormLabel>

          <div>
            <FormField
              control={form.control}
              name="knockout_seat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knockout Seat</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("knockout_seat", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih knockout seat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {knockoutSeats.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
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
          </div>
        </div>

        <div className="space-y-3 border rounded-md p-3">
          <FormLabel className="text-lg font-semibold text-gray-400">
            Grouping Settings
          </FormLabel>

          <FormField
            control={form.control}
            name="grouping"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormLabel>Is grouping?</FormLabel>
                <FormControl>
                  <Switch
                    id="grouping"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="group_amount"
              disabled={!form.watch("grouping")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      !form.watch("grouping") ? "text-gray-400" : ""
                    )}
                  >
                    Group Amount
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="1-4 max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seat_per_group"
              disabled={!form.watch("grouping")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      !form.watch("grouping") ? "text-gray-400" : ""
                    )}
                  >
                    Seat per Group
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="1-4 max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-3 border rounded-md p-3">
          <FormLabel className="text-lg font-semibold text-gray-400">
            Scoring Setting
          </FormLabel>
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="match_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("match_type", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih match type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {badmintonScoreType.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
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
              name="score_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Score Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("score_type", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih score type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {badmintonScoring.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
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
              name="final_point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Point</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("final_point", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih final point" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {badmintonFinalScore.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
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
          </div>
        </div>

        <div className="text-center">
          <Button>Submit Rules</Button>
        </div>
      </form>
    </Form>
  );
};

export default RulesForm;
