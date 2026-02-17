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
import { Input, InputPassword } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { login } from "@/actions/auth";

import { UserRole } from "@/types/user";

const LoginScheme = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
  user_type: z.enum(["player", "host", "admin"]),
});

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const loginInState = useAuthStore((state) => state.login);

  const form = useForm<z.infer<typeof LoginScheme>>({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: "",
      password: "",
      user_type: "player" as UserRole,
    },
  });

  const onSubmit = (data: z.infer<typeof LoginScheme>) => {
    startTransition(async () => {
      const { error, token } = await login(data);

      if (error) {
        setError(error);
        return;
      } else if (token) {
        loginInState(data, token);

        if (data.user_type === "player") {
          router.push("/dashboard?welcome=true");
        } else if (data.user_type === "host") {
          router.push("/community/events?welcome=true");
        } else if (data.user_type === "admin") {
          router.push("/admin?welcome=true");
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
        <div className="text-center">
          <Button disabled={isPending} type="submit" className="px-10">
            {isPending ? "Loading..." : "Masuk"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </Form>
  );
};

export default LoginForm;
