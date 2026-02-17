import MemberCard from "@/components/commons/member-card";
import MemberFilterForm from "@/components/forms/MemberFilterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container space-y-10">
      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold">Member Management</h2>
        <div className="grid lg:grid-cols-4">
          <div className="text-xl text-center">
            <p>45</p>
            <p>Total Members</p>
          </div>
          <div className="text-xl text-center">
            <p>28</p>
            <p>Active This Week</p>
          </div>
          <div className="text-xl text-center">
            <p>6</p>
            <p>New This Month</p>
          </div>
          <div className="text-xl text-center">
            <p>12</p>
            <p>Premium Members</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <MemberFilterForm />

        <Link href="/">
          <Button>Add Member</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {
          /* Member List */
          Array.from({ length: 8 }).map((_, idx) => (
            <MemberCard key={idx} />
          ))
        }
      </div>
    </div>
  );
};

export default page;
