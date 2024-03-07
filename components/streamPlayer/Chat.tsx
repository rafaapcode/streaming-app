"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";


interface ChatProps {
    hostName: string;
    viewerName: string;
    hosIdentity: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelay: boolean;
    isChatFollowersOnly: boolean;
}

export default function Chat({ hosIdentity, hostName, isChatDelay, isChatEnabled, isChatFollowersOnly, isFollowing, viewerName }: ChatProps) {
    const matches = useMediaQuery('(max-width: 1024px');
    const { variant, onExpand } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hosIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue(value);
    };

    const onChange = (value: string) => {
        setValue(value);
    }

    return (
        <div className="w-full flex flex-col bg-background border-l border-b pt-0 h-[calc(100%-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatForm onSubmit={onSubmit} value={value} onChange={onChange} isHidden={isHidden} isFollowersOnly={isChatFollowersOnly} isDelayed={isChatDelay} isFollowing={isFollowing} />
                </>
            )}

            {variant === ChatVariant.COMMUNITY && (
                <>
                    <p>Chat Mode</p>
                </>
            )}
        </div>
    )
};