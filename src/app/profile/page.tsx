"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user, player, host } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  const isPlayer = user.user_type === "player";
  const profileData = isPlayer ? player : host;
  const displayName =
    profileData?.display_name || user.email?.split("@")[0] || "Etta Townsend";
  const username = profileData?.username || "";
  const bio =
    profileData?.bio ||
    "Simple search for sports matches is a simple process and task management tool for teams. 🦄";
  const photoUrl = profileData?.photo_url;
  const sports = isPlayer ? player?.sport_types || [] : [];
  const primarySportName = sports.length > 0 ? sports[0].name : "Badminton";

  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] pb-24 font-sans selection:bg-purple-100">
      <div className="max-w-[420px] lg:max-w-5xl xl:max-w-6xl mx-auto p-6 md:pt-12 lg:px-12">
        {/* Header Section */}
        <div className="flex gap-5 lg:gap-8 relative lg:bg-gray-50/50 lg:p-8 lg:rounded-[2.5rem] lg:border lg:border-gray-100">
          {/* Avatar (Rounded Square format matching reference) */}
          <div className="w-6 h-6 lg:w-30 lg:h-30 shrink-0 rounded-full overflow-hidden bg-gray-100 shadow-sm relative flex items-center justify-center">
            <Avatar>
              <AvatarImage src={photoUrl} height={300} width={300} />
              <AvatarFallback className="uppercase">
                {displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col flex-1 py-1 lg:justify-center">
            <h1 className="text-base lg:text-2xl font-bold leading-tight mb-0 truncate pr-2">
              {displayName}
            </h1>

            {!username && (
              <p className="text-neutral-400 font-semibold text-sm mt-0.5 tracking-tight">
                @{username}JohnDoe
              </p>
            )}

            <div className="flex gap-1 items-center mt-2 ">
              <Badge variant="outline" className="capitalize">
                {user.user_type}
              </Badge>
              <Badge variant="outline">{primarySportName}</Badge>
            </div>

            {/* <div className="flex items-center gap-1 mt-mt-2 font-semibold text-gray-600 text-[13px] lg:text-[15px]">
              4.8
              <div className="flex gap-0.5 ml-1 lg:ml-2 text-[#8b5cf6]">
                <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                <Star className="w-3 h-3 lg:w-4 lg:h-4 text-gray-300 fill-gray-300" />
              </div>
            </div> */}

            <p className="text-neutral-400 text-sm lg:text-base leading-[1.3] lg:leading-relaxed mt-2 lg:mt-4 line-clamp-3 pr-2 lg:max-w-2xl">
              {bio}
            </p>

            <div className="flex items-center justify-between mt-3 lg:mt-6 pr-1 lg:pr-4">
              <Link
                href={isPlayer ? "/dashboard/edit-profile" : "/host-details"}
              >
                <Button variant="outline">Edit</Button>
              </Link>

              {/* <div className="flex gap-4 lg:gap-8">
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[13px] lg:text-[18px] font-extrabold">
                    {sports.length > 0 ? sports.length : "201"}
                  </span>
                  <span className="text-[9px] lg:text-[12px] text-[#a1a1aa] mt-1 lg:mt-1.5 font-medium uppercase tracking-wider">
                    {isPlayer ? "Sports" : "Events"}
                  </span>
                </div>
                <div className="flex flex-col items-center leading-none">
                  <span className="text-[13px] lg:text-[18px] font-extrabold flex items-center gap-1">
                    <span className="text-gray-300 text-[10px] lg:text-[14px]">
                      ❤️
                    </span>{" "}
                    220
                  </span>
                  <span className="text-[9px] lg:text-[12px] text-[#a1a1aa] mt-1 lg:mt-1.5 font-medium uppercase tracking-wider">
                    Points
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Responsive Grid Layout for Map & Match History */}
        <h2 className="mt-10 text-[24px] lg:text-[26px] font-bold tracking-tight text-[#1a1a2e]">
          Match History
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          Coming soon...
        </div>
      </div>
    </div>
  );
}
