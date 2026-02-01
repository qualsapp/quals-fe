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
import { useMutation } from "@tanstack/react-query";
import { RulesParams, RulesResponse } from "@/types/events";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { eventServices } from "@/services/event-services";

type Props = {
  eventId: string;
  communityId: string;
  rule?: RulesResponse;
};

const RulesSchema = z
  .object({
    courts_count: z.string().min(1, "Number of Court is required"),
    category: z.string().min(1, "Category is required"),
    participants_count: z.string().min(1, "Knockout Seat is required"),
    grouping: z.boolean(),
    groups_count: z.string(),
    seat_per_group: z.string(),
    top_advancing_group: z.string(),
    deuce: z.boolean(),
    best_of_sets: z.string().optional(),
    race_to: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.grouping) {
      ctx.addIssue({
        path: ["groups_count", "seat_per_group", "top_advancing_group"],
        code: z.ZodIssueCode.custom,
        message: "This field is required",
      });
    }
  });

const RulesForm = ({ rule, eventId, communityId }: Props) => {
  const form = useForm<z.infer<typeof RulesSchema>>({
    resolver: zodResolver(RulesSchema),
    defaultValues: {
      courts_count: rule?.courts_count?.toString() || "",
      category: rule?.category || "",
      participants_count: rule?.participants_count?.toString() || "",
      grouping:
        rule?.groups_count && Number(rule?.groups_count) > 0 ? true : false,
      groups_count: rule?.groups_count?.toString() || "",
      seat_per_group: rule?.seat_per_group?.toString() || "",
      top_advancing_group: rule?.top_advancing_group?.toString() || "",
      deuce: rule?.deuce || false,
      best_of_sets: rule?.match_rule?.best_of_sets?.toString() || "",
      race_to: rule?.match_rule?.race_to?.toString() || "",
    },
  });

  const { mutate } = useMutation({
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
      format: data.grouping ? "group_stage" : "single_elimination",
      courts_count: Number(data.courts_count),
      category: data.category,
      participants_count: Number(data.participants_count),
      ...(data.best_of_sets && { best_of_sets: Number(data.best_of_sets) }),
      ...(data.race_to && { race_to: Number(data.race_to) }),
      deuce: data.deuce,
    };
    console.log(params);
    if (rule?.id) {
      params.id = rule.id;
    }

    mutate(params);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3 border rounded-md flex flex-col gap-4  p-3">
          <FormLabel className="text-lg font-semibold text-gray-400">
            General Settings
          </FormLabel>
          <FormField
            control={form.control}
            name="courts_count"
            render={({ field }) => (
              <FormItem className="md:max-w-[300px]">
                <FormLabel>Number of Court</FormLabel>
                <FormControl>
                  <Input placeholder="Input number of court" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="md:max-w-[300px]">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      form.setValue("category", value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="double">Double</SelectItem>
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
            name="participants_count"
            render={({ field }) => (
              <FormItem className="md:max-w-[300px]">
                <FormLabel>Total Participants</FormLabel>
                <FormControl>
                  <Input placeholder="Input total participants" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormControl>
                  <Switch
                    id="grouping"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="grouping">Is grouping?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:max-w-[300px] gap-4">
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
                    <Input placeholder="Input group amount" {...field} />
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
                    <Input placeholder="Input seat per group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="top_advancing_group"
              disabled={!form.watch("grouping")}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      !form.watch("grouping") ? "text-gray-400" : "",
                    )}
                  >
                    Top Advancing Group
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Input top advancing group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-3 border rounded-md p-3">
          <FormLabel className="text-lg font-semibold text-gray-400">
            Match Rules
          </FormLabel>
          <div className="flex flex-col md:max-w-[300px] gap-4">
            <FormField
              control={form.control}
              name="deuce"
              render={({ field }) => (
                <FormItem className="flex gap-3">
                  <FormControl>
                    <Switch
                      id="deuce"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="deuce">Golden Point?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="best_of" className="w-full">
              <TabsList>
                <TabsTrigger value="best_of">Best of</TabsTrigger>
                <TabsTrigger value="race_to">Race to</TabsTrigger>
              </TabsList>
              <TabsContent value="best_of">
                <FormField
                  control={form.control}
                  name="best_of_sets"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Best of</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Input best of point" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="race_to">
                <FormField
                  control={form.control}
                  name="race_to"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Race to</FormLabel> */}
                      <FormControl>
                        <Input placeholder="Input race to point" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
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
