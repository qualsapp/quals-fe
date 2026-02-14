"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightLeft, EllipsisVertical, RotateCcw } from "lucide-react";
import Shuttlecock from "@/icons/shuttlecock";
import useFullScreen from "@/hooks/use-full-screen";
import { cn } from "@/lib/utils";

type Props = {};

const BadmintonBoard = (props: Props) => {
  const { ref, isFullscreen, goFullscreen, exitFullscreen } = useFullScreen();
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
              Steve
            </p>
            <div className="relative flex border-3 border-primary-100 bg-primary text-secondary items-center h-[200px] md:h-[300px]">
              <div className="grow text-4xl md:text-7xl font-bold text-center">
                30
              </div>
              <div className="flex flex-col h-full">
                <Button
                  className="rounded-none border border-secondary grow px-5 md:px-10 text-2xl md:text-4xl"
                  size="lg"
                >
                  1
                </Button>

                <Button
                  variant="destructive"
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl"
                  size="lg"
                >
                  -
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <Shuttlecock />
              </div>
            </div>
          </div>
          <div className="border border-secondary w-full">
            <p className="bg-secondary text-primary border-3 border-primary-100 text-2xl font-bold text-center">
              Jay
            </p>
            <div className="relative flex border-3 border-primary-100 bg-secondary text-primary items-center h-[200px] md:h-[300px]">
              <div className="flex flex-col h-full">
                <Button
                  variant="secondary"
                  className="rounded-none border border-primary grow px-5 md:px-10 text-2xl md:text-4xl text-primary"
                >
                  1
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl"
                >
                  -
                </Button>
              </div>
              <p className="grow font-bold text-center text-4xl md:text-7xl">
                30
              </p>

              <div className="absolute top-3 right-3">
                <Shuttlecock />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Button variant="outline" size="lg" aria-label="Reset">
            <RotateCcw />
          </Button>
          <Button variant="outline" size="lg" aria-label="Game">
            <Shuttlecock />
          </Button>
          <Button variant="outline" size="lg" aria-label="Switch Court">
            <ArrowRightLeft />
          </Button>
          <Button variant="outline" size="lg" aria-label="Menu">
            <EllipsisVertical />
          </Button>
          {isFullscreen ? (
            <Button onClick={exitFullscreen}>Exit</Button>
          ) : (
            <Button onClick={goFullscreen}>Enter</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadmintonBoard;
