import prisma from "@/lib/prisma"
import CharacterList from "@/components/character-list";
import SearchBar from "@/components/search-bar";
import { Path, Type } from "@/generated/prisma/client"

export const revalidate = 1;

export default async function CharactersPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const nameQuery = typeof params.query === "string" ? params.query : "";
    const selectedTypes = Array.isArray(params.type) ? params.type : params.type ? [params.type] : [];
    const selectedPaths = Array.isArray(params.path) ? params.path : params.path ? [params.path] : [];
    const characters = await prisma.character.findMany({
        where: {
            AND: [
                { name: { contains: nameQuery, mode: "insensitive" } },

                selectedTypes.length > 0
                    ? { type: { in: selectedTypes as Type[] } }
                    : {},

                selectedPaths.length > 0
                    ? { path: { in: selectedPaths as Path[] } }
                    : {},
            ],
        },
        orderBy: [
            { gameId: "desc" }
        ],
    });

    return (
        <div className={"w-full mx-auto flex flex-col"}>
            <span className={"text-5xl font-bold italic"}>CHARACTERS</span>
            <span className={"w-full bg-white h-0.5"}></span>
            <div className={"flex flex-col items-center justify-center"}>
                <SearchBar paths={Object.values(Path)} types={Object.values(Type)} />
                <CharacterList characters={characters}/>
            </div>
        </div>
    );
}
