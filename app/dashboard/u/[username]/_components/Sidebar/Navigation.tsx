"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users, icons } from "lucide-react";
import { usePathname } from "next/navigation";
import NavItem, { NavItemSkeleton } from "./NavItem";

export default function Navigation() {
    const pathName = usePathname();
    const { user } = useUser();

    const routes = [
        {
            label: "Stream",
            href: `/dashboard/u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `/dashboard/u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `/dashboard/u/${user?.username}/chat`,
            icon: MessageSquare
        },
        {
            label: "Community",
            href: `/dashboard/u/${user?.username}/community`,
            icon: Users
        }
    ]

    if (!user?.username) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i} />
                ))}
            </ul>
        )
    }

    return (
        <ul className="space-y-2 px-2 ">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isActive={pathName === route.href}
                />
            ))}
        </ul>
    )
}