"use client"

import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation";

const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_URL;

export default function SideBar() {
    const pathname = usePathname();

    const getActiveStyles = (href: string) => {
        const isActive = pathname === href;
        return {
            container: isActive ? "bg-cyan-500" : "",
            line: isActive ? "opacity-100 h-full" : "opacity-0 group-hover:opacity-100",
        }
    }

    return (
        <aside className={"group flex flex-col w-12.5 hover:w-50 duration-300 ease-in-out h-screen bg-linear-to-tl from-[#9D96B2] to-[#636D9E] absolute z-1000 drop-shadow-lg border-r"}>
            <Link href="/" className="flex items-center justify-start p-4 text-4xl font-bold text-white">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">HONKAI</span>
            </Link>
            <div className="flex flex-col">
                <div className="w-full bg-[#636D9E] p-2 text-xl font-bold tracking-widest drop-shadow-md/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    DATABASE
                </div>
                <div className={"flex flex-col py-2"}>
                    <Link href={"/characters"} className={`relative group flex w-full items-center py-2 group/character ${getActiveStyles("/characters").container}`}>
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-cyan-500 opacity-0 group-hover/character:opacity-100 transition-all duration-200`} />
                        <div className={"flex w-12.5 min-w-12.5 justify-center items-center"}>
                            <Image src={`${supabaseBucketUrl}/icons/ui/Icon_Team.webp`} width={32} height={32} alt={"Characters"}/>
                        </div>
                        <span className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap">CHARACTERS</span>
                    </Link>
                    <Link href={"/"} className={"relative group flex w-full items-center py-2 group/character"}>
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-cyan-500 opacity-0 group-hover/character:opacity-100 transition-all duration-200`} />
                        <div className={"flex w-12.5 min-w-12.5 justify-center items-center"}>
                            <Image src={`${supabaseBucketUrl}/icons/ui/Icon_Light_Cone.webp`} width={32} height={32} alt={"Lightcones"}/>
                        </div>
                        <span className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap">LIGHTCONES</span>
                    </Link>
                    <Link href={"/"} className={"relative group flex w-full items-center py-2 group/character"}>
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-cyan-500 opacity-0 group-hover/character:opacity-100 transition-all duration-200`} />
                        <div className={"flex w-12.5 min-w-12.5 justify-center items-center"}>
                            <Image src={`${supabaseBucketUrl}/icons/ui/Icon_Relics.webp`} width={32} height={32} alt={"Relics"}/>
                        </div>
                        <span className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden whitespace-nowrap">RELICS</span>
                    </Link>
                </div>
                <nav className="flex flex-col gap-1 p-2">
                </nav>
            </div>
        </aside>
    )
}