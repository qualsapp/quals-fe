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

import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";

import {
  MatchRuleParams,
  TournamentResponse,
  TournamentParams,
} from "@/types/tournament";
import { Switch } from "../ui/switch";
import { badmintonMaxPointPerSet, badmintonScoreType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
import { createTournament, updateTournament } from "@/actions/tournament";

type Props = {
  eventId: string;
  communityId: string;
  tournament?: TournamentResponse;
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
    scoring_system: z.string(),
    max_deuce_point: z.string().optional(),
    max_point_per_set: z.string().min(1, "Final Point is required"),
    best_of_sets: z.string().optional(),
    race_to: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deuce && !data.max_deuce_point) {
      ctx.addIssue({
        path: ["max_deuce_point"],
        code: z.ZodIssueCode.custom,
        message: "This field is required",
      });
    }
  });

const RulesForm = ({ eventId, communityId, tournament }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<z.infer<typeof RulesSchema>>({
    resolver: zodResolver(RulesSchema),
    defaultValues: {
      courts_count: tournament?.courts_count?.toString() || "",
      category: tournament?.category || "",
      participants_count: tournament?.participants_count?.toString() || "",
      grouping:
        tournament?.groups_count && Number(tournament?.groups_count) > 0
          ? true
          : false,
      groups_count: tournament?.groups_count?.toString() || "",
      seat_per_group: tournament?.seat_per_group?.toString() || "",
      top_advancing_group: tournament?.top_advancing_group?.toString() || "",
      scoring_system: tournament?.match_rule?.scoring_system || "",
      deuce: tournament?.match_rule?.deuce || false,
      max_deuce_point:
        tournament?.match_rule?.max_deuce_point?.toString() || "",
      max_point_per_set:
        tournament?.match_rule?.max_point_per_set?.toString() || "",
      best_of_sets: tournament?.match_rule?.best_of_sets?.toString() || "",
      race_to: tournament?.match_rule?.race_to?.toString() || "",
    },
  });

  const onSubmit = (data: z.infer<typeof RulesSchema>) => {
    // add community_id from cookies
    const params: TournamentParams & MatchRuleParams = {
      format: data.grouping ? "group_stage" : "single_elimination",
      courts_count: Number(data.courts_count),
      category: data.category,
      participants_count: Number(data.participants_count),
      max_point_per_set: Number(data.max_point_per_set),
      scoring_system: data.scoring_system,
      ...(data.grouping && {
        groups_count: Number(data.groups_count),
        seat_per_group: Number(data.seat_per_group),
        top_advancing_group: Number(data.top_advancing_group),
      }),
      ...(data.deuce && {
        deuce: data.deuce,
        max_deuce_point: Number(data.max_deuce_point),
      }),
      ...(data.best_of_sets
        ? {
            best_of_sets: Number(data.best_of_sets),
          }
        : { race_to: Number(data.race_to) }),
    };

    startTransition(async () => {
      try {
        if (tournament?.id) {
          const { error } = await updateTournament(tournament.id, params);
          if (error) {
            setError(error);
          } else {
            form.reset();
            router.push(`/community/events/${eventId}?welcome=true`);
          }
        } else {
          const { error } = await createTournament(eventId, params);
          if (error) {
            setError(error);
          } else {
            form.reset();
            router.push(`/community/events/${eventId}?welcome=true`);
          }
        }
      } catch (error) {
        setError("Failed to create event");
      }
    });
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
                  <FormLabel htmlFor="deuce">Enable Deuce?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_deuce_point"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Deuce Point</FormLabel>
                  <FormControl>
                    <Input placeholder="Input max deuce point" {...field} />
                  </FormControl>
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
                      <FormControl>
                        <Input placeholder="Input race to point" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

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
                        <SelectValue placeholder="Pilih final point" />
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
              name="max_point_per_set"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Point per Set</FormLabel>
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
                          {badmintonMaxPointPerSet.map((item) => (
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

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Loading..."
              : tournament?.id
                ? "Update Rules"
                : "Submit Rules"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RulesForm;
