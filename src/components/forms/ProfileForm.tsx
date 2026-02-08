"use client";
import React, { useState, useTransition } from "react";
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

import { Button } from "../ui/button";

import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { ProfileScheme } from "@/lib/validations/user";

import { UserModel } from "@/types/user";
import { sharedService } from "@/services/shared-service";
import { createPlayerDetails } from "@/actions/player";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  data?: UserModel;
};

const ProfileForm = ({ data }: ProfileFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileScheme>>({
    resolver: zodResolver(ProfileScheme),
    defaultValues: {
      username: data?.username || "",
      display_name: data?.display_name || "",
      phone_number: data?.phone_number || "",
      sports: data?.sport_types?.map((sport) => sport.id.toString()) || [],
      bio: data?.bio || "",
      file: undefined,
    },
  });

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => await sharedService.getAllSports(),
    select: (data) =>
      data.sport_types.map((sport) => ({
        label: sport.name,
        value: sport.id.toString(),
      })),
  });

  const onSubmit = async (params: z.infer<typeof ProfileScheme>) => {
    const formData = new FormData();
    formData.append("username", params.username);
    formData.append("display_name", params.display_name);
    formData.append("phone_number", params.phone_number);
    params.sports.forEach((sport) =>
      formData.append("sport_type_ids[]", sport),
    );

    if (params.bio) {
      formData.append("bio", params.bio);
    }
    if (params.file) {
      formData.append("file", params.file);
    }

    startTransition(async () => {
      const { error } = await createPlayerDetails(formData);
      if (error) {
        setError(error);
      } else {
        router.push("/dashboard");
      }
    });
  };

  const onFileChange = (file: FileWithPreview | null) => {
    if (file) {
      form.setValue("file", file.file as File);
    } else {
      form.setValue("file", undefined);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="e.g., quals" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., PlayerOne" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 08123456789" {...field} />
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
                  options={sports || []}
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

        <AvatarUpload
          onFileChange={onFileChange}
          defaultAvatar={data?.photo_url || ""}
        />

        <Button
          type="submit"
          className="px-10"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending
            ? "Loading..."
            : data
              ? "Update Profile"
              : "Create Profile"}
        </Button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default ProfileForm;
