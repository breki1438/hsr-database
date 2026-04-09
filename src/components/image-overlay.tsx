'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useImageOverlay } from '@/contexts/image-overlay-context'

export default function ImageOverlay() {
    const { selectedImage, closeOverlay } = useImageOverlay();

    const boxRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const scale = useRef<number>(1);

    const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

    useEffect(() => {
        if (boxRef.current && selectedImage) {
            const box = boxRef.current;

            box.style.transition = 'none';

            scale.current = 1;
            box.style.transform = `scale(1)`;
            box.style.transformOrigin = '0 0';

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const boxWidth = box.offsetWidth || 1024;
            const boxHeight = box.offsetHeight || 1024;

            const centerX = (screenWidth - boxWidth) / 2;
            const centerY = (screenHeight - boxHeight) / 2;

            box.style.left = `${centerX}px`;
            box.style.top = `${centerY}px`;

            coords.current = { startX: 0, startY: 0, lastX: centerX, lastY: centerY };
        }
    }, [selectedImage]);

    useEffect(() => {
        if (!boxRef.current || !containerRef.current || !selectedImage) return;

        const box = boxRef.current;
        const container = containerRef.current;

        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;

            if (boxRef.current) {
                boxRef.current.style.transition = 'none';
            }

            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        };

        const onMouseUp = () => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return;
            e.preventDefault();
            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;
            box.style.left = `${nextX}px`;
            box.style.top = `${nextY}px`;
        };

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (boxRef.current) {
                boxRef.current.style.transition = 'transform 0.25s ease-out, left 0.25s ease-out, top 0.25s ease-out';
            }

            const oldScale = scale.current;
            const zoomSpeed = 0.15;

            const delta = e.deltaY < 0 ? 1 : -1;
            let newScale = oldScale + (delta * zoomSpeed * oldScale);

            newScale = Math.min(Math.max(0.2, newScale), 5);

            if (newScale === oldScale) return;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const currentLeft = coords.current.lastX;
            const currentTop = coords.current.lastY;

            const scaleRatio = newScale / oldScale;
            const newLeft = mouseX - (mouseX - currentLeft) * scaleRatio;
            const newTop = mouseY - (mouseY - currentTop) * scaleRatio;

            scale.current = newScale;
            box.style.transform = `scale(${newScale})`;
            box.style.left = `${newLeft}px`;
            box.style.top = `${newTop}px`;

            coords.current.lastX = newLeft;
            coords.current.lastY = newTop;
        };

        box.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        container.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            box.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('wheel', onWheel);
        };
    }, [selectedImage]);

    if (!selectedImage) return null;

    return (
        <div
            ref={containerRef}
            onClick={closeOverlay}
            className={"bg-black/75 backdrop-blur-xs fixed inset-0 z-10000 overflow-hidden"}
        >
            <div
                ref={boxRef}
                className={"absolute top-0 left-0 will-change-transform"}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={selectedImage}
                    alt="Expanded Image"
                    width={1024}
                    height={1024}
                    className={"drop-shadow-lg/25 cursor-move max-w-none select-none"}
                    draggable={false}
                    priority
                    unoptimized
                />
            </div>
            <button
                onClick={closeOverlay}
                className="absolute top-6 right-6 text-white text-3xl font-bold cursor-pointer hover:text-red-500 transition-colors z-[10001]"
            >
                ✕
            </button>
        </div>
    )
}