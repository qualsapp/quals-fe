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
import { Input, InputPassword } from "../ui/input";

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
import { userService } from "@/services/user-service";
import { Button } from "../ui/button";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const RegisterScheme = z
  .object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(8, "Min 8 characters"),
    user_type: z.string().nonempty("Role is required"),
  })
  .superRefine(({ password, confirmPassword, user_type }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }

    if (user_type !== "player" && user_type !== "host") {
      ctx.addIssue({
        path: ["role"],
        code: "custom",
        message: "Role must be either 'player' or 'host'",
      });
    }
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterScheme>>({
    resolver: zodResolver(RegisterScheme),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      user_type: "",
    },
  });

  const loginInState = useAuthStore((state) => state.login);

  const { mutate, error } = useMutation({
    mutationFn: (data: z.infer<typeof RegisterScheme>) =>
      userService.register(data),
    onSuccess: (data) => {
      loginInState(data.token, data.user_id);
      router.push("/");
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterScheme>) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g., example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata Sandi</FormLabel>
              <FormControl>
                <InputPassword placeholder="Masukan kata sandi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <InputPassword
                  placeholder="Masukan kembali kata sandi Anda"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="player">Player</SelectItem>
                      <SelectItem value="host">Host</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="px-10"
          disabled={!form.formState.isValid}
        >
          Daftar
        </Button>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </form>
    </Form>
  );
};

export default RegisterForm;
