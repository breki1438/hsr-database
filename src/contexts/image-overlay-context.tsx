'use client'

import React, { createContext, useContext, useState } from "react";

interface ImageOverlayContextType {
    selectedImage: string | null;
    openOverlay: (imageUrl: string) => void;
    closeOverlay: () => void;
}

const ImageOverlayContext = createContext<ImageOverlayContextType | undefined>(undefined);

export function ImageOverlayProvider({ children }: { children: React.ReactNode }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openOverlay = (url: string) => setSelectedImage(url);
    const closeOverlay = () => setSelectedImage(null);

    return (
        <ImageOverlayContext.Provider value={{ selectedImage, openOverlay, closeOverlay }}>
            {children}
        </ImageOverlayContext.Provider>
    );
}

export const useImageOverlay = () => {
    const context = useContext(ImageOverlayContext);
    if (!context) throw new Error("useImageOverlay must be used within ImageOverlayProvider");
    return context;
};