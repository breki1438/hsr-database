import prisma from "@/lib/prisma"

export const revalidate = 1;

const characters = await prisma.character.findMany();

export default function Home() {
    return (
        <div className={"w-full mx-auto flex flex-col"}>
            <span className={"text-5xl font-bold italic"}>CHARACTERS</span>
            <span className={"w-full bg-white h-0.5"}></span>
            <div className={"w-full p-4 grid grid-cols-8 gap-1"}>
                {characters.map((character) => (
                    <div className={"text-sm font-bold text-white w-30 bg-gray-700 flex flex-col rounded-md drop-shadow-lg hover:outline-2 outline-amber-300"} key={character.id}>
                        <div className={"w-full h-30 rounded-t-md"}></div>
                        <div className={"w-full bg-gray-800 text-center rounded-b-md"}>{character.name}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}
