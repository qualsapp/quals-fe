import { getEvent } from "@/actions/event";
import BackButton from "@/components/commons/back-button";
import DashboardNav from "@/components/commons/dashboard-nav";
import EventNotFound from "@/components/event/event-not-found";
import LayoutHead from "@/components/event/layout-head";
import TabFilterBar from "@/components/event/tab-filter-bar";
import React from "react";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

const layout = async ({ params, children }: LayoutProps) => {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event || event.error || !event.id) {
    return <EventNotFound />;
  }

  const hasGroupStage = (event.tournaments || []).some(
    (t) => t.format === "group_stage",
  );

  const base = `/events/${id}`;
  const menus = [
    { label: "Matches", href: `${base}/matches` },
    ...(hasGroupStage ? [{ label: "Group", href: `${base}/group` }] : []),
    { label: "Playoff", href: `${base}/playoff` },
  ];

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-4">
        <BackButton
          href="/events"
          variant="link"
          label="Back to Events"
          className="!px-0"
        />
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
          <LayoutHead event={event} />
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>

      <div className="container">
        <TabFilterBar tournaments={event.tournaments || []} />
      </div>

      {children}
    </div>
  );
};

export default layout;
