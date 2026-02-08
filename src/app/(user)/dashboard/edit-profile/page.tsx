import ProfileForm from "@/components/forms/ProfileForm";
import { cookies } from "next/headers";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const player = token
    ? await userServices.getDetail(token)
    : ({} as PlayerDetailResponse);
  return (
    <div className=" py-10 md:py-16 space-y-10 max-w-xl mx-auto">
      <div className="container space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
          <p className="text-center text-muted-foreground">
            Update your personal information and preferences
          </p>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
};

export default page;
