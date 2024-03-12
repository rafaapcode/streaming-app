"use client";

import { Value } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import React, { ElementRef, useRef, useState, useTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null;
}

export default function BioModal({ initialValue }: BioModalProps) {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value }).then(() => {
                toast.success("Bio atualizada");
                closeRef.current?.click();
            }).catch(() => toast.error("Algo deu errado"));
        });
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Editar a bio
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea placeholder="User Bio" onChange={(e) => setValue(e.target.value)} value={value || ""} disabled={false} className="resize-none" />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef}>
                            <Button type="button" variant={"ghost"}>
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit" variant={"primary"}>
                            Salvar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}