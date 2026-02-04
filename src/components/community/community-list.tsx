"use client";
import React from "react";
import CommunityCard from "../commons/community-card";
import { CommunityResponse } from "@/types/community";
import { userServices } from "@/services/user-services";
import { useMutation } from "@tanstack/react-query";

type Props = {
  communities: CommunityResponse[];
};

const CommunityList = ({ communities }: Props) => {
  const { mutate } = useMutation({
    mutationFn: async (id: string) => await userServices.joinCommunity(id),
    onSuccess: () => {
      console.log("joined community");
    },
  });

  const onJoin = (id: string) => {
    mutate(id);
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
