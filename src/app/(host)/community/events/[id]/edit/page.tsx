import { getEvent } from "@/actions/event";
import { getSports } from "@/actions/sport";
import EventForm from "@/components/forms/EventForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  const { sport_types } = await getSports();

  const event = await getEvent(id);

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
          <p className="text-center">Update your event&apos;s details</p>
        </div>
        {event ? (
          <EventForm event={event} sports={sport_types} />
        ) : (
          <p>Event not found</p>
        )}
      </div>
    </div>
  );
};

export default page;
