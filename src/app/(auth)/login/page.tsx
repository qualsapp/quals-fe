import LoginForm from "@/components/forms/LoginForm";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Google } from "@/icons";
import Link from "next/link";
import React from "react";

const page = () => {
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
          {/* <Divider /> */}
        </div>

        <Button variant="outline" size="lg" className="py-6">
          <Google />
          Google
        </Button>

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

export default page;
