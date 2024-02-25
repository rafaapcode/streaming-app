"use client";
import { cn } from "@/lib/utils";
import { SidebarStore, useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./Toggle";
import { RecommendedSkeleton } from "./UserItem";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    const isClient = useIsClient();
    const  collapsed  = useSidebar((state: SidebarStore) => state.collapsed);

    if(!isClient) return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-[#2D2E35] z-50 transition-all duration-300">
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    );

    return <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-[#2D2E35] z-50 transition-all duration-300", collapsed && "w-[70px]")}>
        {children}
    </aside>
};