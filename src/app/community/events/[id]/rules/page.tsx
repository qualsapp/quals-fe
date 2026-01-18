import BadmintonRulesForm from "@/components/forms/BadmintonRulesForm";
import PadelRulesForm from "@/components/forms/PadelRulesForm";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

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
          <div className="text-center py-10 space-y-4 border rounded-md p-4">
            <p className="text-muted-foreground">
              Please select a sport type to configure rules.
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select sport type</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center">
                <DropdownMenuGroup>
                  <Link href="/community/events/123/rules?type=badminton">
                    <DropdownMenuItem>Badminton</DropdownMenuItem>
                  </Link>
                  <Link href="/community/events/123/rules?type=padel">
                    <DropdownMenuItem>Padel</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
