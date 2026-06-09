import React from "react";
import { getEvent } from "@/actions/event";
import { getPlayerDetails } from "@/actions/player";
import EventNotFound from "@/components/event/event-not-found";
import LayoutHead from "@/components/event/layout-head";
import JoinEvent from "@/components/event/join-event";
import TournamentCard from "@/components/commons/tournament-card";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const { id: playerId } = await getPlayerDetails();
  const event = await getEvent(id);

  if (!event || event.error || !event.id) {
    return <EventNotFound />;
  }

  const tournaments = event.tournaments || [];
  const tournamentsBase = `/events/${id}/tournaments`;

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-8">
        <LayoutHead event={event} />

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Tournaments</h3>

          {tournaments.length === 0 ? (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              No tournaments yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {tournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  href={`${tournamentsBase}/${tournament.id}/matches`}
                  actions={
                    playerId ? (
                      <JoinEvent
                        tournament={tournament}
                        playerId={String(playerId)}
                      />
                    ) : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
