import { useMemo } from "react";
import Hint from "../Hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export default function ChatInfo({ isDelayed, isFollowersOnly }: ChatInfoProps) {
    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Somente seguidores podem mandar mensagem"
        }
        if (!isFollowersOnly && isDelayed) {
            return "As mensagens estão com um atraso de 3 segundos"
        }

        if (isDelayed && isFollowersOnly) {
            return "Somente seguidores podem mandar mensagem.  As mensagens estão com um atraso de 3 segundos";
        }

        return "";

    }, [isFollowersOnly, isDelayed]);


    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Somente seguidores."
        }
        if (!isFollowersOnly && isDelayed) {
            return "Modo lento"
        }

        if (isDelayed && isFollowersOnly) {
            return "Somente seguidores e modo lento";
        }

        return "";

    }, [isFollowersOnly, isDelayed]);

    if (!isDelayed && !isFollowersOnly) {
        return null;
    }

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint} asChild>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
};