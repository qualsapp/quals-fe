"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createManualParticipant } from "@/actions/tournament";

type Props = {
  tournamentId: string;
  // "single", "double", or "mixed"
  category: string;
  closeModal: () => void;
  onSuccess?: () => void;
};

const ParticipantSchema = z.object({
  member_1: z.string().min(1, "Name is required").max(255, "Name is too long"),
  member_2: z.string().max(255, "Name is too long").optional(),
});

type ParticipantFormValues = z.infer<typeof ParticipantSchema>;

const ManualParticipantForm = ({
  tournamentId,
  category,
  closeModal,
  onSuccess,
}: Props) => {
  const isDouble = category === "double" || category === "mixed";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(ParticipantSchema),
    defaultValues: {
      member_1: "",
      member_2: "",
    },
  });

  const onSubmit = (data: ParticipantFormValues) => {
    if (isDouble && !data.member_2?.trim()) {
      form.setError("member_2", { message: "Partner name is required" });
      return;
    }

    const members = isDouble
      ? [data.member_1.trim(), (data.member_2 ?? "").trim()]
      : [data.member_1.trim()];

    startTransition(async () => {
      const { error } = await createManualParticipant(tournamentId, {
        members,
      });
      if (error) {
        setError(error);
      } else {
        form.reset();
        onSuccess?.();
        closeModal();
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="member_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isDouble ? "Player 1" : "Name"}</FormLabel>
              <FormControl>
                <Input placeholder="Enter participant name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isDouble && (
          <FormField
            control={form.control}
            name="member_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Player 2</FormLabel>
                <FormControl>
                  <Input placeholder="Enter partner name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Participant"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManualParticipantForm;
