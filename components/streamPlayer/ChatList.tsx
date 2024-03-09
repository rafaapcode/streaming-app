import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./ChatMessage";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
    messages: ReceivedChatMessage[];
    isHidden: boolean | undefined;
}

export default function ChatList({isHidden, messages}: ChatListProps) {

    if(isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat inativo" : "Bem vindo ao Chat !!"}
                </p>
            </div>
        )
    }

    return <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
        {messages.map((message) => (
            <ChatMessage 
                key={message.timestamp}
                data={message}
            />
        ))}
    </div>
}


export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
                <Skeleton className="w-1/2 h-6"/>
        </div>
    )
};