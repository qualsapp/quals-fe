"use client";
import React, { useState } from "react";
import { GroupsResponse } from "@/types/group";
import GroupTable from "../commons/group-table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import GroupParticipantForm from "../forms/GroupParticipantsForm";

type Props = {
  groups: GroupsResponse;
  tournamentId: string;
  seatPerGroup: number;
};

const GroupList = ({ groups, tournamentId, seatPerGroup }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupsResponse[0] | null>(
    null,
  );

  return (
    <>
      {groups.map((group) => (
        <div
          key={group.id}
          className="border rounded-lg border-gray-200 w-full p-4"
        >
          <h3 className="text-xl font-bold text-center py-3">{group.name}</h3>
          <div className="overflow-x-auto w-full">
            {group.participants && group.matches ? (
              <GroupTable players={group.participants} results={[]} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <p>No participants found yet</p>
                <Button
                  onClick={() => {
                    setSelectedGroup(group);
                    setOpen(true);
                  }}
                >
                  Update group participants
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update group participants</DialogTitle>
            <DialogDescription>
              Update the participants for the selected group.
            </DialogDescription>
          </DialogHeader>
          {selectedGroup?.id && (
            <GroupParticipantForm
              groupId={String(selectedGroup.id)}
              tournamentId={tournamentId}
              seatPerGroup={seatPerGroup}
              closeModal={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GroupList;
