import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UserPageProps {
    params: {
        username: string;
    }
};

export default async function UserPage({ params: { username } }: UserPageProps) {

    const user = await getUserByUsername(username);

    if(!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <p>Username: {user.username}</p>
            <p>UserId: {user.id}</p>
            <p>following: {`${isFollowing}`}</p>
        </div>
    )
};