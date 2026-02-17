import RegisterForm from "@/components/forms/RegisterForm";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Google } from "@/icons";
import Link from "next/link";
import React from "react";

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

        <Button variant="outline" size="lg" className="py-6">
          <Google />
          Google
        </Button>

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
