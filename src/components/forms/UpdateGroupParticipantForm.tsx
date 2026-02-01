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
};

const PlayerScheme = z.object({
  participant_a: z.array(z.string()).min(1),
});

const UpdateGroupParticipantForm = ({ open, setOpen }: Props) => {
  const form = useForm({
    resolver: zodResolver(PlayerScheme),
    defaultValues: {
      participant_a: [],
    },
  });

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
                      options={[
                        {
                          label: "Player 1",
                          value: "1",
                        },
                      ]}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
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
