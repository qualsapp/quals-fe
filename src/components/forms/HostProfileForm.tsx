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

import { Textarea } from "../ui/textarea";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { HostScheme } from "@/lib/validations/user";

import { useRouter } from "next/navigation";
import { createHostDetails, updateHostDetails } from "@/actions/host";
import { HostDetailResponse } from "@/types/host";
import { toast } from "sonner";

type HostProfileForm = {
  host?: HostDetailResponse;
};

const HostProfileForm = ({ host }: HostProfileForm) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<z.infer<typeof HostScheme>>({
    resolver: zodResolver(HostScheme),
    defaultValues: {
      username: host?.username || "",
      display_name: host?.display_name || "",
      bio: host?.bio || "",
      file: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof HostScheme>) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("display_name", data.display_name);
    if (data.bio) {
      formData.append("bio", data.bio);
    }
    if (data.file) {
      formData.append("file", data.file);
    }

    startTransition(async () => {
      if (host?.id) {
        const { error } = await updateHostDetails(formData);
        if (error) {
          setError(error);
        } else {
          toast.success("Host details updated successfully");
          setTimeout(() => {
            router.push("/profile");
          }, 1000);
        }
      } else {
        const { error } = await createHostDetails(formData);
        if (error) {
          setError(error);
        } else {
          toast.success("Host details created successfully");
          setTimeout(() => {
            router.push("/community/create");
          }, 1000);
        }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        encType="multipart/form-data"
      >
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
          defaultAvatar={host?.photo_url || ""}
        />

        <div className="text-center">
          <Button
            type="submit"
            className="px-10 "
            disabled={!form.formState.isValid || isPending}
          >
            {isPending ? "Loading..." : host ? "Update Host" : "Create Host"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default HostProfileForm;
