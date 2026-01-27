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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { userService } from "@/services/user-services";
import { Button } from "../ui/button";

import { useMutation } from "@tanstack/react-query";
import { MultiSelect } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import AvatarUpload from "../file-upload/avatar-upload";
import { FileWithPreview } from "@/hooks/use-file-upload";
import { HostScheme } from "@/lib/validations/user";
import { levelList, locationList, sportList } from "@/lib/constants";
import { hostService } from "@/services/host-services";
import { useRouter } from "next/navigation";
import { HostModel } from "@/types/user";

type HostProfileForm = {
  data?: HostModel;
};

const HostProfileForm = ({ data }: HostProfileForm) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof HostScheme>>({
    resolver: zodResolver(HostScheme),
    defaultValues: {
      username: data?.username || "",
      display_name: data?.display_name || "",
      bio: data?.bio || "",
      file: undefined,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: async (data: FormData) => await hostService.create(data),
    onSuccess: (data) => {
      router.push("/community");
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
          Edit
        </Button>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </form>
    </Form>
  );
};

export default HostProfileForm;
