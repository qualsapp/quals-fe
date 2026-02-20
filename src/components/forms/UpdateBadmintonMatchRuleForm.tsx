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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { badmintonMaxPointPerSet, badmintonScoreType } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { updateMatchRules } from "@/actions/match";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rule: MatchRuleResponse;
  matchId: string;
};

const BadmintonMatchRuleScheme = z
  .object({
    deuce: z.boolean(),
    scoring_system: z.string(),
    max_deuce_point: z.string().optional(),
    max_point_per_set: z.string().min(1, "Final Point is required"),
    best_of_sets: z.string().optional(),
    race_to: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deuce && !data.max_deuce_point) {
      ctx.addIssue({
        path: ["max_deuce_point"],
        code: z.ZodIssueCode.custom,
        message: "This field is required",
      });
    }
  });

const UpdateBadmintonMatchRuleForm = ({
  open,
  setOpen,
  rule,
  matchId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(BadmintonMatchRuleScheme),
    defaultValues: {
      deuce: rule.deuce,
      scoring_system: rule.scoring_system,
      max_deuce_point: rule.max_deuce_point?.toString() || "",
      max_point_per_set: rule.max_point_per_set?.toString() || "",
      best_of_sets: rule.best_of_sets?.toString() || "",
      race_to: rule.race_to?.toString() || "",
    },
  });

  const onSubmit = (data: z.infer<typeof BadmintonMatchRuleScheme>) => {
    try {
      const params: MatchRuleParams = {
        ...(data.deuce && {
          deuce: data.deuce,
          max_deuce_point: Number(data.max_deuce_point),
        }),
        ...(data.best_of_sets
          ? {
              best_of_sets: Number(data.best_of_sets),
            }
          : { race_to: Number(data.race_to) }),
        max_point_per_set: Number(data.max_point_per_set),
        scoring_system: data.scoring_system,
      };

      startTransition(async () => {
        const { error } = await updateMatchRules(matchId, params);
        if (error) {
          setError(error);
        } else {
          form.reset();
          setOpen(false);

          router.push(`${pathname}/play?type=badminton`);
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
          <DialogTitle>Update Badminton Match Rule</DialogTitle>
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
                      <FormLabel htmlFor="deuce">Enable Deuce?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_deuce_point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Deuce Point</FormLabel>
                      <FormControl>
                        <Input placeholder="Input max deuce point" {...field} />
                      </FormControl>
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

                <FormField
                  control={form.control}
                  name="scoring_system"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scoring System</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            form.setValue("scoring_system", value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih final point" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {badmintonScoreType.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_point_per_set"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Point per Set</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            form.setValue("max_point_per_set", value);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih final point" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {badmintonMaxPointPerSet.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default UpdateBadmintonMatchRuleForm;
