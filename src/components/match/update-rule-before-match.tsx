"use client";
import React from "react";
import UpdateBadmintonMatchRuleForm from "../forms/UpdateBadmintonMatchRuleForm";
import { MatchRuleResponse } from "@/types/tournament";
import { Button } from "../ui/button";
import UpdatePadelMatchRuleForm from "../forms/UpdatePadelMatchRuleForm";

type Props = {
  type: string;
  rule: MatchRuleResponse;
  matchId: string;
};

const UpdateRuleBeforeMatch = ({ type, rule, matchId }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => setOpen(true)}>Start Match</Button>
      </div>

      {type === "badminton" && (
        <UpdateBadmintonMatchRuleForm
          matchId={matchId}
          rule={rule}
          open={open}
          setOpen={setOpen}
        />
      )}

      {type === "padel" && (
        <UpdatePadelMatchRuleForm
          matchId={matchId}
          rule={rule}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default UpdateRuleBeforeMatch;
