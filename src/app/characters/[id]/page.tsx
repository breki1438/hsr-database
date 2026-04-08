import prisma from "@/lib/prisma"
import Image from "next/image";
import BasicStats from "@/components/basic-stats";
import React from "react";
import {notFound} from "next/navigation";

export default async function CharacterPage({ params }: { params: Promise<{ id: number }>}) {
    const { id } = await params;
    const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_URL;
    const characterData = await prisma.character.findFirst({
        where: {
            id: parseInt(id.toString())
        },
        include: {
            basicStats: true,
            abilities: true,
            traces: true,
            eidolons: true
        }

    })

    if (!characterData) {
        notFound();
    }

    const basicStats = characterData.basicStats;
    const traces = characterData.traces;
    const eidolons = characterData.eidolons;

    console.log(characterData.basicStats)

    const typeColors: Record<string, string> = {
        Fire: "text-fire",
        Ice: "text-ice",
        Physical: "text-physical",
        Imaginary: "text-imaginary",
        Quantum: "text-quantum",
        Wind: "text-wind",
        Lightning: "text-lightning",
    }

    const convertUpperToCapitalize = (str: string): string => {
        return str.replace("_", " ").toLowerCase()
            .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
    }

    return (
        <div className={"flex flex-col"}>
            <div className={"flex justify-between items-start text-shadow-lg"}>
                <div className={"flex flex-col gap-2"}>
                    <div className={"flex gap-4 bg-gray-600"}>
                        <Image
                            src={`${supabaseBucketUrl}/icons/character_splash/${characterData.name}.webp`}
                            alt="Character"
                            width={48}
                            height={48}
                            className={"rounded-full bg-gray-700 m-auto"}
                        />
                        <div className={"flex flex-col"}>
                            <span className={"text-4xl font-semibold"}>{characterData.name.toUpperCase()}</span>
                            <div className={"flex gap-2"}>
                                <span>{characterData.rarity} Star</span>
                                <div className={"flex gap-0.5"}>
                                    <Image
                                        src={`${supabaseBucketUrl}/icons/types/Type_${characterData.type}.webp`}
                                        alt="Element"
                                        width={20}
                                        height={20}
                                    />
                                    <span className={`${typeColors[characterData.type]}`}>{characterData.type}</span>
                                </div>
                                <div className={"flex gap-0.5"}>
                                    <Image
                                        src={`${supabaseBucketUrl}/icons/paths/Path_${characterData.path}.webp`}
                                        alt="Path"
                                        width={20}
                                        height={20}
                                    />
                                    <span className={"text-[#D4D4D4]"}>{characterData.path}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span>Faction: {characterData.faction}</span>
                    <BasicStats basicStats={basicStats} />
                </div>

                <Image
                    src={`${supabaseBucketUrl}/icons/character_splash/Character_${characterData.name}_Splash_Art.webp`}
                    alt="Character Image"
                    width={640}
                    height={640}
                    className={"drop-shadow-lg/25 "}
                />
            </div>

            <span className={"text-[32px] font-bold italic"}>ABILITIES</span>
            <span className={"w-full bg-white h-0.5"}></span>
            <div className={"flex flex-col gap-4 mt-4"}></div>

            <span className={"text-[32px] font-bold italic"}>TRACES</span>
            <span className={"w-full bg-white h-0.5"}></span>
            <div className={"flex flex-col gap-4 mt-4"}>
                {traces?.map((trace) => (
                    <div key={trace.id} className={"flex flex-col bg-[#1B1B1B]/50 border border-[#1B1B1B] shadow-lg/25"}>
                        <div className={"flex p-2 bg-[#1B1B1B]/50"}>
                            <span>img</span>
                            <div className={"flex flex-col font-semibold"}>
                                <span>{trace.name}</span>
                                <span className={`${typeColors[characterData.type]}`}>{convertUpperToCapitalize(trace.type)}</span>
                            </div>
                        </div>
                        <div className={"p-2"}>
                            <span>{trace.description}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={"flex flex-col mt-8"}>
                <span className={"text-[32px] font-bold italic"}>EIDOLONS</span>
                <span className={"w-full bg-white h-0.5"}></span>
                <div className={"flex justify-between my-4"}>
                    {eidolons?.map((eidolon, i: number) => (
                        <Image
                            key={eidolon.id}
                            src={`${supabaseBucketUrl}/icons/eidolons/${characterData.imageSlug}/Character_${characterData.name}_Eidolon_${i + 1}.webp`}
                            alt="Element"
                            width={192}
                            height={192}
                            className={"drop-shadow-lg/50"}
                        />
                    ))}
                </div>
                <div className={"flex flex-col gap-4 mt-4"}>
                    {eidolons?.map((eidolon, i: number) => (
                        <div key={eidolon.id} className={"flex flex-col bg-[#1B1B1B]/50 border border-[#1B1B1B] shadow-lg/25"}>
                            <div className={"flex p-2 bg-[#1B1B1B]/50"}>
                                <span>img</span>
                                <div className={"flex flex-col font-semibold"}>
                                    <span>{eidolon.eidolonName}</span>
                                    <span className={`${typeColors[characterData.type]}`}>Eidolon {i + 1}</span>
                                </div>
                            </div>
                            <div className={"p-2"}>
                                <span>{eidolon.eidolonDesc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}