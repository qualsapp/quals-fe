import CommunityDetailsForm from "@/components/forms/CommunityDetailsForm";
import CommunityMembersForm from "@/components/forms/CommunityMembers";
import EventForm from "@/components/forms/EventForm";
import EventScheduleForm from "@/components/forms/EventScheduleForm";
import { Progress } from "@/components/ui/progress";
import Stepper from "@/components/ui/stepper";
import React from "react";

type Props = {
  params: { step: string };
};

type StepContent = {
  [key: string]: React.ReactNode;
};

const page = async (props: Props) => {
  const { step } = await props.params;

  const stepContent: StepContent = {
    "community-detail": <CommunityDetailsForm />,
    "community-schedule": <EventForm />,
    "community-members": <CommunityMembersForm />,
  };

  const curStep = Object.keys(stepContent).indexOf(step);
  const curStepTitle = Object.keys(stepContent)[curStep].split("-").join(" ");

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div className="text-center space-y-3">
        <Stepper
          steps={3}
          current={curStep + 1}
          wrapperClassName="w-[225px] mx-auto"
        />

        <p>
          Step {curStep + 1} of {Object.keys(stepContent).length}
        </p>
      </div>
      <p className="capitalize text-2xl font-bold text-center">
        {curStepTitle}
      </p>
      <div className="">
        <div className="w-full sm:w-2/3 mx-auto ">
          {stepContent[step as keyof StepContent]}
        </div>
      </div>
    </div>
  );
};

export default page;
