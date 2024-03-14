import { getSearch } from "@/lib/search-sevice";
import ResultCard from "./result-card";


interface ResultsProps {
    term?: string;
}

export const Results = async ({ term }: ResultsProps) => {
    const data = await getSearch(term);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Resultados para &quot;{term}&quot;
            </h2>
            {
                data.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                        Nenhum resultado encontrado. Tente procurar por algo
                    </p>
                )
            }
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard data={result} key={result.id}/>
                ))}
            </div>
        </div>
    )
};