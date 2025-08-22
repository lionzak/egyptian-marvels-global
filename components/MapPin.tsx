import { Site } from "@/data/sites";
import Image from "next/image";

// Pin component with dynamic pixel-based positioning
export const Pin = ({ site, onClick, mapDimensions }: { site: Site; onClick: () => void; mapDimensions: { width: number; height: number; offsetX: number; offsetY: number } }) => {
  // Convert percentage coordinates to pixel values, accounting for offsets
  const xPercent = parseFloat(site.x.replace('%', '')) / 100;
  const yPercent = parseFloat(site.y.replace('%', '')) / 100;
  const pixelX = mapDimensions.width ? mapDimensions.width * xPercent + mapDimensions.offsetX : 0;
  const pixelY = mapDimensions.height ? mapDimensions.height * yPercent + mapDimensions.offsetY : 0;

  return (
    <button
      className="absolute z-10 map-pin group"
      style={{ 
        left: `${pixelX}px`, 
        top: `${pixelY}px`,
        transform: 'translate(-50%, -50%)' // Center the pin on the coordinate
      }}
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src="/images/pin.webp"
          alt="Pin"
          width={32}
          height={32}
          className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-red-600 drop-shadow-lg hover:text-red-700 hover:scale-110 transition-all duration-200 cursor-pointer"
        />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
          {site.name}
        </div>
      </div>
    </button>
  );
};