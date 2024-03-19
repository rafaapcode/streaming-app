"use client"

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-buton";

export type BlockedUser = {
  userId: string;
    imageUrl: string;
    username: string;
    createdAt: string;
    blocked: {
        id: string;
        username: string;
        imageUrl: string;
        externalUserId: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    blockerId: string;
    blockedId: string;
}

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({column}) => (
      <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Username
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar username={row.original.username} imageUrl={row.original.imageUrl
        } />
        <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({column}) => (
      <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Data do bloqueio
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({row}) => <UnblockButton userId={row.original.userId.toString()}/>
  }
]
