"use client";
import React from "react";
import UpdateBadmintonMatchRuleForm from "../forms/UpdateBadmintonMatchRuleForm";
import { MatchRuleResponse } from "@/types/tournament";
import { Button } from "../ui/button";
import UpdatePadelMatchRuleForm from "../forms/UpdatePadelMatchRuleForm";

type Props = {
  type: string;
};

const UpdateRuleBeforeMatch = ({ type }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start Match</Button>

      {type === "badminton" && (
        <UpdateBadmintonMatchRuleForm
          match_rule={{} as MatchRuleResponse}
          open={open}
          setOpen={setOpen}
        />
      )}

      {type === "padel" && (
        <UpdatePadelMatchRuleForm
          match_rule={{} as MatchRuleResponse}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default UpdateRuleBeforeMatch;
