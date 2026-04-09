'use client'

import Image from "next/image";
import { useImageOverlay } from "@/contexts/image-overlay-context";

export default function ClickableImage({ src, alt, width, height, className }: any) {
    const { openOverlay } = useImageOverlay();

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
            onClick={() => openOverlay(src)}
        />
    )
}