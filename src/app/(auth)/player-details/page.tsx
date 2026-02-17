import { getSports } from "@/actions/sport";
import ProfileForm from "@/components/forms/ProfileForm";
import React from "react";

const page = async () => {
  const { sport_types } = await getSports();

  return (
    <div className=" py-10 md:py-16 space-y-10 max-w-xl mx-auto">
      <div className="container space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-center">
            Complete Your Profile
          </h2>
          <p className="text-center text-muted-foreground">
            Complete your personal information and preferences
          </p>
        </div>

        <ProfileForm sports={sport_types} />
      </div>
    </div>
  );
};

export default page;
