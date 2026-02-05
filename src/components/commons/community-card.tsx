import { CommunityResponse } from "@/types/community";
import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

type Props = {
  community: CommunityResponse;
  onJoin: (id: string) => void;
};

const CommunityCard = ({ community, onJoin }: Props) => {
  return (
    <Card className="w-full h-full overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={community.image_url}
          alt={community.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{community.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {community.address}
        </CardDescription>
        <CardDescription className="line-clamp-2 mt-2 text-sm text-foreground/80">
          {community.description}
        </CardDescription>
        <CardAction>
          <Button
            variant="default"
            size="sm"
            onClick={() => onJoin(community.id)}
          >
            Join Community
          </Button>
          <Link href={`/communities/${community.id}`}>
            <Button variant="outline" size="sm">
              View Community
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex gap-2 flex-wrap">
        {community.sport_types?.map((sport) => (
          <Badge
            key={sport.id}
            variant="gray"
            className="font-bold !rounded-sm"
          >
            {sport.name}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default CommunityCard;
