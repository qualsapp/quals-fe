import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  variant?: "outline" | "gray" | "link";
  className?: string;
};

const BackButton = (props: Props) => {
  return (
    <Link href={props.href}>
      <Button
        variant={props.variant || "gray"}
        className={cn("flex items-center", props.className)}
      >
        <ArrowLeft />
        &nbsp;{props.label}
      </Button>
    </Link>
  );
};

export default BackButton;
