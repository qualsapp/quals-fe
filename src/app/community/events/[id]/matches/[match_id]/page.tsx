import BadmintonBoard from "@/components/score-boards/badminton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import TennisBoard from "@/components/score-boards/tennis";

type Props = {};

const page = (props: Props) => {
  const hasStareted = false;

  return (
    <div className="container max-w-3xl mx-auto py-10 lg:py-16">
      <div className="flex flex-col space-y-6">
        <Link href={"/community/events/1/matches"} className="underline">
          <Button variant="gray" className="flex items-center">
            <ArrowLeft /> Back to Matches
          </Button>
        </Link>
        <BadmintonBoard />

        <TennisBoard />
      </div>
    </div>
  );
};

export default page;
