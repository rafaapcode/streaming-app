import Navbar from "../[username]/_components/Navbar";
import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "./_components/Sidebar";
import Container from "./_components/Container";

interface CreatorLayoutProps {
    params: { username: string };
    children: React.ReactNode
}

export default async function CreatorLayout({ children, params }: CreatorLayoutProps) {
    const self = await getSelfByUsername(params.username);

    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>

            </div>
        </>
    )
};