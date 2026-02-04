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

import { useMutation, useQuery } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { ProfileScheme } from "@/lib/validations/user";
import { sportList } from "@/lib/constants";
import { UserModel } from "@/types/user";
import { sharedService } from "@/services/shared-service";

type ProfileFormProps = {
  data?: UserModel;
};

const ProfileForm = ({ data }: ProfileFormProps) => {
  const form = useForm<z.infer<typeof ProfileScheme>>({
    resolver: zodResolver(ProfileScheme),
    defaultValues: {
      username: data?.username || "",
      display_name: data?.display_name || "",
      phone_number: data?.phone_number || "",
      sports: data?.sports || [],
      bio: data?.bio || "",
      file: undefined,
    },
  });

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => await sharedService.getAllSports(),
    select: (data) => data.sport_types,
  });

  const { mutate, error } = useMutation({
    mutationFn: (formData: FormData) => {
      if (data?.id) return userServices.edit(formData);
      return userServices.create(formData);
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
  });

  const onSubmit = async (params: z.infer<typeof ProfileScheme>) => {
    const formData = new FormData();
    formData.append("username", params.username);
    formData.append("display_name", params.display_name);
    formData.append("phone_number", params.phone_number);
    // params.sports.forEach((sport) =>
    //   formData.append("sport_type_ids[]", sport),
    // );
    formData.append("sport_type_ids[]", "1");

    if (params.bio) {
      formData.append("bio", params.bio);
    }
    if (params.file) {
      formData.append("file", params.file);
    }

    mutate(formData);
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
          disabled={!form.formState.isValid}
        >
          {data ? "Update Profile" : "Create Profile"}
        </Button>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </form>
    </Form>
  );
};

export default ProfileForm;
