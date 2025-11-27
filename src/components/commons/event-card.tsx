import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const EventCard = (props: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/community/events/123`}
            className="text-primary underline"
          >
            Mabar
          </Link>
        </CardTitle>
        <CardDescription>
          It was popularised in the 1960s with the release of Letraset sheets
          containing{" "}
        </CardDescription>
        <CardAction>
          <Button variant="default">Join</Button>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <Badge variant="gray" className="font-bold !rounded-sm">
          Monday
        </Badge>
        <Badge variant="success" className="font-bold !rounded-sm">
          Weekly
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
