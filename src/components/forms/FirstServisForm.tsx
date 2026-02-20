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
import { FormControl, Form, FormItem, FormField } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { createMatchSet } from "@/actions/match";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Props = {
  participant_a: string;
  participant_b: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  matchId: number;
  refetch: () => void;
};

const FirstServisScheme = z.object({
  first_server: z.string().min(1, "First server is required"),
});

const FirstServisForm = (props: Props) => {
  const { participant_a, participant_b, open, setOpen, matchId, refetch } =
    props;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FirstServisScheme>>({
    defaultValues: {
      first_server: "",
    },
  });

  const firstServerMutation = async (
    data: z.infer<typeof FirstServisScheme>,
  ) => {
    const first_server = data.first_server;

    startTransition(async () => {
      const res = await createMatchSet(String(matchId), {
        current_server: first_server,
      });

      if (res.error) {
        setError(res.error);
      } else {
        refetch();
        const params = new URLSearchParams(searchParams.toString());
        params.set("set_id", String(res.id));
        router.push(`${pathname}?${params.toString()}`);
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Servis</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(firstServerMutation)}>
            <FormField
              control={form.control}
              name="first_server"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        form.setValue("first_server", value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a first server" />
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
                    {/* <FormMessage /> */}
                  </FormControl>
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <DialogFooter>
              <Button className="mx-auto mt-4" disabled={isPending}>
                Create match set
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FirstServisForm;
