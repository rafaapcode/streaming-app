"use client";
import { cn } from "@/lib/utils";
import { SidebarStore, useSidebar } from "@/store/use-sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {

    const  collapsed  = useSidebar((state: SidebarStore) => state.collapsed);

    return <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-[#2D2E35] z-50 transition-all duration-300", collapsed && "w-[70px]")}>
        {children}
    </aside>
};