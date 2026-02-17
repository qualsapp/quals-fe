"use client";
import React from "react";
import CommunityCard from "../commons/community-card";
import { CommunityResponse } from "@/types/community";
import { useMutation } from "@tanstack/react-query";
import { getCommunities } from "@/actions/community";

type Props = {
  communities: CommunityResponse[];
};

const CommunityList = ({ communities }: Props) => {
  const { mutate } = useMutation({
    mutationFn: async () => await getCommunities(),
    onSuccess: () => {
      console.log("joined community");
    },
  });

  const onJoin = () => {
    mutate();
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          onJoin={onJoin}
        />
      ))}
    </div>
  );
};

export default CommunityList;
