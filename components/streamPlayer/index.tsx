"use client";
import UserViewerToken from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client"
import Video from "./Video";

interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean;
}

export default function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
    return <UserViewerToken hostIdentity={user.id}>
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl-col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <Video hostName={user.username} hostIdentity={user.id} />
        </div>
    </UserViewerToken>
};