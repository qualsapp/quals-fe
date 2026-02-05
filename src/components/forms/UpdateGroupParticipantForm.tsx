"use client";
import React from "react";
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
import { MultiSelect } from "../ui/multi-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId: string;
  eventId: string;
  tournamentId: string;
  token: string;
};

import { tournamentServices } from "@/services/tournament-services";
import { MultiSelectOption } from "../ui/multi-select";
import { useDebounce } from "@uidotdev/usehooks";

const PlayerScheme = z.object({
  participant_a: z.array(z.string()).min(1),
});

const UpdateGroupParticipantForm = ({
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
    },
  });

  const fetchParticipants = React.useCallback(
    async (searchValue: string) => {
      if (!token || !communityId || !eventId || !tournamentId) return;
      try {
        const response = await tournamentServices.getParticipants(
          communityId,
          eventId,
          tournamentId,
          token,
          {
            search: searchValue,
            page: 1,
            page_size: 20,
          },
        );

        if (response.participants) {
          const participantOptions = response.participants.map((p: any) => ({
            label: p.name,
            value: p.id,
          }));
          setOptions(participantOptions);
        }
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      }
    },
    [communityId, eventId, tournamentId, token],
  );

  React.useEffect(() => {
    if (open) {
      fetchParticipants(debouncedSearch);
    }
  }, [debouncedSearch, open, fetchParticipants]);

  const onSubmit = (data: z.infer<typeof PlayerScheme>) => {
    console.log(data);
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
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGroupParticipantForm;
