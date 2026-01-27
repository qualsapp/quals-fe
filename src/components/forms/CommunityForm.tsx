"use client";
import React from "react";
import z from "zod";
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

import { userServices } from "@/services/user-services";
import { Button } from "../ui/button";

import { useMutation } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";

const ProfileScheme = z.object({
  name: z.string().min(3, "Community name is required"),
  sports: z.array(z.string()).min(1, "At least one sport is required"),
  locations: z.array(z.string()).min(1, "At least one sport is required"),

  bio: z.string().max(160, "Bio must be at most 160 characters"),
  image: z.file().optional(),
});

const sportList = [
  { value: "badminton", label: "Badminton" },
  { value: "padel", label: "Padel" },
];
const locationList = [
  { value: "bandung", label: "Bandung" },
  { value: "jakarta", label: "Jakarta" },
];

const CommunityForm = () => {
  const form = useForm<z.infer<typeof ProfileScheme>>({
    resolver: zodResolver(ProfileScheme),
    defaultValues: {
      name: "",
      sports: [],
      locations: [],
      bio: "",
      image: undefined,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: (data: z.infer<typeof ProfileScheme>) =>
      userServices.edit(data),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
  });

  const onSubmit = async (data: z.infer<typeof ProfileScheme>) => {
    // mutate(data);
    console.log("Form data:", data);
  };

  const onFileChange = (file: FileWithPreview | null) => {
    if (file) {
      form.setValue("image", file.file as File);
    } else {
      form.setValue("image", undefined);
    }
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
          name="sports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sports Preference</FormLabel>
              <FormControl>
                <MultiSelect
                  options={sportList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Choose sports..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <FormControl>
                <MultiSelect
                  options={locationList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Choose locations..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Let other players know more about you..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AvatarUpload onFileChange={onFileChange} />

        <Button
          type="submit"
          className="px-10"
          disabled={!form.formState.isValid}
        >
          Selanjutnya
        </Button>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </form>
    </Form>
  );
};

export default CommunityForm;
