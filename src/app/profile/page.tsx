"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { buttonVariants } from "@/components/ui/button";
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
  const sports = isPlayer ? player?.sport_types || [] : [];
  const primarySportName = sports.length > 0 ? sports[0].name : "Badminton";

  if (!profileData) {
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center flex-col gap-4">
        <p className="text-black/30 text-2xl font-bold">
          You need to create a player profile to join an event.
        </p>
        <Link
          href={isPlayer ? "/dashboard/edit-profile" : "/host-details"}
          className={buttonVariants({ variant: "default" })}
        >
          Create profile
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] pb-24 font-sans selection:bg-purple-100">
      <div className="max-w-[420px] lg:max-w-5xl xl:max-w-6xl mx-auto p-6 md:pt-12 lg:px-12">
        {/* Header Section */}
        <div className="flex gap-5 lg:gap-8 relative lg:bg-gray-50/50 lg:p-8 lg:rounded-[2.5rem] lg:border lg:border-gray-100">
          {/* Avatar (Rounded Square format matching reference) */}
          <div className="w-6 h-6 lg:w-30 lg:h-30 shrink-0 rounded-full overflow-hidden bg-gray-100 shadow-sm relative flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src={profileData.photo_url}
                height={300}
                width={300}
              />
              <AvatarFallback className="uppercase">
                {profileData.display_name
                  ? profileData.display_name.charAt(0)
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col flex-1 py-1 lg:justify-center">
            <h1 className="text-base lg:text-2xl font-bold leading-tight mb-0 truncate pr-2">
              {profileData.display_name}
            </h1>

            {!profileData.username && (
              <p className="text-neutral-400 font-semibold text-sm mt-0.5 tracking-tight">
                @{profileData.username}
              </p>
            )}

            <div className="flex gap-1 items-center mt-2 ">
              <Badge variant="outline" className="capitalize">
                {user.user_type}
              </Badge>
              <Badge variant="outline">{primarySportName}</Badge>
            </div>

            <p className="text-neutral-400 text-sm lg:text-base leading-[1.3] lg:leading-relaxed mt-2 lg:mt-4 line-clamp-3 pr-2 lg:max-w-2xl">
              {profileData.bio || "No bio available."}
            </p>

            <div className="flex items-center justify-between mt-3 lg:mt-6 pr-1 lg:pr-4">
              <Link
                href={isPlayer ? "/dashboard/edit-profile" : "/host-details"}
                className={buttonVariants({ variant: "outline" })}
              >
                Edit
              </Link>
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
