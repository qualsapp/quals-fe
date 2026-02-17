import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  href: string;
  label: string;
};

const BackButton = (props: Props) => {
  return (
    <Link href={props.href} className="underline">
      <Button variant="gray" className="flex items-center">
        <ArrowLeft />
        &nbsp;{props.label}
      </Button>
    </Link>
  );
};

export default BackButton;
