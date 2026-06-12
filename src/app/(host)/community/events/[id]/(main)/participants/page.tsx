import Link from "next/link";
import { Settings2 } from "lucide-react";

import { getTournament, getTournamentParticipants } from "@/actions/tournament";
import { getEvent } from "@/actions/event";
import ParticipantsManager from "@/components/participant/participants-manager";
import { Button } from "@/components/ui/button";
import DeleteTournamentButton from "@/components/event/delete-tournament";

import { TournamentResponse } from "@/types/tournament";
import { FilterParams } from "@/types/global";

import React from "react";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<FilterParams & { tournament?: string }>;
};

const tournamentLabel = (t: TournamentResponse) =>
  t.name || `${t.category} ${t.format?.replace(/_/g, " ")}`.trim();

const perSlot = (category: string) =>
  category === "double" || category === "mixed" ? 2 : 1;

const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { tournament } = await searchParams;

  const event = await getEvent(id);
  const tournaments = event?.tournaments || [];
  const sportSlug = event?.sport_type?.slug;

  const isSingleMode = tournament && tournament !== "all";

  if (!isSingleMode) {
    const groups = await Promise.all(
      tournaments.map(async (t) => {
        const participantsResponse = await getTournamentParticipants(
          String(t.id),
          { page: 1, page_size: 100 },
        );
        const slots = perSlot(t.category);
        const max = Math.floor(Number(t.participants_count) / slots);
        return {
          tournament: t,
          participants: participantsResponse.participants || [],
          max,
        };
      }),
    );

    return (
      <div className="container flex flex-col gap-12 py-10 md:py-16">
        {groups.map(({ tournament, participants, max }) => {
          const rulesHref = `/community/events/${id}/rules?type=${sportSlug}&tid=${tournament.id}`;
          return (
            <div key={tournament.id} className="space-y-4">
              <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                <h2 className="text-xl font-bold capitalize">
                  {tournamentLabel(tournament)}
                </h2>
                <div className="flex gap-2">
                  <Link href={rulesHref}>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Edit Tournament Rules"
                    >
                      <Settings2 />
                    </Button>
                  </Link>
                  <DeleteTournamentButton
                    tournamentId={String(tournament.id)}
                    redirectTo={`/community/events/${id}/matches`}
                  />
                </div>
              </div>
              <ParticipantsManager
                tournamentId={String(tournament.id)}
                category={tournament.category}
                participants={participants}
                maxParticipants={max}
                editable={false}
              />
            </div>
          );
        })}
      </div>
    );
  }

  const tournamentData = await getTournament(tournament);

  if (!tournamentData?.id || tournamentData.error) {
    return <div className="container py-10 md:py-16">No tournament found</div>;
  }

  const editable = tournamentData.mode === "MANUAL";

  const participantsResponse = await getTournamentParticipants(
    String(tournamentData.id),
    { page: 1, page_size: 100 },
  );

  const slots = perSlot(tournamentData.category);
  const maxParticipants = Math.floor(
    Number(tournamentData.participants_count) / slots,
  );

  const rulesHref = `/community/events/${id}/rules?type=${sportSlug}&tid=${tournament}`;

  return (
    <div className="container py-10 md:py-16 space-y-6">
      <div className="flex items-center justify-between border-b-2 border-primary pb-2">
        <h2 className="text-xl font-bold capitalize">
          {tournamentLabel(tournamentData)}
        </h2>
        <div className="flex gap-2">
          <Link href={rulesHref}>
            <Button
              variant="outline"
              size="icon"
              aria-label="Edit Tournament Rules"
            >
              <Settings2 />
            </Button>
          </Link>
          <DeleteTournamentButton
            tournamentId={tournament}
            redirectTo={`/community/events/${id}/matches`}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ParticipantsManager
          tournamentId={String(tournamentData.id)}
          category={tournamentData.category}
          participants={participantsResponse.participants || []}
          maxParticipants={maxParticipants}
          editable={editable}
        />
      </div>
    </div>
  );
};

export default page;
