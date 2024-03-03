"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

export default function ConnectModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"primary"}>
                    Gerar Conexão
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Gerar Conexão</DialogTitle>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo de Ingresso"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="RTMP">RTMP</SelectItem>
                        <SelectItem value="WHIP">WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertTitle>Cuidado !!</AlertTitle>
                    <AlertDescription>
                        Essa ação irá encerrar todas as streams que estão ativas na conexão atual.
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose>
                        <Button variant={"ghost"}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button onClick={() => { }} variant={"primary"}>
                        Gerar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}