import EventFilterForm from "@/components/forms/EventFilterForm";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import React from "react";

const page = () => {
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-10">
        <div className="flex justify-between">
          <EventFilterForm />

          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Community Only</Label>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 gap-0">
          {["live", "next", "completed", "completed", "completed"].map(
            (type, index) => (
              <EventLineup type={type} key={index} />
            ),
          )}
        </div> */}
      </div>
    </div>
  );
};

export default page;
