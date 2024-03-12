"use client"

import VerifiedMark from "../verified-mark";
import BioModal from "./bio-modal";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
};

export default function AboutCard({ bio, followedByCount, hostIdentity, hostName, viewerIdentity }: AboutCardProps) {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followedByCount === 1 ? "seguidor" : "seguidores";

    return (
        <div className="px-4">
            <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col mt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-sl lg:text-2xl">
                        Sobre {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio}/>
                    )}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">{followedByCount}</span> {followedByLabel}
                </div>
                <p className="mt-3 text-sm">
                    {bio || "Esse usuário prefere manter um mistério sobre ele."}
                </p>
            </div>
        </div>
    )
};