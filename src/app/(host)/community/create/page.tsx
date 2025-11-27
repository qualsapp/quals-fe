"use client";
import React from "react";

import FormStep from "@/components/community/FormStep";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container py-10 lg:py-16 lg:w-1/2 space-y-8">
      <FormStep />
    </div>
  );
};

export default page;
