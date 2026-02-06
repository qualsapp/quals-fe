import EventForm from "@/components/forms/EventForm";
import { Button } from "@/components/ui/button";
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { EventResponse } from "@/types/events";
import { HostProfileModel } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const event = token
    ? await eventServices.getById(id, token)
    : ({} as EventResponse);

  return (
    <div className="container lg:py-16 py-8 space-y-10">
      <div className="w-full sm:w-2/3 mx-auto space-y-6 ">
        <div>
          <div>
            <Link
              href={`/community/events/${id}/matches`}
              className="underline"
            >
              <Button variant="text" className="flex items-center">
                <ArrowLeft /> Back to Event
              </Button>
            </Link>
          </div>
          <h2 className="capitalize text-2xl font-bold text-center">Events</h2>
          <p className="text-center">Update your event's details</p>
        </div>
        <EventForm
          communityId={community.id}
          event={{ ...event, event_type: "tournament" }}
        />
      </div>
    </div>
  );
};

export default page;
