"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { getTournamentParticipants } from "@/actions/tournament";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import { useDebounce } from "@uidotdev/usehooks";
import { createGroupParticipants } from "@/actions/group";
import { GroupParticipantsParams } from "@/types/group";
import { Participant } from "@/types/tournament";

type Props = {
  groupId: string;
  tournamentId: string;
  seatPerGroup: number;
  closeModal: () => void;
};
const JoinEventScheme = z
  .object({
    participant_ids: z.array(z.number()),
    groupId: z.string(),
    seatPerGroup: z.number(),
  })
  .superRefine((data, ctx) => {
    if (data.participant_ids.length !== data.seatPerGroup) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Participant is required, must be ${data.seatPerGroup}`,
        path: ["participant_ids"],
      });
    }
  });

const GroupParticipantForm = ({
  groupId,
  tournamentId,
  seatPerGroup,
  closeModal,
}: Props) => {
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
      participant_ids: [],
      groupId: String(groupId),
      seatPerGroup: seatPerGroup,
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

  useEffect(() => {
    fetchParticipants(debouncedSearch);
  }, [debouncedSearch, fetchParticipants]);

  const onSubmit = (data: z.infer<typeof JoinEventScheme>) => {
    const params: GroupParticipantsParams = {
      participant_ids: data.participant_ids.map((id) => Number(id)),
    };
    startTransition(async () => {
      const { error } = await createGroupParticipants(data.groupId, params);
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
          name="participant_ids"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormControl>
                <MultiSelect
                  {...field}
                  options={options}
                  onValueChange={onChange}
                  value={field.value.toString()}
                  maxSelected={seatPerGroup}
                  onSearchValueChange={setSearch}
                  placeholder={`Select up to ${seatPerGroup} participants`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex justify-center">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Participants"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GroupParticipantForm;
