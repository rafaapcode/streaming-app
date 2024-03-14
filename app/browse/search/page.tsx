import { redirect } from "next/navigation";
import { Results } from "./_components/result";
import { Suspense } from "react";
import { ResultsSkeleton } from "../home/_components/Results";


interface SeachPageProps {
    searchParams: {
        term?: string;
    }
}

export default function SearchPage({ searchParams }: SeachPageProps) {
    if (!searchParams.term) {
        redirect("/browse/home");
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results term={searchParams.term} />
            </Suspense>
        </div>
    )
};