"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect, MultiSelectOption } from "../ui/multi-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "../ui/input";
import { getTournamentParticipants } from "@/actions/tournament";
import { createMatch } from "@/actions/match";
import { MatchParams } from "@/types/match";
import { Participant } from "@/types/tournament";
import { Participant as BracketParticipant } from "@/types/bracket";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  top_advancing_group: boolean;
  tournamentId: string;
  tournamentBracketId: string;
  match_rule_id: string;
  participants: BracketParticipant[];
  court: number | undefined;
  courtsCount: number;
};

type PlayerFormValues = {
  participant_a: string[];
  participant_b: string[];
  court_number: string;
};

const UpdatePlayerForm = ({
  open,
  setOpen,
  top_advancing_group,
  tournamentId,
  tournamentBracketId,
  participants,
  court,
  courtsCount,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const playerScheme = React.useMemo(
    () =>
      z.object({
        participant_a: z
          .array(z.string())
          .min(1, "Please select participant A"),
        participant_b: z
          .array(z.string())
          .min(1, "Please select participant B"),
        court_number: z
          .string()
          .min(1, "Court number is required")
          .refine(
            (value) => Number(value) > 0,
            "Court number must be a positive number",
          )
          .refine(
            (value) => Number(value) <= courtsCount,
            `Court number can't be greater than ${courtsCount} (number of courts available)`,
          ),
      }),
    [courtsCount],
  );

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerScheme),
    defaultValues: {
      participant_a: participants[0]?.id ? [String(participants[0].id)] : [],
      participant_b: participants[1]?.id ? [String(participants[1].id)] : [],
      court_number: court != null ? String(court) : "",
    },
  });

  // The dialog is mounted once and reused for every match, so the form keeps the
  // previously edited match's values. Re-seed the fields (and clear any stale
  // error) each time it opens for a match so the user always sees a fresh form.
  useEffect(() => {
    if (!open) return;
    setError(null);
    form.reset({
      participant_a: participants[0]?.id ? [String(participants[0].id)] : [],
      participant_b: participants[1]?.id ? [String(participants[1].id)] : [],
      court_number: court != null ? String(court) : "",
    });
  }, [open, participants, court, form]);

  const fetchParticipants = useCallback(
    async (searchValue: string) => {
      if (!tournamentId) return;
      try {
        const response = await getTournamentParticipants(tournamentId, {
          top_advancing_group: top_advancing_group,
          search: searchValue,
          page: 1,
          page_size: 20,
        });

        if (response.participants) {
          const participantOptions = response.participants.map(
            (p: Participant) => ({
              label: p.name,
              value: String(p.id),
            }),
          );

          setOptions(participantOptions);
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      }
    },
    [tournamentId, top_advancing_group],
  );

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      fetchParticipants(debouncedSearch);
    }
  }, [debouncedSearch, open, fetchParticipants]);

  const participantA = form.watch("participant_a");
  const participantB = form.watch("participant_b");

  // A participant already picked in one slot must not be selectable in the
  // other, mirroring how the group form hides participants assigned elsewhere.
  const optionsForA = React.useMemo(
    () => options.filter((option) => !participantB.includes(option.value)),
    [options, participantB],
  );
  const optionsForB = React.useMemo(
    () => options.filter((option) => !participantA.includes(option.value)),
    [options, participantA],
  );

  const onSubmit = (data: PlayerFormValues) => {
    try {
      const params: MatchParams = {
        participant_a_id: Number(data.participant_a[0]),
        participant_b_id: Number(data.participant_b[0]),
        court_number: Number(data.court_number),
      };

      startTransition(async () => {
        const { error } = await createMatch(tournamentBracketId, params);
        if (error) {
          setError(error);
        } else {
          setOpen(false);
          // Re-fetch the server-rendered bracket so the update shows without a
          // manual page refresh.
          router.refresh();
        }
      });
    } catch (error) {
      console.error("Failed to update participant:", error);
    }
  };

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update participant</DialogTitle>
          <DialogDescription>
            Select the participants for the match.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="participant_a"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Participant A</FormLabel>
                  <FormControl>
                    <MultiSelect
                      {...field}
                      options={optionsForA}
                      defaultValue={field.value}
                      maxSelected={1}
                      hideSelectAll
                      closeOnSelect
                      onValueChange={onChange}
                      onSearchValueChange={setSearch}
                      placeholder="Choose participants..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participant_b"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Participant B</FormLabel>
                  <FormControl>
                    <MultiSelect
                      {...field}
                      options={optionsForB}
                      defaultValue={field.value}
                      maxSelected={1}
                      hideSelectAll
                      closeOnSelect
                      onValueChange={onChange}
                      onSearchValueChange={setSearch}
                      placeholder="Choose participants..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="court_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="Court number..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex justify-center">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlayerForm;
