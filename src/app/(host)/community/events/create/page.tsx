import { getSports } from "@/actions/sport";
import EventForm from "@/components/forms/EventForm";
import React from "react";

const page = async () => {
  const { sport_types } = await getSports();
  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">Events</h2>
        <p className="text-center">
          Add your community&apos;s regular events and schedule
        </p>
      </div>
      <div className="">
        <div className="w-full sm:w-2/3 mx-auto ">
          <EventForm sports={sport_types} />
        </div>
      </div>
    </div>
  );
};

export default page;
