import { getEvent } from "@/actions/event";
import { getHostProfile } from "@/actions/host";
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

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;

  const search = await searchParams;
  const type = typeof search.type === "string" ? search.type : undefined;

  const { community } = await getHostProfile();

  if (!community) {
    return <div>Community not found</div>;
  }

  const event = await getEvent(id);

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">Rules</h2>
        <p className="text-center">Define the rules for your event</p>
      </div>
      <div className="w-full sm:w-2/3 mx-auto">
        {type === "badminton" && (
          <BadmintonRulesForm eventId={id} tournament={event.tournament} />
        )}
        {type === "padel" && (
          <PadelRulesForm eventId={id} tournament={event.tournament} />
        )}
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
                  <Link href={`/community/events/${id}/rules?type=badminton`}>
                    <DropdownMenuItem>Badminton</DropdownMenuItem>
                  </Link>
                  <Link href={`/community/events/${id}/rules?type=padel`}>
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
};

export default page;
