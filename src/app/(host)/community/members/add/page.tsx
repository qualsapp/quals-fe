import CommunityMembersForm from "@/components/forms/CommunityMembers";
import MembersForm from "@/components/forms/MembersForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">
          Add Community Members
        </h2>
        <p className="text-center">
          Add your community members with their skill levels
        </p>
      </div>
      <div className="">
        <div className="w-full sm:w-2/3 mx-auto ">
          <MembersForm />
        </div>
      </div>
    </div>
  );
};

export default page;
