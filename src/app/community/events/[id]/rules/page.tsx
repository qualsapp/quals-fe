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
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { EventResponse } from "@/types/events";
import { HostProfileModel } from "@/types/user";
import { cookies } from "next/headers";

import Link from "next/link";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { id } = await params;

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const event = token
    ? await eventServices.getById(community.id, id, token)
    : ({} as EventResponse);

  const search = await searchParams;
  const type = typeof search.type === "string" ? search.type : undefined;

  if (!id) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <h2 className="capitalize text-2xl font-bold text-center">Rules</h2>
        <p className="text-center">Define the rules for your event</p>
      </div>
      <div className="w-full sm:w-2/3 mx-auto">
        {type === "badminton" && (
          <BadmintonRulesForm communityId={community.id} eventId={id} />
        )}
        {type === "padel" && (
          <PadelRulesForm communityId={community.id} eventId={id} />
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
