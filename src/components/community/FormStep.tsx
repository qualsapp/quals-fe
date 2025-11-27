"use client";
import React, { useState } from "react";
import Stepper from "../ui/stepper";

import CommunityDetailsForm from "../forms/CommunityDetailsForm";
import EventScheduleForm from "../forms/EventScheduleForm";
import CommunityMembersForm from "../forms/CommunityMembers";

type Props = {};

const STEPS: string[] = [
  "Community Details",
  "Event Schedules",
  "Community Members",
];

const FormStep = (props: Props) => {
  const [curStep, setCurStep] = useState<number>(0);

  const onNext = (step: number) => {
    setCurStep(step - 1);
  };

  const components = {
    0: <CommunityDetailsForm onNext={onNext} />,
    1: <EventScheduleForm onNext={onNext} />,
    2: <CommunityMembersForm />,
  };

  return (
    <div className="text-center space-y-3">
      <Stepper
        steps={3}
        current={curStep + 1}
        wrapperClassName="w-[225px] mx-auto"
      />

      <p>
        Step {curStep + 1} of {STEPS.length}:&nbsp;{STEPS[curStep]}
      </p>

      {components[curStep as keyof typeof components]}
    </div>
  );
};

export default FormStep;
