import { getEvent } from "@/actions/event";
import { getPlayerDetails } from "@/actions/player";
import DashboardNav from "@/components/commons/dashboard-nav";
import EventNotFound from "@/components/event/event-not-found";
import JoinEvent from "@/components/event/join-event";
import LayoutHead from "@/components/event/layout-head";
import React from "react";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

const page = async ({ params, children }: LayoutProps) => {
  const { id } = await params;

  const { id: playerId } = await getPlayerDetails();

  if (!playerId) {
    return (
      <div className=" py-10 md:py-16 space-y-10">
        <div className="container flex flex-col lg:flex-row gap-5 justify-between">
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Player not found</h2>
          </div>
        </div>
      </div>
    );
  }

  const menus = [
    { label: "Matches", href: `/events/${id}/matches` },
    { label: "Group", href: `/events/${id}/group` },
    { label: "Playoff", href: `/events/${id}/playoff` },
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
        <div className="container flex flex-col lg:flex-row gap-5 justify-between">
          <LayoutHead event={event} />
          <div className="flex gap-3 lg:flex-col">
            <JoinEvent event={event} playerId={playerId} />
          </div>
        </div>

        <p>No Tournament found</p>
      </div>
    );
  }

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex flex-col lg:flex-row gap-5 justify-between items-center">
        <LayoutHead event={event} />
        <div className="flex gap-3 lg:flex-col">
          <JoinEvent event={event} playerId={playerId} />
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
