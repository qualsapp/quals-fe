"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

import { CheckboxCard } from "../ui/checkbox";

type Props = {};

const memberFilterScheme = z.object({
  name: z.string().optional(),

  level: z.array(z.string()).min(1, {
    message: "You must select at least one item.",
  }),
  status: z.array(z.string()).min(1, {
    message: "You must select at least one item.",
  }),
});

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

const levelOption: Option[] = [
  { label: "Beginner", value: "weekly" },
  { label: "Intermediete", value: "intermediete" },
  { label: "Advance", value: "advance" },
];
const statusOption: Option[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const MemberFilterForm = (props: Props) => {
  const form = useForm<z.infer<typeof memberFilterScheme>>({
    resolver: zodResolver(memberFilterScheme),
    defaultValues: {
      name: "",
      level: [],
      status: [],
    },
  });

  const onSubmit = (data: z.infer<typeof memberFilterScheme>) => {
    // router.push("/communities/create/community-schedule");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search by name" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel className="text-gray-400 font-semibold">
                Event Type
              </FormLabel>
              {levelOption.map((level) => (
                <FormField
                  key={level.value}
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem key={level.value}>
                      <FormControl>
                        <CheckboxCard
                          checked={field.value?.includes(level.value)}
                          key={level.value}
                          option={level}
                          disabled={level?.disabled}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, level.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== level.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel className="text-gray-400 font-semibold">
                Status
              </FormLabel>
              {statusOption.map((state) => (
                <FormField
                  key={state.value}
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem key={state.value}>
                      <FormControl>
                        <CheckboxCard
                          checked={field.value?.includes(state.value)}
                          key={state.value}
                          option={state}
                          disabled={state?.disabled}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, state.value])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: any) => value !== state.value
                                  )
                                );
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default MemberFilterForm;
