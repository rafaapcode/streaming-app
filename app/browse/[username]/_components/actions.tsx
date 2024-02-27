"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({  isFollowing, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Você seguiu o ${data && data.following.username}`))
                .catch(() => toast.error("Algo deu errado"))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Você deixou de seguir o ${data && data.following.username}`))
                .catch(() => toast.error("Algo deu errado"))
        });
    }


    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data.blocked.username}`))
                .catch(() => toast.error("Algo deu errado"))
        });
    };

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`Unblock the user ${data.blocked.username}`))
                .catch(() => toast.error("Algo deu errado"))
        });
    };


    // const handleClick = () => {
    //     if (isBlocked) {
    //         handleBlock();
    //     } else {
    //         handleUnblock();
    //     }
    // };

    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Deixar de Seguir" : "Seguir"}
            </Button>

            <Button onClick={handleUnblock} disabled={isPending}>
                Block
            </Button>
        </>
    )
};