"use client";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { on } from "events";
import { useRouter } from "next/navigation";

const communityScheme = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  sports: z.string().min(1, "Sports is required"),
  description: z.string(),
});

type CommunityDetailsFormProps = {
  // onNext: (step: string) => void;
};

const CommunityDetailsForm = ({}: CommunityDetailsFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof communityScheme>>({
    resolver: zodResolver(communityScheme),
    defaultValues: {
      name: "",
      location: "",
      sports: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof communityScheme>) => {
    router.push("/community/create/community-schedule");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Downtown Badminton Club" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Sport Center, 123 Main St"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sports</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Badminton, Football, Basketball"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of your community..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="px-10">
            Next: Event Schedule
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityDetailsForm;
