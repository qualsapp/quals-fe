"use client";
import React, { useState, useTransition } from "react";
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
import { CommunityScheme } from "@/lib/validations/community";
import { CommunityResponse } from "@/types/community";
import { MultiSelect } from "../ui/multi-select";
import { SportResponse } from "@/types/global";
import { createCommunity, updateCommunity } from "@/actions/community";

type CommunityDetailsFormProps = {
  community?: CommunityResponse;
  sports: SportResponse["sport_types"];
};

const CommunityDetailsForm = ({
  community,
  sports,
}: CommunityDetailsFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
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

  const onSubmit = async (params: z.infer<typeof CommunityScheme>) => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("address", params.address);
    params.sports.forEach((sport) =>
      formData.append("sports_type_ids[]", sport),
    );
    formData.append("description", params.description);
    formData.append("image", params.image as File);

    startTransition(async () => {
      const { error } = community?.id
        ? await updateCommunity(formData, community.id)
        : await createCommunity(formData);

      if (error) {
        setError(error);
      } else {
        router.push(`/community/${community?.id}`);
      }
    });
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
                  options={sports.map((sport) => ({
                    label: sport.name,
                    value: sport.id.toString(),
                  }))}
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

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-right">
          <Button type="submit" className="px-10" disabled={isPending}>
            {isPending
              ? "Loading..."
              : community
                ? "Update Community"
                : "Create Community"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommunityDetailsForm;
