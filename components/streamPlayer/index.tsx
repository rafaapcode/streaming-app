"use client";
import UserViewerToken from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client"
import Video from "./Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { useStreamCredentials } from "@/store/stream-credentials";
import Chat from "./Chat";

interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean;
}

export default function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
    const { collapsed } = useChatSidebar((state) => state);
    const name = useStreamCredentials((state) => state.name);


    return <UserViewerToken hostIdentity={user.id} collapsed={collapsed}>
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn("cols-span-1", collapsed && "hidden")}>
            <Chat viewerName={name} hostName={user.username} hosIdentity={user.id} isFollowing={isFollowing} isChatEnabled={stream.isChatEnabled} isChatDelay={stream.isChatDelayed} isChatFollowersOnly={stream.isChatFollowersOnly}/>
        </div>
    </UserViewerToken>
};