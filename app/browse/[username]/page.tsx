import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-service";
import StreamPlayer from "@/components/streamPlayer";

interface UserPageProps {
    params: {
        username: string;
    }
};

export default async function UserPage({ params: { username } }: UserPageProps) {
    const user = await getUserByUsername(username);

    if (!user || !user.stream) {
        return notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
       <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing}/>
    )
};