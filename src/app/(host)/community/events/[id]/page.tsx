import React from "react";
import Link from "next/link";
import { Edit2, Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { getEvent } from "@/actions/event";
import BackButton from "@/components/commons/back-button";
import EventNotFound from "@/components/event/event-not-found";
import LayoutHead from "@/components/event/layout-head";
import DeleteEventButton from "@/components/event/delete-event";
import DeleteTournamentButton from "@/components/event/delete-tournament";
import TournamentCard from "@/components/commons/tournament-card";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event || event.error || !event.id) {
    return <EventNotFound />;
  }

  const tournaments = event.tournaments || [];

  if (tournaments.length > 0) {
    redirect(`/community/events/${id}/tournaments/${tournaments[0].id}/matches`);
  }

  const tournamentsBase = `/community/events/${id}/tournaments`;
  const addHref = `/community/events/${id}/rules?type=${event.sport_type?.slug}`;

  return (
    <div className="py-10 md:py-16 space-y-10">
      <div className="container space-y-8">
        <BackButton
          href={`/community/events`}
          variant="link"
          label="Back to Community"
          className="!px-0"
        />
        <div className="flex flex-col lg:flex-row gap-5 justify-between">
          <LayoutHead event={event} />
          <div className="flex gap-3">
            <Link href={`/community/events/${id}/edit`}>
              <Button variant="outline" aria-label="Edit Event">
                <Edit2 />
              </Button>
            </Link>
            <DeleteEventButton eventId={id} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Tournaments</h3>
            <Link href={addHref}>
              <Button>
                <Plus className="h-4 w-4" /> Add Tournament
              </Button>
            </Link>
          </div>

          {tournaments.length === 0 ? (
            <div className="space-y-4 rounded-md border p-8 text-center">
              <p className="text-muted-foreground">
                No tournaments yet. Add one for each category, e.g.
                Men&apos;s Double or Women&apos;s Single.
              </p>
              <Link href={addHref}>
                <Button variant="outline">Create your first tournament</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {tournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  href={`${tournamentsBase}/${tournament.id}/matches`}
                  actions={
                    <>
                      <Link
                        href={`/community/events/${id}/rules?type=${event.sport_type?.slug}&tid=${tournament.id}`}
                      >
                        <Button variant="outline" aria-label="Edit Tournament">
                          <Edit2 />
                        </Button>
                      </Link>
                      <DeleteTournamentButton
                        tournamentId={String(tournament.id)}
                      />
                    </>
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
