import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
};

export default async function UserPage({ params: { username } }: UserPageProps) {

    const user = await getUserByUsername(username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if(isBlocked) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col gap-y-4">
            <p>Username: {user.username}</p>
            <p>UserId: {user.id}</p>
            <p>following: {`${isFollowing}`}</p>
            <p>isBlocked by this user: {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    )
};