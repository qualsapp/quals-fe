"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { joinTournament } from "@/actions/tournament";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../ui/input";

import { JoinTournamentParams } from "@/types/tournament";
import { EventResponse } from "@/types/event";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import { searchPlayer } from "@/actions/player";
import { useDebounce } from "@uidotdev/usehooks";
import { Participant } from "@/types/bracket";

type Props = {
  event: EventResponse;
  playerId: string;
  closeModal: () => void;
};
const JoinEventScheme = z
  .object({
    participant_a: z.string().min(1, "Participant A is required"),
    participant_b: z.string().optional(),
    tournament_format: z.string(),
    tournament_id: z.number(),
  })
  .superRefine((data, ctx) => {
    if (data.tournament_format === "double" && !data.participant_b) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Participant B is required for double format",
        path: ["participant_b"],
      });
    }
  });

const JoinTournamentForm = ({ event, playerId, closeModal }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const form = useForm<z.infer<typeof JoinEventScheme>>({
    resolver: zodResolver(JoinEventScheme),
    defaultValues: {
      participant_a: String(playerId),
      participant_b: "",
      tournament_format: event.tournament?.category || "",
      tournament_id: Number(event.tournament?.id) || 0,
    },
  });

  const fetchParticipants = React.useCallback(async (searchValue: string) => {
    try {
      const res = await searchPlayer(searchValue);

      if (Array.isArray(res)) {
        const participantOptions = res.map((p: Participant) => ({
          label: p.display_name,
          value: p.id.toString(),
        }));
        setOptions(participantOptions);
      }
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  }, []);

  useEffect(() => {
    fetchParticipants(debouncedSearch);
  }, [debouncedSearch, fetchParticipants]);

  const onSubmit = (data: z.infer<typeof JoinEventScheme>) => {
    const params: JoinTournamentParams = {
      participant: [
        Number(data.participant_a),
        ...(data.tournament_format === "double" && data.participant_b
          ? [Number(data.participant_b)]
          : []),
      ],
    };
    startTransition(async () => {
      const { error } = await joinTournament(
        String(data.tournament_id),
        params,
      );
      if (error) {
        setError(error);
      } else {
        form.reset();
        closeModal();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="participant_a"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input placeholder="e.g., example@mail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {form.watch("tournament_format") === "double" && (
          <FormField
            control={form.control}
            name="participant_b"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={options}
                    onValueChange={(value) => {
                      field.onChange(value[0] || "");
                    }}
                    value={field.value}
                    placeholder="Select your partner"
                    onSearchValueChange={setSearch}
                    maxSelected={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="tournament_format"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tournament_id"
          render={({ field }) => (
            <FormItem hidden>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Joining..." : "Yes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JoinTournamentForm;
