"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import React, { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FormControl,
  Form,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { finishMatchApi } from "@/actions/match";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  participant_a: string;
  participant_b: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  eventId: number;
  matchId: number;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const winnerDeciderScheme = z.object({
  condition: z.string().min(1, "Condition is required"),
  winner_side: z.string().min(1, "Winner side is required"),
});

const conditionOptions = [
  { value: "retired", label: "Retired" },
  { value: "walkover", label: "Walkover" },
  { value: "disqualified", label: "Disqualified" },
  { value: "injury", label: "Injury" },
  { value: "time_limit", label: "Time Limit" },
  { value: "normal_end", label: "Normal" },
  { value: "manual", label: "Manual" },
];

const WinnerDecider = (props: Props) => {
  const { participant_a, participant_b, open, setOpen, matchId, eventId } =
    props;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof winnerDeciderScheme>>({
    defaultValues: {
      condition: "",
      winner_side: "",
    },
  });

  const winnerDeciderMutation = async (
    data: z.infer<typeof winnerDeciderScheme>,
  ) => {
    startTransition(async () => {
      const res = await finishMatchApi(String(matchId), data);

      if (res.error) {
        setError(res.error);
      } else {
        router.push(`/community/events/${eventId}/matches`);
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick Winner</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(winnerDeciderMutation)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="condition"
              rules={{
                required: "Condition is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("condition", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select winner" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="winner_side"
              rules={{
                required: "Winner is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Winner</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("winner_side", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select winner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant_a">
                          {participant_a}
                        </SelectItem>
                        <SelectItem value="participant_b">
                          {participant_b}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <DialogFooter>
              <Button className="mx-auto mt-4" disabled={isPending}>
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDecider;
