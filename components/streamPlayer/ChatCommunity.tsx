"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./CommunityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export default function ChatCommunity({ hostName, isHidden, viewerName }: ChatCommunityProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filteredParticipants = useMemo(() => {
        const dedeuped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }

            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return dedeuped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue[0].toLowerCase());
        })
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input onChange={(e) => onChange(e.target.value)} placeholder="Procure uma comunidade" className="border-white/10" />
            <ScrollArea className="fap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    sem resultado
                </p>
                {filteredParticipants.map((participant) => (
                    <CommunityItem key={participant.identity} hostName={hostName} viewerName={viewerName} participantName={participant.name} participantIdentity={participant.identity} />
                ))}
            </ScrollArea>
        </div>
    )
};