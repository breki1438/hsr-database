import { Character } from "@/generated/prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CharacterListProps {
    characters: Character[];
}

const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_URL;

export default function CharacterList({ characters }: CharacterListProps) {
    return (
        <div className={"w-full p-4 grid grid-cols-8 gap-5 gap-y-5"}>
            {characters.map((character) => (
                <Link href={`/characters/${character.id}`} className="relative flex flex-col w-32 h-44 rounded-xl drop-shadow-lg/25 overflow-hidden hover:outline-2 outline-amber-300 group" key={character.id}>
                    <div className="relative flex-1 overflow-hidden bg-linear-to-t from-[#EBB373]/75 to-[#D98F39]/75">
                        <Image
                            src={`${supabaseBucketUrl}/icons/character_splash/cropped/${character.imageSlug}_cropped.webp`}
                            alt={character.name}
                            fill
                            className="object-cover rounded-t-md"
                        />
                        <div className="z-10 px-1 gap-1 absolute top-1 right-0 flex flex-col">
                            <div className="bg-black/75 rounded-full p-1 shadow-md">
                                <Image
                                    src={`${supabaseBucketUrl}/icons/paths/Path_${character.path}.webp`}
                                    alt="Path"
                                    width={20}
                                    height={20}/>
                            </div>
                            <div className="bg-black/75 rounded-full p-1 shadow-md">
                                <Image
                                    src={`${supabaseBucketUrl}/icons/types/Type_${character.type}.webp`}
                                    alt="Element"
                                    width={20}
                                    height={20}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-linear-to-tl from-[#9D96B2]/75 to-[#636D9E]/75 text-center p-1 z-10 min-h-11 flex justify-center items-center">
                    <span className="text-sm text-shadow-sm/25 leading-tight line-clamp-2">
                        {character.name}
                    </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}