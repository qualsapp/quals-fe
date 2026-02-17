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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  tournamentId: string;
  tournamentBracketId: string;
  match_rule_id: string;
};

const PlayerScheme = z.object({
  participant_a: z.array(z.string()).min(1),
  participant_b: z.array(z.string()).min(1),
  court_number: z.string(),
});

const UpdatePlayerForm = ({
  open,
  setOpen,
  tournamentId,
  tournamentBracketId,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const form = useForm({
    resolver: zodResolver(PlayerScheme),
    defaultValues: {
      participant_a: [],
      participant_b: [],
      court_number: "",
    },
  });

  const fetchParticipants = useCallback(
    async (searchValue: string) => {
      if (!tournamentId) return;
      try {
        const response = await getTournamentParticipants(tournamentId, {
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
    [tournamentId],
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

  const onSubmit = (data: z.infer<typeof PlayerScheme>) => {
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
          form.reset();
          setOpen(false);
        }
      });
    } catch (error) {
      console.error("Failed to update participant:", error);
    }
  };

  const onChangeParticipant = (
    name: "participant_a" | "participant_b",
    value: string[],
  ) => {
    form.setValue(name, [String(value.pop())]);
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participant A</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) =>
                        onChangeParticipant("participant_a", value)
                      }
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participant B</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={(value) =>
                        onChangeParticipant("participant_b", value)
                      }
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
                    <Input {...field} placeholder="Court number..." />
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
