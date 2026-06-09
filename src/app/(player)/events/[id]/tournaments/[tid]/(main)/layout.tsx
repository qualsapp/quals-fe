import { getEvent } from "@/actions/event";
import { getPlayerDetails } from "@/actions/player";
import BackButton from "@/components/commons/back-button";
import DashboardNav from "@/components/commons/dashboard-nav";
import EventNotFound from "@/components/event/event-not-found";
import JoinEvent from "@/components/event/join-event";
import LayoutHead from "@/components/event/layout-head";
import TournamentSwitcher from "@/components/event/tournament-switcher";
import React from "react";

type LayoutProps = {
  params: Promise<{ id: string; tid: string }>;
  children: React.ReactNode;
};

const layout = async ({ params, children }: LayoutProps) => {
  const { id, tid } = await params;

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

  const base = `/events/${id}/tournaments/${tid}`;
  const menus = [
    { label: "Matches", href: `${base}/matches` },
    { label: "Group", href: `${base}/group` },
    { label: "Playoff", href: `${base}/playoff` },
  ];

  const event = await getEvent(id);

  // getEvent returns a truthy fallback ({ id: "", error }) when the fetch fails,
  // so `!event` alone misses it — rendering a broken page whose links use an
  // empty id. Treat a missing/empty event as not-found.
  if (!event || event.error || !event.id) {
    return <EventNotFound />;
  }

  const tournaments = event.tournaments || [];
  const activeTournament = tournaments.find((t) => String(t.id) === tid);

  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container space-y-4">
        <BackButton
          href={`/events/${id}`}
          variant="link"
          label="Back to Event"
          className="!px-0"
        />
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
          <LayoutHead event={event} />
          <div className="flex gap-3 lg:flex-col">
            {activeTournament && (
              <JoinEvent
                tournament={activeTournament}
                playerId={String(playerId)}
              />
            )}
          </div>
        </div>
        <TournamentSwitcher
          tournaments={tournaments}
          activeId={tid}
          basePath={`/events/${id}/tournaments`}
        />
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

export default layout;
