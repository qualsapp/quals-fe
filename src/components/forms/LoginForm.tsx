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
import { Input, InputPassword } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/user-service";
import { useRouter } from "next/navigation";

const LoginScheme = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginScheme>>({
    resolver: zodResolver(LoginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginInState = useAuthStore((state) => state.login);

  const { mutate, error } = useMutation({
    mutationFn: (data: z.infer<typeof LoginScheme>) => userService.login(data),
    onSuccess: (data) => {
      loginInState(data.token, data.user_id);
      router.push("/");
    },
  });

  const onSubmit = (data: z.infer<typeof LoginScheme>) => {
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
        {/* <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Checkbox
                  id="remember"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                />
              </FormControl>
              <FormLabel htmlFor="remember">Ingat saya</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="text-center">
          <Button type="submit" className="px-10">
            Masuk
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
