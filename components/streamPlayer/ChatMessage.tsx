import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";

interface ChatMessageProps {
    data: ReceivedChatMessage;
}

export default function ChatMessage({data}: ChatMessageProps) {

    const color = stringToColor(data.from?.name || "");

    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
            <p>
                
            </p>
        </div>
    )
}