import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const KnockOffCard = () => {
  return (
    <Table className="w-auto">
      <TableBody>
        <TableRow className="border-transparent rounded-lg">
          <TableCell className="border bg-primary text-secondary font-bold">
            <Item className="p-2 flex flex-nowrap">
              <ItemMedia>
                <Avatar className="size-6">
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Player B1, Player B2</ItemTitle>
              </ItemContent>
            </Item>
          </TableCell>
          <TableCell className="border border-priary text-center w-12 bg-primary text-secondary font-bold">
            3
          </TableCell>
        </TableRow>
        <TableRow className="border-none">
          <TableCell className="border">
            <Item className="p-2">
              <ItemMedia>
                <Avatar className="size-6">
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Player B1, Player B2</ItemTitle>
              </ItemContent>
            </Item>
          </TableCell>
          <TableCell className="border text-center w-12">3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default KnockOffCard;
