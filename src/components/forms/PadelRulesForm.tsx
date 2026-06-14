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

import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import {
  MatchRuleParams,
  TournamentParams,
  TournamentResponse,
} from "@/types/tournament";
import { useRouter } from "next/navigation";
import { createTournament, updateTournament } from "@/actions/tournament";

type Props = {
  eventId: string;
  tournament?: TournamentResponse;
};

const RulesSchema = z
  .object({
    name: z.string().min(1, "Tournament name is required").max(150),
    courts_count: z.string().min(1, "Number of Court is required"),
    category: z.string().min(1, "Category is required"),
    participants_count: z.string().min(1, "Knockout Seat is required"),
    mode: z.enum(["AUTO", "MANUAL"]),
    grouping: z.boolean(),
    groups_count: z.string(),
    seat_per_group: z.string(),
    top_advancing_group: z.string(),
    deuce: z.boolean(),
    race_to: z.string().optional(),
    total_of: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.grouping) {
      if (!data.groups_count) {
        ctx.addIssue({
          path: ["groups_count"],
          code: z.ZodIssueCode.custom,
          message: "This field is required",
        });
      }

      if (!data.seat_per_group) {
        ctx.addIssue({
          path: ["seat_per_group"],
          code: z.ZodIssueCode.custom,
          message: "This field is required",
        });
      }

      if (!data.top_advancing_group) {
        ctx.addIssue({
          path: ["top_advancing_group"],
          code: z.ZodIssueCode.custom,
          message: "This field is required",
        });
      }
    }
  });

const RulesForm = ({ tournament, eventId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  // Stays true once the post-submit redirect kicks off, so the button keeps its
  // loading state until the next page paints (isPending can flip first).
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof RulesSchema>>({
    resolver: zodResolver(RulesSchema),
    defaultValues: {
      name: tournament?.name || "",
      courts_count: tournament?.courts_count?.toString() || "",
      category: tournament?.category || "",
      participants_count: tournament?.participants_count?.toString() || "",
      mode: tournament?.mode || "AUTO",
      grouping:
        tournament?.groups_count && Number(tournament?.groups_count) > 0
          ? true
          : false,
      groups_count: tournament?.groups_count?.toString() || "",
      seat_per_group: tournament?.seat_per_group?.toString() || "",
      top_advancing_group: tournament?.top_advancing_group?.toString() || "",
      deuce: tournament?.match_rule?.deuce || false,
      race_to: tournament?.match_rule?.race_to?.toString() || "",
      total_of: tournament?.match_rule?.total_of?.toString() || "",
    },
  });

  const onSubmit = (data: z.infer<typeof RulesSchema>) => {
    // add community_id from cookies
    const params: TournamentParams & MatchRuleParams = {
      name: data.name,
      format: data.grouping ? "group_stage" : "single_elimination",
      courts_count: Number(data.courts_count),
      category: data.category,
      mode: data.mode,

      participants_count: Number(data.participants_count),
      ...(data.total_of && { total_of: Number(data.total_of) }),
      ...(data.race_to && { race_to: Number(data.race_to) }),
      ...(data.grouping && {
        groups_count: Number(data.groups_count),
        seat_per_group: Number(data.seat_per_group),
        top_advancing_group: Number(data.top_advancing_group),
      }),
      deuce: data.deuce,
      scoring_system: "rally",
    };

    setError(undefined);
    startTransition(async () => {
      const result = tournament?.id
        ? await updateTournament(tournament.id, params)
        : await createTournament(eventId, params);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Navigate WITHOUT resetting first: clearing the form blanks every field
      // while the event page loads, which reads as a jarring reset. Keep the
      // form intact + the button loading until the destination paints over it.
      setIsRedirecting(true);
      const tournamentId = tournament?.id || result.id;
      // Only greet with the welcome pop-up when creating a brand-new
      // tournament; editing an existing one shouldn't re-trigger it.
      const welcomeParam = tournament?.id ? "" : "&welcome=true";
      router.push(
        `/community/events/${eventId}/matches?tournament=${tournamentId}${welcomeParam}`,
      );
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
            name="name"
            render={({ field }) => (
              <FormItem className="md:max-w-[300px]">
                <FormLabel>Tournament Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Men's Double, Women's Single"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem className="md:max-w-[300px]">
                <FormLabel>Participant Mode</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      form.setValue("mode", value as "AUTO" | "MANUAL");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select participant mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="AUTO">
                          Auto (players join themselves)
                        </SelectItem>
                        <SelectItem value="MANUAL">
                          Manual (host enters names)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                      checked={!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="deuce">Golden Point?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="total_of" className="w-full">
              <TabsList>
                <TabsTrigger value="total_of">Total of</TabsTrigger>
                <TabsTrigger value="race_to">Race to</TabsTrigger>
              </TabsList>
              <TabsContent value="total_of">
                <FormField
                  control={form.control}
                  name="total_of"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Input total of" {...field} />
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
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center">
          <Button type="submit" disabled={isPending || isRedirecting}>
            {isPending || isRedirecting
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
