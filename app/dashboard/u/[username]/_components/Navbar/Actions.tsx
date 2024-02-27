import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";


export default function Actions() {

    return <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
        <Button size={'sm'} variant={'ghost'} className="text-muted-foreground hover:text-primary" asChild>
            <Link href={"/browse/home"}>
                <LogOut />
                Exit
            </Link>
        </Button>
        <UserButton afterSignOutUrl="/browse/home"/>
    </div>
};