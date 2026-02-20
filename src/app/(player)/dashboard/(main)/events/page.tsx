import React from "react";
import EventLineup from "@/components/commons/event-lineup";
import EventFilterForm from "@/components/forms/EventFilterForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { getEvents } from "@/actions/event";
import Modal from "@/components/commons/state-modal";
import Image from "next/image";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  searchParams: Promise<{ welcome: boolean; page: number; page_size: number }>;
};

const page = async ({ searchParams }: Props) => {
  const { welcome, page = 1, page_size = 25 } = await searchParams;

  const { events, ...meta } = await getEvents({
    page,
    page_size,
  });

  return (
    <div className="container space-y-10">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="mx-auto w-full max-w-sm py- md:py-2 md:hidden">
          <CardContent className="px-3 md:px-2">
            <Collapsible className="rounded-md">
              <CollapsibleTrigger asChild>
                <Button variant="text" className="group w-full">
                  Filter
                  <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <EventFilterForm />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <div className="hidden md:block">
          <EventFilterForm />
        </div>

        <Link href="/community/events/create">
          <Button>Buat Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-0">
        {events?.map((event) => (
          <Link
            href={`/community/events/${event.id}`}
            key={event.id}
            className="hover:bg-gray-100"
          >
            <EventLineup event={event} />
          </Link>
        ))}

        <div className="flex items-center justify-between">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">
              Rows per page
            </FieldLabel>
            <Select defaultValue="25">
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? `?page=${page - 1}` : "#"}
                />
              </PaginationItem>
              {page >= Math.ceil(meta.total / meta.page_size) && (
                <PaginationItem>
                  <PaginationNext
                    href={
                      page < Math.ceil(meta.total / meta.page_size)
                        ? `?page=${page + 1}`
                        : "#"
                    }
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Modal isOpen={welcome}>
        <Image
          width={1920}
          height={1080}
          src="/images/welcome.jpeg"
          alt="welcome"
        />
      </Modal>
    </div>
  );
};

export default page;
