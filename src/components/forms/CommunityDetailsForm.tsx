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
import { useRouter } from "next/navigation";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { communityService } from "@/services/community-service";
import { CommunityScheme } from "@/lib/validations/community";
import { CommunityResponse } from "@/types/community";
import { MultiSelect } from "../ui/multi-select";
import { sportList } from "@/lib/constants";
import { sharedService } from "@/services/shared-service";

type CommunityDetailsFormProps = {
  community?: CommunityResponse;
};

const CommunityDetailsForm = ({ community }: CommunityDetailsFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CommunityScheme>>({
    resolver: zodResolver(CommunityScheme),
    defaultValues: {
      name: community?.name || "",
      address: community?.address || "",
      sports: community?.sports || [],
      description: community?.description || "",
      image: undefined,
    },
  });

  const onFileChange = (file: FileWithPreview | null) => {
    if (file) {
      form.setValue("image", file.file as File);
    } else {
      form.setValue("image", undefined);
    }
  };

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => await sharedService.getAllSports(),
    select: (data) =>
      data.sport_types.map((sport) => ({
        label: sport.name,
        value: sport.id.toString(),
      })),
  });

  const { mutate, error } = useMutation({
    mutationFn: async (data: FormData) => {
      if (community && community.id) {
        return await communityService.update(community.id, data);
      }
      return await communityService.create(data);
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      router.push(`/community/${data.id}`);
    },
  });

  const onSubmit = (params: z.infer<typeof CommunityScheme>) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("address", params.address);
    params.sports.forEach((sport) =>
      formData.append("sports_type_ids[]", sport),
    );
    formData.append("description", params.description);
    formData.append("image", params.image as File);
    mutate(formData);
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
          name="address"
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
              <FormLabel>Sports Preference</FormLabel>
              <FormControl>
                <MultiSelect
                  options={sports || []}
                  value={field.value}
                  defaultValue={community?.sports}
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

        <AvatarUpload
          onFileChange={onFileChange}
          defaultAvatar={community?.image_url || ""}
        />

        <div className="text-right">
          <Button type="submit" className="px-10">
            {community ? "Update Community" : "Create Community"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityDetailsForm;
