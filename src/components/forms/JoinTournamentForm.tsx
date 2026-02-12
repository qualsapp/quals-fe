"use client";

import React, { useState, useTransition } from "react";
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
  const form = useForm<z.infer<typeof JoinEventScheme>>({
    resolver: zodResolver(JoinEventScheme),
    defaultValues: {
      participant_a: String(playerId),
      participant_b: "",
      tournament_format: event.tournament?.format || "",
      tournament_id: Number(event.tournament?.id) || 0,
    },
  });

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
                    options={[]}
                    onValueChange={field.onChange}
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
