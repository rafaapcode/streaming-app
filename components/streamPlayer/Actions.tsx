"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export default function Actions({ hostIdentity, isFollowing, isHost }: ActionsProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { userId } = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`Você esta seguindo`))
                .catch(() => toast.error("Algo deu errado"))
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`Você deixou de seguir ${data.following.username}`))
                .catch(() => toast.error("Algo deu errado"))
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    };

    return (
        <Button onClick={toggleFollow} disabled={isPending || isHost} variant="primary" size="sm" className="mt-2 w-full lg:w-auto">
            <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
            {isFollowing ? 'Deixar de seguir' : "Seguir"}
        </Button>
    )
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
};