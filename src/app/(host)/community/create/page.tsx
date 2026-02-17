import React from "react";

import CommunityDetailsForm from "@/components/forms/CommunityDetailsForm";
import Heading from "@/components/commons/heading";
import { getSports } from "@/actions/sport";

const page = async () => {
  const sports = await getSports();
  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <Heading
        title="Community Details"
        description="Let's start with basic information about your community"
      />

      <div className="w-full sm:w-2/3 mx-auto ">
        <CommunityDetailsForm sports={sports.sport_types} />
      </div>
    </div>
  );
};

export default page;
