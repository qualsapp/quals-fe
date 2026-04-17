"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRightLeft } from "lucide-react";
import Shuttlecock from "@/icons/shuttlecock";
import useFullScreen from "@/hooks/use-full-screen";
import { cn } from "@/lib/utils";
import {
  activeDeuceApi,
  decreaseMatchScore,
  getMatch,
  updateMatchSet,
} from "@/actions/match";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import FirstServisForm from "../forms/FirstServisForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import WinnerDecider from "../forms/WinnerDecider";

const BadmintonBoard = () => {
  const { ref, isFullscreen, exitFullscreen } = useFullScreen();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openDeuce, setOpenDeuce] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [isWinnerOpen, setIsWinnerOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    left: "participant_a" | "participant_b";
    right: "participant_a" | "participant_b";
  }>({
    left: searchParams.get("left") === "a" ? "participant_a" : "participant_b",
    right:
      searchParams.get("right") === "a" ? "participant_a" : "participant_b",
  });

  const onGetMatch = useCallback(async () => {
    const match = await getMatch(String(params.match_id));

    if (!match.error && (match.match_sets?.length == 0 || !match.match_sets)) {
      setOpen(true);
    }

    // if match is finished
    const left = position.left === "participant_a" ? "a" : "b";
    const right = position.right === "participant_a" ? "a" : "b";

    if (!searchParams.get("set_id")) {
      router.push(
        `/community/events/${params.id}/matches/${params.match_id}/play?type=badminton&left=${left}&right=${right}&set_id=${match.match_sets?.find((set) => !set.is_finished)?.id}`,
      );
    }

    const curSet = match.match_sets?.find(
      (set) => set.id === Number(searchParams.get("set_id")),
    );

    if (curSet?.is_finished && !match.winner) {
      router.push(
        `/community/events/${params.id}/matches/${params.match_id}/play?type=badminton&left=${left}&right=${right}&set_id=${match.match_sets?.find((set) => !set.is_finished)?.id}`,
      );
    }

    if (curSet?.needs_deuce_decision) {
      setOpenDeuce(true);
    }

    // if end game
    if (match.winner) {
      setEndGame(true);
    }

    return match;
  }, [params, position.left, position.right, router, searchParams]);

  const {
    data: match,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["match", params.match_id],
    queryFn: onGetMatch,
  });

  console.log("match", match);

  const onChangePosition = () => {
    if (position.left === "participant_a") {
      setPosition({
        left: "participant_b",
        right: "participant_a",
      });
      redirect(
        `/community/events/${params.id}/matches/${params.match_id}/play?type=badminton&set_id=${searchParams.get("set_id")}&left=b&right=a`,
      );
    } else {
      setPosition({
        left: "participant_a",
        right: "participant_b",
      });
      redirect(
        `/community/events/${params.id}/matches/${params.match_id}/play?type=badminton&set_id=${searchParams.get("set_id")}&left=a&right=b`,
      );
    }
  };

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

  const deuceMutation = async (deuce: boolean, currentSetId?: number) => {
    if (!match?.id) return;

    const updatedSet = await activeDeuceApi(
      String(match?.id),
      String(currentSetId),
      {
        enabled: deuce,
      },
    );

    if (!updatedSet.error) {
      refetch();
      setOpenDeuce(false);
    }
  };

  const decreaseMatchMutation = async (
    server: string,
    currentSetId?: number,
  ) => {
    if (!match?.id) return;

    const decreasedScore = await decreaseMatchScore(
      String(match?.id),
      String(currentSetId),
      {
        score_side: server,
      },
    );

    if (!decreasedScore.error) {
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
        if (set.set_score_a > set.set_score_b) {
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
              {position.left === "participant_a"
                ? match?.participant_a?.name
                : match?.participant_b?.name}
            </p>
            <div className="relative flex border-3 border-primary-100 bg-primary text-secondary items-center h-[200px] md:h-[300px]">
              <div
                className="grow text-4xl md:text-7xl font-bold text-center cursor-pointer"
                onClick={() =>
                  matchSetMutation(
                    position.left,
                    Number(searchParams.get("set_id")),
                  )
                }
              >
                {position.left === "participant_a"
                  ? curSet?.set_score_a
                  : curSet?.set_score_b || 0}
              </div>
              <div className="flex flex-col h-full">
                <Button
                  className="rounded-none border border-secondary grow px-5 md:px-10 text-2xl md:text-4xl"
                  size="lg"
                >
                  {position.left === "participant_a"
                    ? setScore.score_a
                    : setScore.score_b || 0}
                </Button>

                <Button
                  variant="destructive"
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                  disabled={
                    position.left === "participant_a"
                      ? curSet?.set_score_a === 0
                      : curSet?.set_score_b === 0
                  }
                  onClick={() =>
                    decreaseMatchMutation(
                      position.left,
                      Number(searchParams.get("set_id")),
                    )
                  }
                >
                  -
                </Button>
              </div>
              {curSet?.current_server === position.left && (
                <div className="absolute top-3 left-3">
                  <Shuttlecock />
                </div>
              )}
            </div>
          </div>
          <div className="border border-secondary w-full">
            <p className="bg-secondary text-primary border-3 border-primary-100 text-2xl font-bold text-center">
              {position.right === "participant_b"
                ? match?.participant_b?.name
                : match?.participant_a?.name}
            </p>
            <div className="relative flex border-3 border-primary-100 bg-secondary text-primary items-center h-[200px] md:h-[300px]">
              <div className="flex flex-col h-full">
                <Button
                  variant="secondary"
                  className="rounded-none border border-primary grow px-5 md:px-10 text-2xl md:text-4xl text-primary"
                >
                  {position.right === "participant_b"
                    ? setScore.score_b
                    : setScore.score_a || 0}
                </Button>
                <Button
                  variant="destructive"
                  disabled={
                    position.right === "participant_b"
                      ? curSet?.set_score_b === 0
                      : curSet?.set_score_a === 0
                  }
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    decreaseMatchMutation(
                      position.right,
                      Number(searchParams.get("set_id")),
                    )
                  }
                >
                  -
                </Button>
              </div>
              <p
                className="grow font-bold text-center text-4xl md:text-7xl cursor-pointer"
                onClick={() =>
                  matchSetMutation(
                    position.right,
                    Number(searchParams.get("set_id")),
                  )
                }
              >
                {position.right === "participant_b"
                  ? curSet?.set_score_b
                  : curSet?.set_score_a || 0}
              </p>

              {curSet?.current_server === position.right && (
                <div className="absolute top-3 right-3">
                  <Shuttlecock />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Button
            variant="outline"
            size="lg"
            aria-label="Switch Court"
            onClick={onChangePosition}
          >
            <ArrowRightLeft />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            aria-label="Switch Court"
            onClick={() => setIsWinnerOpen(true)}
          >
            End Match
          </Button>
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

      {curSet?.needs_deuce_decision && (
        <Dialog open={openDeuce} onOpenChange={setOpenDeuce}>
          <DialogContent>
            <DialogHeader className="flex flex-col items-center gap-4">
              <DialogTitle className="text-2xl font-bold text-center">
                Enter deuce?
              </DialogTitle>

              <div className="flex gap-4 items-center justify-center">
                <Button
                  onClick={() => {
                    deuceMutation(true, curSet.id);
                  }}
                  variant="outline"
                >
                  Yes
                </Button>
                <Button
                  onClick={() => {
                    deuceMutation(false, curSet.id);
                  }}
                  variant="outline"
                >
                  No
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {match && isWinnerOpen && (
        <WinnerDecider
          participant_a={match.participant_a.name}
          participant_b={match.participant_b.name}
          open={isWinnerOpen}
          setOpen={setIsWinnerOpen}
          matchId={match.id}
          eventId={Number(params.id)}
        />
      )}
    </div>
  );
};

export default BadmintonBoard;
