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
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";

import { UserRole } from "@/types/user";

const RegisterScheme = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string().min(8, "Min 8 characters"),
    user_type: z.enum(["player", "host", "admin"]),
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
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterScheme>>({
    resolver: zodResolver(RegisterScheme),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      user_type: "player" as UserRole,
    },
  });

  const loginInState = useAuthStore((state) => state.login);

  const onSubmit = (data: z.infer<typeof RegisterScheme>) => {
    startTransition(async () => {
      const { error, token } = await register(data);

      setError(error);
      if (token) {
        loginInState(data, token);
        if (data.user_type === "player") {
          router.push("/player-details");
        } else if (data.user_type === "host") {
          router.push("/host-details");
        } else if (data.user_type === "admin") {
          router.push("/admin");
        }
      }
    });
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
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? "Loading..." : "Daftar"}
        </Button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default RegisterForm;
