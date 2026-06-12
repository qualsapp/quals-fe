import React from "react";
import { getEvent } from "@/actions/event";
import BackButton from "@/components/commons/back-button";
import DashboardNav from "@/components/commons/dashboard-nav";
import EventNotFound from "@/components/event/event-not-found";
import LayoutActions from "@/components/event/layout-actions";
import LayoutHead from "@/components/event/layout-head";
import TabFilterBar from "@/components/event/tab-filter-bar";

type LayoutProps = {
  params: Promise<{ id: string; tid: string }>;
  children: React.ReactNode;
};

const layout = async ({ params, children }: LayoutProps) => {
  const { id, tid } = await params;

  const base = `/community/events/${id}/tournaments/${tid}`;
  const menus = [
    { label: "Matches", href: `${base}/matches` },
    { label: "Group", href: `${base}/group` },
    { label: "Playoff", href: `${base}/playoff` },
    // Shown for every tournament; the page is read-only for AUTO mode and
    // editable (add/remove) for MANUAL mode.
    { label: "Participants", href: `${base}/participants` },
  ];

  const event = await getEvent(id);

  // getEvent returns a truthy fallback ({ id: "", error }) when the fetch fails,
  // so `!event` alone misses it — rendering a broken page whose action links use
  // an empty id. Treat a missing/empty event as not-found.
  if (!event || event.error || !event.id) {
    return <EventNotFound />;
  }

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-4">
        <div className="mb-2">
          <BackButton
            href={`/community/events/${id}`}
            variant="link"
            label="Back to Event"
            className="!px-0"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <LayoutHead event={event} />
          <LayoutActions
            event={event}
            tournamentId={tid}
            addHref={`/community/events/${id}/rules?type=${event.sport_type?.slug}`}
          />
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>

      <div className="container">
        <TabFilterBar
          tournaments={event.tournaments || []}
          activeId={tid}
          basePath={`/community/events/${id}/tournaments`}
        />
      </div>

      {children}
    </div>
  );
};

export default layout;
