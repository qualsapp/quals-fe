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

import React from "react";
import { Button } from "../ui/button";
import { eventServices } from "@/services/event-services";
import { useMutation } from "@tanstack/react-query";
import { RulesParams, RulesResponse } from "@/types/events";
import { Switch } from "../ui/switch";
import {
  badmintonFinalScore,
  badmintonScoreType,
  badmintonScoring,
  knockoutSeats,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  eventId: string;
  communityId: string;
  rule?: RulesResponse;
};

const RulesSchema = z.object({
  total_participants: z.string().min(1, "Knockout Seat is required"),
  grouping: z.boolean(),
  groups_count: z.string().min(1, "Group Amount is required"),
  seat_per_group: z.string().min(1, "Seat per Group is required"),
  scoring_system: z.string().min(1, "Scoring System is required"),
  max_point_per_set: z.string().min(1, "Final Point is required"),
});

const RulesForm = ({ eventId, communityId, rule }: Props) => {
  const form = useForm<z.infer<typeof RulesSchema>>({
    resolver: zodResolver(RulesSchema),
    defaultValues: {
      total_participants: rule?.total_participants?.toString() || "",
      grouping: rule?.groups_count && rule?.groups_count > 0 ? true : false,
      groups_count: rule?.groups_count?.toString() || "",
      seat_per_group: rule?.seat_per_group?.toString() || "",
      scoring_system: rule?.match_rule?.scoring_system || "",
      max_point_per_set: rule?.match_rule?.max_point_per_set?.toString() || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: RulesParams) => {
      if (rule?.id) return await eventServices.updateRules(data);
      return await eventServices.createRules(data);
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
    const params: RulesParams = {
      community_id: communityId,
      event_id: eventId,
      ...data,
    };
    if (rule?.id) {
      params.id = rule.id;
    }

    mutateAsync(params);
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
              name="total_participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knockout Seat</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("total_participants", value);
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
              name="groups_count"
              disabled={!form.watch("grouping")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      !form.watch("grouping") ? "text-gray-400" : "",
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
                      !form.watch("grouping") ? "text-gray-400" : "",
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
              name="scoring_system"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scoring System</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("scoring_system", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih scoring system" />
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
            {/* <FormField
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
            /> */}
            <FormField
              control={form.control}
              name="max_point_per_set"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Point</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("max_point_per_set", value);
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
