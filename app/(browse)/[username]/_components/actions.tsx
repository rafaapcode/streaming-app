"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
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
        if(isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    };


    return (
        <Button disabled={isPending} onClick={onClick} variant="primary">
            {isFollowing ? "Deixar de Seguir" : "Seguir"}
        </Button>
    )
};