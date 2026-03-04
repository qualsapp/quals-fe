import LoginForm from "@/components/forms/LoginForm";
import { Divider } from "@/components/ui/divider";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  return (
    <div className="container py-10 md:py-16 ">
      <div className="flex flex-col space-y-8 lg:w-1/3 mx-auto ">
        <h2 className="text-2xl text-center font-bold">Masuk</h2>

        <LoginForm />

        <Link
          href="/forgot-password"
          className="text-primary font-semibold text-sm text-center block"
        >
          Lupa kata sandi?
        </Link>
        <div className="flex items-center gap-2">
          <Divider />
          <div className="flex-1 text-sm text-gray-400">
            <p>atau&nbsp;lanjutkan&nbsp;dengan</p>
          </div>
          <Divider />
        </div>

        <Tabs defaultValue={"player"} className="w-full ">
          <TabsList className="mx-auto">
            <TabsTrigger value="player">Player</TabsTrigger>
            <TabsTrigger value="host">Host</TabsTrigger>
          </TabsList>
          <TabsContent value="player">
            <div className="flex justify-center py-6">
              <GoogleLoginButton userType="player" />
            </div>
          </TabsContent>
          <TabsContent value="host">
            <div className="flex justify-center py-6">
              <GoogleLoginButton userType="host" />
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-center">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
