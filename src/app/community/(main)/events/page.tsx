import EventLineup from "@/components/commons/event-lineup";
import EventFilterForm from "@/components/forms/EventFilterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { EventsResponse } from "@/types/events";
import { HostProfileModel } from "@/types/user";
import { ChevronDownIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import React from "react";

type Props = {};

const menus = [
  { label: "Event", href: "/community/events" },
  { label: "Members", href: "/community/members" },
  { label: "Statistic", href: "/community/statistic" },
];

const page = async (props: Props) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("community", token);

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const { events } = token
    ? await eventServices.getAll(community.id, token)
    : ({} as EventsResponse);

  return (
    <div className="container space-y-10">
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

      <div className="grid grid-cols-1 gap-0">
        {events.map((event) => (
          <Link
            href={`/community/events/${event.id}`}
            key={event.id}
            className="hover:bg-gray-100"
          >
            <EventLineup event={event} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
