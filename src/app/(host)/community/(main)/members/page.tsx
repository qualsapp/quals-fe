import MemberCard from "@/components/commons/member-card";
import React from "react";

const page = () => {
  return (
    <div className="container space-y-10">
      {/* <div className="flex justify-between">
        <MemberFilterForm />

        <Link href="/">
          <Button>Add Member</Button>
        </Link>
      </div> */}

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
