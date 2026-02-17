"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  tournamentId: string;
};

import { MultiSelectOption } from "../ui/multi-select";
import { useDebounce } from "@uidotdev/usehooks";
import { getTournamentParticipants } from "@/actions/tournament";
import { GroupParticipantParams } from "@/types/match";
import { Participant } from "@/types/bracket";

const PlayerScheme = z.object({
  participant_a: z.array(z.string()).min(1),
});

const UpdateGroupParticipantForm = ({ open, setOpen, tournamentId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const form = useForm({
    resolver: zodResolver(PlayerScheme),
    defaultValues: {
      participant_a: [],
    },
  });

  const fetchParticipants = React.useCallback(
    async (searchValue: string) => {
      if (!tournamentId) return;
      try {
        const response = await getTournamentParticipants(
          tournamentId,

          {
            search: searchValue,
            page: 1,
            page_size: 20,
          },
        );

        if (response.participants) {
          const participantOptions = response.participants.map(
            (p: Participant) => ({
              label: String(p.name),
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

  useEffect(() => {
    if (open) {
      fetchParticipants(debouncedSearch);
    }
  }, [debouncedSearch, open, fetchParticipants]);

  const onSubmit = (data: z.infer<typeof PlayerScheme>) => {
    try {
      const params: GroupParticipantParams = {
        tournament_group_id: Number(0),
        participant_ids: data.participant_a.map((id) => Number(id)),
      };

      console.log(params);

      startTransition(() => {
        // to do: update participant
      });
    } catch (error) {
      console.error("Failed to update participant:", error);
    }
  };

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
                  <FormLabel>Participant</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      onSearchValueChange={setSearch}
                      placeholder="Choose participants..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default UpdateGroupParticipantForm;
