import RegisterForm from "@/components/forms/RegisterForm";
import { Divider } from "@/components/ui/divider";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="container py-10 md:py-16 ">
      <div className="flex flex-col space-y-8 lg:w-1/3 mx-auto ">
        <h2 className="text-2xl text-center font-bold">Daftar</h2>
        <RegisterForm />

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
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
