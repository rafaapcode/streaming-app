"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine, MessagesSquare, Users } from "lucide-react";
import Hint from "../Hint";
import { Button } from "../ui/button";

export default function VariantToggle() {
    const {variant, onChatVariant} = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;

    let Icon = variant === ChatVariant.CHAT ? Users : MessagesSquare;

    const onToggle = () => {
       const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
       onChatVariant(newVariant);
    };

    const label = isChat ? "Comunidade" : "Voltar ao Chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button onClick={onToggle} variant={"ghost"} className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent">
                <Icon className="h-4 w-4"/>
            </Button>
        </Hint>
    )
};