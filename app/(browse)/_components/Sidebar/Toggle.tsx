"use client";

import { Button } from "@/components/ui/button";
import { SidebarStore, useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export default function Toggle() {
    const { collapsed, onExpand, onCollapse } = useSidebar((state: SidebarStore) => {
        return {
            collapsed: state.collapsed,
            onExpand: state.onExpand,
            onCollapse: state.onCollapse
        }
    });

    const label = collapsed ? "Expand" : "Collapse";

    return <>
    {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
            <Button onClick={onExpand} variant={"ghost"} className="h-auto p-2">
                <ArrowRightFromLine className="h-4 w-4"/>
            </Button>

        </div>
    )}
        {!collapsed && (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
                <p className="font-semibold text-primary">
                    Para Você !
                </p>
                <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant={'ghost'}>
                    <ArrowLeftFromLine className="h-4 w-4"/>
                </Button>
            </div>
        )}
    </>
};