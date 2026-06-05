import { getHostDetails } from "@/actions/host";
import HostProfileForm from "@/components/forms/HostProfileForm";
import React from "react";

export const config = {
  bodyParser: false,
};

const page = async () => {
  const host = await getHostDetails();

  return (
    <div className=" py-10 md:py-16 space-y-10 max-w-xl mx-auto">
      <div className="container space-y-10">
        {host ? (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-center">
              Complete Your Profile
            </h2>
            <p className="text-center text-muted-foreground">
              Complete your personal information and preferences
            </p>
          </div>
        )}

        <HostProfileForm host={host} />
      </div>
    </div>
  );
};

export default page;
