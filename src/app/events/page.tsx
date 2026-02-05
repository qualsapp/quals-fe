import EventLineup from "@/components/commons/event-lineup";
import PlayerEventList from "@/components/event/player-event-list";
import EventFilterForm from "@/components/forms/EventFilterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { communityService } from "@/services/community-service";
import { eventServices } from "@/services/event-services";
import { EventsResponse } from "@/types/events";
import { ChevronDownIcon } from "lucide-react";

import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { events } = token
    ? await eventServices.getAllPublic(token)
    : ({} as EventsResponse);

  return (
    <div className="container space-y-10 my-10">
      <h2 className="text-2xl font-bold text-center">Quals Events</h2>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="mx-auto w-full max-w-sm py- md:py-2 md:hidden">
          <CardContent className="px-3 md:px-2">
            <Collapsible className="rounded-md">
              <CollapsibleTrigger asChild>
                <Button variant="text" className="group w-full">
                  Filter
                  <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <EventFilterForm />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <div className="hidden md:block">
          <EventFilterForm />
        </div>

        <Link href="/community/events/create">
          <Button>Buat Event</Button>
        </Link>
      </div>

      <PlayerEventList events={events} />
    </div>
  );
};

export default page;
