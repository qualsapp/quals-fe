import DashboardNav from "@/components/commons/dashboard-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { eventServices } from "@/services/event-services";
import { hostServices } from "@/services/host-services";
import { EventResponse } from "@/types/events";
import { HostProfileModel } from "@/types/user";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import Link from "next/link";

import React from "react";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

const page = async ({ params, children }: LayoutProps) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { community } = token
    ? await hostServices.getProfile(token)
    : ({} as HostProfileModel);

  const event = token
    ? await eventServices.getById(community.id, id, token)
    : ({} as EventResponse);

  const menus = [
    { label: "Matches", href: `/community/events/${id}/matches` },
    { label: "Group", href: `/community/events/${id}/group` },
    { label: "Playoff", href: `/community/events/${id}/playoff` },
  ];
  return (
    <div className=" py-10 md:py-16 space-y-10">
      <div className="container flex flex-col lg:flex-row gap-5 justify-between">
        <div className="space-y-3">
          <h2 className="text-lg font-bold">{event.title}</h2>

          <Badge variant="gray" className="font-bold ">
            {dayjs(event.start_time).format("DD MMM")} -{" "}
            {dayjs(event.end_time).format("DD MMM")}
          </Badge>

          <p>{event.description}</p>
        </div>
        <div className="flex gap-3 lg:flex-col">
          <Link href={`/community/events/${id}/edit`}>
            <Button variant="outline">Edit Event</Button>
          </Link>
          <Button variant="destructive">Delete Event</Button>
        </div>
      </div>
      <div className="bg-primary-50">
        <div className="container">
          <DashboardNav menus={menus} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default page;
