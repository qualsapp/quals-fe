import React from "react";
import { Button } from "../ui/button";
import { ArrowRightLeft, EllipsisVertical, RotateCcw } from "lucide-react";
import Shuttlecock from "@/icons/shuttlecock";
import TennisBall from "@/icons/tennis-ball";

type Props = {};

const TennisBoard = (props: Props) => {
  return (
    <div className="flex flex-col gap-6">
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
                className="rounded-none border border-secondary grow px-5 md:px-10 text-2xl md:text-4xl"
                size="lg"
              >
                4
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
              <TennisBall />
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
                variant="secondary"
                className="rounded-none border border-primary grow px-5 md:px-10 text-2xl md:text-4xl text-primary"
              >
                3
              </Button>

              <Button
                variant="destructive"
                className="rounded-none grow px-5 md:px-10 text-2xl md:text-4xl"
              >
                -
              </Button>
            </div>
            <div className="grow font-bold text-center text-4xl md:text-7xl ">
              <p>30</p>
            </div>
            <div className="absolute top-3 right-3">
              <TennisBall />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Button variant="outline" size="lg" aria-label="Reset">
          <RotateCcw />
        </Button>
        <Button variant="outline" size="lg" aria-label="Game">
          <TennisBall />
        </Button>
        <Button variant="outline" size="lg" aria-label="Switch Court">
          <ArrowRightLeft />
        </Button>
        <Button variant="outline" size="lg" aria-label="Menu">
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
};

export default TennisBoard;
