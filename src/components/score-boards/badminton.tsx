"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRightLeft } from "lucide-react";
import Shuttlecock from "@/icons/shuttlecock";
import useFullScreen from "@/hooks/use-full-screen";
import { cn } from "@/lib/utils";
import { getMatch, updateMatchSet } from "@/actions/match";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import FirstServisForm from "../forms/FirstServisForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const BadmintonBoard = () => {
  const { ref, isFullscreen, goFullscreen, exitFullscreen } = useFullScreen();
  const [open, setOpen] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);

  const params = useParams();
  const searchParams = useSearchParams();

  const onGetMatch = useCallback(async () => {
    const match = await getMatch(String(params.match_id));
    if (!match.error && (match.match_sets?.length == 0 || !match.match_sets)) {
      setOpen(true);
    }

    // if match is finished
    if (
      !match.error &&
      match.match_sets?.every((set) => set.is_finished) &&
      !match.winner
    ) {
      setOpen(true);
    }

    // if end game
    if (match.winner) {
      setEndGame(true);
    }

    return match;
  }, [params.match_id]);

  const {
    data: match,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["match", params.match_id],
    queryFn: onGetMatch,
  });

  const matchSetMutation = async (server: string, currentSetId?: number) => {
    if (!match?.id) return;

    const updatedSet = await updateMatchSet(
      String(match?.id),
      String(currentSetId),
      {
        point_winner: server,
      },
    );

    if (!updatedSet.error) {
      refetch();
    }
  };

  const curSet = useMemo(() => {
    if (!match?.match_sets || !searchParams.get("set_id")) return undefined;

    const currentset = match?.match_sets?.find(
      (set) => set.id == Number(searchParams.get("set_id")),
    );

    if (currentset) {
      return currentset;
    }
  }, [match?.match_sets, searchParams]);

  const setScore = useMemo(() => {
    let score_a = 0;
    let score_b = 0;

    match?.match_sets?.forEach((set) => {
      if (set.is_finished) {
        if (set.score_a > set.score_b) {
          score_a += 1;
        } else {
          score_b += 1;
        }
      }
    });

    return {
      score_a,
      score_b,
    };
  }, [match?.match_sets]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center",
          isFullscreen && "w-[100vw] h-[100vh] fixed inset-0 z-50 bg-white",
        )}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center",
        isFullscreen && "w-[100vw] h-[100vh] fixed inset-0 z-50 bg-white",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          isFullscreen && "w-[100vw] h-[100vh]",
        )}
      >
        <div className="flex border-4 border-primary-100 w-full">
          <div className="w-full">
            <p className="bg-primary text-secondary border-3 border-primary-100 text-2xl font-bold text-center">
              {match?.participant_a?.name}
            </p>
            <div className="relative flex border-3 border-primary-100 bg-primary text-secondary items-center h-[200px] md:h-[300px]">
              <div
                className="grow text-4xl md:text-7xl font-bold text-center cursor-pointer"
                onClick={() =>
                  matchSetMutation(
                    "participant_a",
                    Number(searchParams.get("set_id")),
                  )
                }
              >
                {curSet?.score_a || 0}
              </div>
              <div className="flex flex-col h-full">
                <Button
                  className="rounded-none border border-secondary grow px-5 md:px-10 text-2xl md:text-4xl"
                  size="lg"
                >
                  {setScore.score_a}
                </Button>

                <Button
                  variant="destructive"
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl"
                  size="lg"
                >
                  -
                </Button>
              </div>
              {curSet?.current_server === "participant_a" && (
                <div className="absolute top-3 left-3">
                  <Shuttlecock />
                </div>
              )}
            </div>
          </div>
          <div className="border border-secondary w-full">
            <p className="bg-secondary text-primary border-3 border-primary-100 text-2xl font-bold text-center">
              {match?.participant_b?.name}
            </p>
            <div className="relative flex border-3 border-primary-100 bg-secondary text-primary items-center h-[200px] md:h-[300px]">
              <div className="flex flex-col h-full">
                <Button
                  variant="secondary"
                  className="rounded-none border border-primary grow px-5 md:px-10 text-2xl md:text-4xl text-primary"
                >
                  {setScore.score_b}
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl"
                >
                  -
                </Button>
              </div>
              <p
                className="grow font-bold text-center text-4xl md:text-7xl cursor-pointer"
                onClick={() =>
                  matchSetMutation(
                    "participant_b",
                    Number(searchParams.get("set_id")),
                  )
                }
              >
                {curSet?.score_b || 0}
              </p>

              {curSet?.current_server === "participant_b" && (
                <div className="absolute top-3 right-3">
                  <Shuttlecock />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Button variant="outline" size="lg" aria-label="Switch Court">
            <ArrowRightLeft />
          </Button>

          {!isFullscreen && <Button onClick={goFullscreen}>Enter</Button>}
        </div>
      </div>
      {match && (
        <FirstServisForm
          participant_a={match?.participant_a?.name}
          participant_b={match?.participant_b?.name}
          open={open}
          setOpen={setOpen}
          matchId={match?.id}
          refetch={refetch}
        />
      )}
      {match?.winner && (
        <Dialog open={endGame} onOpenChange={setEndGame}>
          <DialogContent>
            <DialogHeader className="flex flex-col items-center gap-4">
              <DialogTitle className="text-2xl font-bold text-center">
                Game Over
              </DialogTitle>
              <p className="text-2xl font-bold text-center text-primary">
                Winner: {match?.winner?.name}
              </p>

              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={() => {
                    setEndGame(false);
                    exitFullscreen();
                    redirect(`/community/events/${params.id}/matches`);
                  }}
                  variant="outline"
                >
                  Exit
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BadmintonBoard;
