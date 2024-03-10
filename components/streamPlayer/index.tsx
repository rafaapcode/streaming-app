"use client";
import UserViewerToken from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client"
import Video, { VideoSkeleton } from "./Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { useStreamCredentials } from "@/store/stream-credentials";
import Chat, { ChatSkeleton } from "./Chat";
import Header, { HeaderSkeleton } from "./Header";
import Infocard from "./Infocard";

interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean;
}

export default function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
    const { collapsed } = useChatSidebar((state) => state);
    const {name, identity} = useStreamCredentials((state) => state);


    return <UserViewerToken hostIdentity={user.id} collapsed={collapsed}>
        <div className={cn("w-[80%] lg:overflow-y-auto hidden-scrollbar pb-10", collapsed && "w-[95%]")}>
            <Video hostName={user.username} hostIdentity={user.id} />
            <Header hostName={user.username} hostIdentity={user.id} viewerIdentity={identity} imageUrl={user.imageUrl} isFollowing={isFollowing} name={stream.name}/>
            <Infocard hostIdentity={user.id} viewerIdentity={identity} name={stream.name} thumbnailUrl={stream.thumbnailUrl || ""}/>
        </div>
        <div className={cn("w-[calc(100%-80%)]",collapsed && "hidden")}>
            <Chat viewerName={name} hostName={user.username} hosIdentity={user.id} isFollowing={isFollowing} isChatEnabled={stream.isChatEnabled} isChatDelay={stream.isChatDelayed} isChatFollowersOnly={stream.isChatFollowersOnly}/>
        </div>
    </UserViewerToken>
};

export const StreamPlayerSkeleton = () => {
    return (
        <div className="flex w-full h-full">
            <div className="w-[80%] lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="w-[calc(100%-80%)] bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
};