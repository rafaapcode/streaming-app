"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {  useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
    field: FieldTypes
    label: string;
    value: boolean;
}

export default function ToggleCard({ field, label, value = false }: ToggleCardProps) {
     const [isPending, startTransition] = useTransition();


    const onChange = async () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Configurações atualizada com sucesso"))
                .catch(() => toast.error("Algo deu errado"))
        });
    };

    return <div className="rounded-xl bg-muted p-6">
        <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <div className="space-y-2">
                <Switch disabled={isPending} onCheckedChange={onChange} checked={value} >
                    {value ? "Ligado" : "Desligado"}
                </Switch>
            </div>
        </div>
    </div>
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full"/>
    )
};