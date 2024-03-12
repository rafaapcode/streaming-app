"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadThing";
import { useRouter } from "next/navigation";
import Hint from "../Hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProsp {
    initialName: string;
    initialThumbnailUrl: string | null;
};

export default function InfoModal({ initialName, initialThumbnailUrl }: InfoModalProsp) {
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail removida");
                    setThumbnailUrl("");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Algo deu errado"))
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({ name: name })
                .then(() => {
                    toast.success("Transmissão atualizada");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Algo deu errado"))
        });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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
                        Editar informações da Transmissão
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Nome
                        </Label>
                        <Input placeholder="Nome da Transmissão" onChange={onChange} value={name} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remover thumbnail" asChild side="left">
                                        <Button type="button" disabled={isPending} onClick={onRemove} className="h-auto w-auto p-1.5">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone endpoint="thumbnailUploader" appearance={{
                                    label: {
                                        color: '#FFFFFF'
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    }
                                }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                    }}
                                />
                            </div>
                        )}

                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button variant="primary" type="submit" disabled={false}>
                            Salvar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}