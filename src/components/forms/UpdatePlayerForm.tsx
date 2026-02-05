"use client";
import React, { useEffect } from "react";
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
import { tournamentServices } from "@/services/tournament-services";
import { useDebounce } from "@uidotdev/usehooks";
import { dummyParticipantsResponse } from "@/mock-data/participant";
import { useMutation } from "@tanstack/react-query";
import { matchServices } from "@/services/match-services";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId: string;
  eventId: string;
  tournamentId: string;
  token: string;
};

const PlayerScheme = z.object({
  participant_a: z.array(z.string()).min(1),
  participant_b: z.array(z.string()).min(1),
});

const UpdatePlayerForm = ({
  open,
  setOpen,
  communityId,
  eventId,
  tournamentId,
  token,
}: Props) => {
  const [options, setOptions] = React.useState<MultiSelectOption[]>([]);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const form = useForm({
    resolver: zodResolver(PlayerScheme),
    defaultValues: {
      participant_a: [],
      participant_b: [],
    },
  });

  const fetchParticipants = React.useCallback(
    async (searchValue: string) => {
      if (!token || !communityId || !eventId || !tournamentId) return;
      try {
        // const response = await tournamentServices.getParticipants(
        //   communityId,
        //   eventId,
        //   tournamentId,
        //   token,
        //   {
        //     search: searchValue,
        //     page: 1,
        //     page_size: 20,
        //   },
        // );

        const response = await Promise.resolve(dummyParticipantsResponse);

        if (response.participants) {
          const participantOptions = response.participants.map((p: any) => ({
            label: p.name,
            value: String(p.id),
          }));

          setOptions(participantOptions);
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      }
    },
    [communityId, eventId, tournamentId, token],
  );

  const { mutateAsync: updateParticipant } = useMutation({
    mutationFn: (data: { participant_a: number; participant_b: number }) => {
      return matchServices.updateParticipant(
        communityId,
        eventId,
        tournamentId,
        token,
        data.participant_a,
        data.participant_b,
      );
    },
  });

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
      const participant_a = data.participant_a[0];
      const participant_b = data.participant_b[0];
      updateParticipant({
        participant_a: Number(participant_a),
        participant_b: Number(participant_b),
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
            <div className="flex justify-center">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlayerForm;
