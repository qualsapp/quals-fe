"use client";
import React, { useState, useTransition } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Switch } from "@/components/ui/switch";
import { MatchRuleParams, MatchRuleResponse } from "@/types/tournament";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateMatchRules } from "@/actions/match";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  matchId: string;
  rule: MatchRuleResponse;
};

const PadelMatchRuleScheme = z.object({
  deuce: z.boolean(),
  best_of_sets: z.string().optional(),
  race_to: z.string().optional(),
});

const UpdatePadelMatchRuleForm = ({ open, setOpen, rule, matchId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(PadelMatchRuleScheme),
    defaultValues: {
      deuce: !rule.deuce || false,
      best_of_sets: rule.best_of_sets?.toString() || "",
      race_to: rule.race_to?.toString() || "",
    },
  });

  const onSubmit = (data: z.infer<typeof PadelMatchRuleScheme>) => {
    try {
      const params: MatchRuleParams = {
        deuce: data.deuce,
        ...(data.best_of_sets
          ? {
              best_of_sets: Number(data.best_of_sets),
            }
          : { race_to: Number(data.race_to) }),
        scoring_system: "rally",
      };

      startTransition(async () => {
        const { error } = await updateMatchRules(matchId, params);
        if (error) {
          setError(error);
        } else {
          form.reset();
          setOpen(false);
          router.push(`${pathname}/play?type=paddle`);
        }
      });
    } catch (error) {
      console.error("Failed to update participant:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Paddle Match Rule</DialogTitle>
          <DialogDescription>
            Please check the match rule before starting the match.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3 border rounded-md p-3">
              <div className="flex flex-col md:max-w-[300px] gap-4">
                <FormField
                  control={form.control}
                  name="deuce"
                  render={({ field }) => (
                    <FormItem className="flex gap-3">
                      <FormControl>
                        <Switch
                          id="deuce"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel htmlFor="deuce">Golden Point?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Tabs defaultValue="best_of" className="w-full">
                  <TabsList>
                    <TabsTrigger value="best_of">Best of</TabsTrigger>
                    <TabsTrigger value="race_to">Race to</TabsTrigger>
                  </TabsList>
                  <TabsContent value="best_of">
                    <FormField
                      control={form.control}
                      name="best_of_sets"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Input best of point"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="race_to">
                    <FormField
                      control={form.control}
                      name="race_to"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Input race to point"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div className="flex justify-center">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Confirm"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePadelMatchRuleForm;
