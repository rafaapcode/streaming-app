"use client";
import UserViewerToken from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client"
import Video, { VideoSkeleton } from "./Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { useStreamCredentials } from "@/store/stream-credentials";
import Chat, { ChatSkeleton } from "./Chat";

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

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
};