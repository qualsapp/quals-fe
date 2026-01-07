import BadmintonRulesForm from "@/components/forms/BadmintonRulesForm";
import PadelRulesForm from "@/components/forms/PadelRulesForm";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">Rules</h2>
        <p className="text-center">Define the rules for your event</p>
      </div>
      <div className="w-full sm:w-2/3 mx-auto">
        {type === "badminton" && <BadmintonRulesForm />}
        {type === "padel" && <PadelRulesForm />}
        {!type && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Please select a sport type to configure rules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
