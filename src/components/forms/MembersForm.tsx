"use client";
import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import MemberCard from "../commons/member-card";

type Props = {};

const frameworks: { value: string; label: string }[] = [
  // {
  //   value: "next.js",
  //   label: "Next.js",
  // },
  // {
  //   value: "sveltekit",
  //   label: "SvelteKit",
  // },
  // {
  //   value: "nuxt.js",
  //   label: "Nuxt.js",
  // },
  // {
  //   value: "remix",
  //   label: "Remix",
  // },
  // {
  //   value: "astro",
  //   label: "Astro",
  // },
];

const MembersForm = (props: Props) => {
  const [value, setValue] = React.useState<string[]>([]);

  const addMember = (member: string) => {
    if (!value.includes(member)) {
      setValue([...value, member]);
    }
  };

  return (
    <div>
      <Command>
        <CommandInput placeholder="Search members..." className="h-9" />
        <CommandList>
          {/* <CommandEmpty>No framework found.</CommandEmpty> */}
          <CommandGroup>
            {frameworks?.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  addMember(currentValue);
                }}
              >
                {framework.label}
                <Check
                  className={cn(
                    "ml-auto",
                    value.includes(framework.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      <div className="space-y-3 my-6">
        <p className="font-bold">New members</p>
        <div className="space-y-3">
          {value.map((val) => {
            return <MemberCard name={val} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MembersForm;
