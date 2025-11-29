import DashboardNav from "@/components/commons/dashboard-nav";
import MatchCard from "@/components/commons/match-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import React from "react";

type Props = {};

const menus = [
  { label: "Matches", href: `/community/events/123/matches` },
  { label: "Group", href: `/community/events/123/group` },
  { label: "Playoff", href: `/community/events/123/playoff` },
];

const page = (props: Props) => {
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex flex-col lg:flex-row gap-5 justify-between">
        <div className="space-y-3">
          <h2 className="text-lg font-bold">Quals OPEN 2025</h2>
          <Badge variant="gray" className="font-bold ">
            9 Oct - 12 Oct
          </Badge>
          <p>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum
          </p>

          <p>Detail Event here</p>
        </div>
        <div className="flex gap-3 lg:flex-col">
          <Button variant="outline">Edit Event</Button>
          <Button variant="destructive">Delete Event</Button>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} currentMenu="matches" />
        </div>
      </div>

      <div className="container space-y-10 flex flex-col items-center">
        <h3 className="text-xl font-bold">Court 1</h3>
        {Array.from({ length: 5 }).map((_, index) => (
          <MatchCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
