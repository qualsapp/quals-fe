import { getHostProfile } from "@/actions/host";
import { getTournament } from "@/actions/tournament";
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

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string; tid?: string }>;
};

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;

  const search = await searchParams;
  const type = typeof search.type === "string" ? search.type : undefined;
  const tid = typeof search.tid === "string" ? search.tid : undefined;

  const { community } = await getHostProfile();

  if (!community) {
    return <div>Community not found</div>;
  }

  // With a `tid` we edit an existing tournament; without it we create a new one.
  const tournament = tid ? await getTournament(tid) : undefined;

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div>
        <div>
          <Link href={`/community/events/${id}`} className="underline">
            <Button variant="text" className="flex items-center">
              <ArrowLeft /> Back to Event
            </Button>
          </Link>
        </div>
        <h2 className="capitalize text-2xl font-bold text-center">
          {tid ? "Edit Tournament" : "New Tournament"}
        </h2>
        <p className="text-center">
          Define the rules for this tournament. An event can have multiple
          tournaments (e.g. Men&apos;s Double, Women&apos;s Single).
        </p>
      </div>
      <div className="w-full sm:w-2/3 mx-auto">
        {type === "badminton" && (
          <BadmintonRulesForm eventId={id} tournament={tournament} />
        )}
        {type === "padel" && (
          <PadelRulesForm eventId={id} tournament={tournament} />
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
                    <DropdownMenuItem>padel</DropdownMenuItem>
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
