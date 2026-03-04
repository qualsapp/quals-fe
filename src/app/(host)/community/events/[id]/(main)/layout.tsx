import React from "react";
import Link from "next/link";
import { getEvent } from "@/actions/event";
import BackButton from "@/components/commons/back-button";
import DashboardNav from "@/components/commons/dashboard-nav";
import EventNotFound from "@/components/event/event-not-found";
import LayoutActions from "@/components/event/layout-actions";
import LayoutHead from "@/components/event/layout-head";
import { Button } from "@/components/ui/button";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

const page = async ({ params, children }: LayoutProps) => {
  const { id } = await params;
  const menus = [
    { label: "Matches", href: `/community/events/${id}/matches` },
    { label: "Group", href: `/community/events/${id}/group` },
    { label: "Playoff", href: `/community/events/${id}/playoff` },
  ];

  const event = await getEvent(id);

  if (!event) {
    return <EventNotFound />;
  }

  if (
    String(event.tournament?.id) === "0" &&
    event.event_type === "tournament"
  ) {
    return (
      <div className=" py-10 md:py-16 space-y-10">
        <div className="container">
          <div className="mb-2">
            <BackButton
              href={`/community/events`}
              variant="link"
              label="Back to Community"
              className="!px-0"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-5 justify-between">
            <LayoutHead event={event} />
            <LayoutActions event={event} />
          </div>
        </div>

        <p>No Tournament found</p>
        <Link
          href={`/community/events/${id}/rules?type=${event.sport_type.slug}`}
        >
          <Button variant="outline">Create Tournament Rules</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container">
        <div className="mb-2">
          <BackButton
            href={`/community/events`}
            variant="link"
            label="Back to Community"
            className="!px-0"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <LayoutHead event={event} />
          <LayoutActions event={event} />
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default page;
