import BadmintonBoard from "@/components/score-boards/badminton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string; match_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { type } = await searchParams;

  console.log(id, type);

  return (
    <div className="container max-w-3xl mx-auto py-10 lg:py-16">
      <div className="flex flex-col space-y-6">
        <Link href={"/community/events/1/matches"} className="underline">
          <Button variant="gray" className="flex items-center">
            <ArrowLeft /> Back to Matches
          </Button>
        </Link>

        <BadmintonBoard />

        {/* <TennisBoard /> */}
      </div>
    </div>
  );
};

export default page;
