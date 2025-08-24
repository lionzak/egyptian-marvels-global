// app/ClientProtections.tsx
"use client";
import { useEffect } from "react";

export default function ClientProtections() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleSelectStart = (e: Event) => e.preventDefault();
        const handleCopy = (e: ClipboardEvent) => {
            e.preventDefault();
            alert("Copying is not allowed on this site!");
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("selectstart", handleSelectStart);
        document.addEventListener("copy", handleCopy);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("selectstart", handleSelectStart);
            document.removeEventListener("copy", handleCopy);
        };
    }, []);

    return null; // This component doesn’t render anything
}
