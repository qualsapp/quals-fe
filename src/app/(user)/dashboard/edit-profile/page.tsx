import React from "react";
import { getPlayerDetails } from "@/actions/player";
import { getSports } from "@/actions/sport";
import ProfileForm from "@/components/forms/ProfileForm";

type Props = {};

const page = async (props: Props) => {
  const player = await getPlayerDetails();

  const { sport_types } = await getSports();
  return (
    <div className=" py-10 md:py-16 space-y-10 max-w-xl mx-auto">
      <div className="container space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
          <p className="text-center text-muted-foreground">
            Update your personal information and preferences
          </p>
        </div>

        <ProfileForm sports={sport_types} data={player} />
      </div>
    </div>
  );
};

export default page;
