export const runtime = "edge";
import React from "react";

import CommunityDetailsForm from "@/components/forms/CommunityDetailsForm";
import Heading from "@/components/commons/heading";
import { communityService } from "@/services/community-service";

import { cookies } from "next/headers";

type Props = {};

const getCommunityById = async (id: string) => {
  const cookieStore = await cookies();
  return communityService.getById(id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieStore.get("token")?.value}`,
    },
  });
};

const page = async (props: Props) => {
  // const community = await getCommunityById("9");
  const community = {
    name: "Sport Amature",
    description: "Sport Amature",
    photo_url: "https://via.placeholder.com/150",
    address: "Sport Amature",
    sports: ["badminton", "padel"],
    id: "9",
  };

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <Heading
        title="Edit Community Details"
        description="Update the information about your community"
      />

      <div className="w-full sm:w-2/3 mx-auto ">
        <CommunityDetailsForm community={community} />
      </div>
    </div>
  );
};

export default page;
