import EventForm from "@/components/forms/EventForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">Events</h2>
        <p className="text-center">
          Add your community's regular events and schedule
        </p>
      </div>
      <div className="">
        <div className="w-full sm:w-2/3 mx-auto ">
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default page;
