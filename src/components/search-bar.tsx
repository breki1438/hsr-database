"use client"

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const supabaseBucketUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_URL;

interface SearchBarProps {
    paths: string[];
    types: string[];
}

export default function SearchBar({ paths, types }: SearchBarProps) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSearch = (searchTerm: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (searchTerm) {
            params.set("query", searchTerm);
        } else {
            params.delete("query");
        }

        replace(`${pathName}?${params.toString()}`, { scroll: false });
    };

    const handleToggleFilter = (key: "path" | "type", value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.getAll(key);

        if (currentValues.includes(value)) {
            const newValues = currentValues.filter((v) => v !== value);
            params.delete(key);
            newValues.forEach((v) => params.append(key, v));
        } else {
            params.append(key, value);
        }

        replace(`${pathName}?${params.toString()}`, { scroll: false });
    }

    const typeGradients: Record<string, string> = {
        Fire: "from-fire/50 to fire/0",
        Ice: "from-ice/50 to ice/0",
        Physical: "from-physical/50 to physical/0",
        Imaginary: "from-imaginary/50 to imaginary/0",
        Quantum: "from-quantum/50 to quantum/0",
        Wind: "from-wind/50 to wind/0",
        Lightning: "from-lightning/50 to lightning/0",
    }

    return (
        <div className={"m-4 p-2 w-2xl flex flex-col bg-linear-to-tl from-[#9D96B2] to-[#636D9E] rounded-md mb-4 drop-shadow-lg/25"}>
            <div className={"flex justify-between"}>
                <input
                    type={"search"}
                    placeholder={"Search characters"}
                    className={"bg-[#5C5C6D]/50 p-2 rounded-md m-2 text-white w-4/5"}
                    defaultValue={searchParams.get("query")?.toString()}
                    onInput={(e) => {
                        handleSearch(e.currentTarget.value);
                    }}
                />
                <button onClick={() => replace(pathName)} className={"text-sm cursor-pointer m-auto"}>Reset</button>
            </div>
            <div className={"flex justify-between p-3"}>
                <div className={"flex items-center"}>
                    {types.map((type) => {
                        const isActive = searchParams.getAll("type").includes(type);
                        return (
                            <button
                                key={type}
                                onClick={() => handleToggleFilter("type", type)}
                                className={`flex items-center gap-1 cursor-pointer p-1 rounded-full ${isActive ? `bg-radial ${typeGradients[type]} to-75% ${typeGradients[type]}` : ""}`}
                            >
                                <Image
                                    src={`${supabaseBucketUrl}/icons/types/Type_${type}.webp`}
                                    alt={type}
                                    width={24} height={24}
                                />
                            </button>
                        )

                    })}
                </div>
                <div className={"flex items-center"}>
                    {paths.map((path) => {
                        const isActive = searchParams.getAll("path").includes(path);
                        return (
                            <button
                                key={path}
                                onClick={() => handleToggleFilter("path", path)}
                                className={`flex items-center cursor-pointer p-1 rounded-full ${isActive ? `bg-radial from-gray-300/50 to-75% to-gray-300/0` : ""}`}
                            >
                                <Image
                                    src={`${supabaseBucketUrl}/icons/paths/Path_${path}.webp`}
                                    alt={path}
                                    width={24} height={24}
                                />
                            </button>
                        )

                    })}
                </div>
            </div>
        </div>
    )
}