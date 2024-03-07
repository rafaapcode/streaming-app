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
        <div className={cn("w-[80%] lg:overflow-y-auto hidden-scrollbar pb-10", collapsed && "w-[95%]")}>
            <Video hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn("w-[calc(100%-80%)]",collapsed && "hidden")}>
            <Chat viewerName={name} hostName={user.username} hosIdentity={user.id} isFollowing={isFollowing} isChatEnabled={stream.isChatEnabled} isChatDelay={stream.isChatDelayed} isChatFollowersOnly={stream.isChatFollowersOnly}/>
        </div>
    </UserViewerToken>
};