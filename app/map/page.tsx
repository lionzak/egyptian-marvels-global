// app/map/page.tsx
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getSites, Site } from '@/data/sites';
import { Pin } from '@/components/MapPin';
import { SidePanel } from '@/components/SidePanel';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/languageContext'
import { uiTranslations } from '@/locales/ui'

export default function EgyptInteractiveMap() {
  const { language } = useLanguage()
  const t = uiTranslations[language] as Record<string, string>
  const egyptianSites = getSites(language)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [mapDimensions, setMapDimensions] = useState<{
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  }>({ width: 0, height: 0, offsetX: 0, offsetY: 0 });
  const mapRef = useRef<HTMLImageElement>(null);

  // Calculate map image dimensions and offsets
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const img = mapRef.current;
        const rect = img.getBoundingClientRect();
        const { naturalWidth, naturalHeight } = img;

        // Calculate scaled dimensions and offsets for object-contain
        const containerAspect = rect.width / rect.height;
        const imageAspect = naturalWidth / naturalHeight;
        let scaledWidth = rect.width;
        let scaledHeight = rect.height;
        let offsetX = 0;
        let offsetY = 0;

        if (containerAspect > imageAspect) {
          // Container is wider, image is scaled by height
          scaledWidth = rect.height * imageAspect;
          offsetX = (rect.width - scaledWidth) / 2;
        } else {
          // Container is taller, image is scaled by width
          scaledHeight = rect.width / imageAspect;
          offsetY = (rect.height - scaledHeight) / 2;
        }

        // Add slight adjustment for mobile to correct leftward shift
        const isMobile = window.innerWidth < 640; // Tailwind's 'sm' breakpoint
        if (isMobile) {
          offsetX += 5; // Adjust offsetX by 5px to compensate for left shift
        }

        setMapDimensions({ width: scaledWidth, height: scaledHeight, offsetX, offsetY });
      }
    };

    // Check if image is loaded
    if (mapRef.current?.complete) {
      updateDimensions();
    } else {
      mapRef.current?.addEventListener('load', updateDimensions);
    }

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (mapRef.current) {
        mapRef.current.removeEventListener('load', updateDimensions);
      }
    };
  }, []);

  const handlePinClick = (site: Site) => {
    setSelectedSite(site);
  };

  const handleClosePanel = () => {
    setSelectedSite(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-2 sm:p-4">
      {/* Responsive Navigation Header */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-8 sm:right-auto z-50">

        {/*design by */}
        <div className="fixed top-2 right-2 sm:bottom-4 sm:right-4 text-black text-xs sm:text-sm md:text-base z-40 pointer-events-none">
          {t.designedBy}
        </div>

        {/* Mobile Layout (below sm) */}
        <div className="flex items-center justify-between sm:hidden">
          <Link href="/">
            <ArrowLeft className="text-black hover:text-gray-700 transition-colors duration-200" size={24} />
          </Link>
        </div>

        {/* Tablet and Desktop Layout (sm and above) */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4 lg:gap-6">
          <Link href="/">
            <ArrowLeft className="text-black hover:text-gray-700 transition-colors duration-200" size={28} />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 mt-16 sm:mt-12 lg:mt-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 px-2">
            {t.exploreAncientEgypt}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t.clickIcons}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl mx-2 sm:mx-0">
          <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px]">
            {/* Egypt Map Background */}
            <img
              src="/images/map.webp"
              alt="Egypt Map"
              ref={mapRef}
              className="absolute inset-0 w-full h-full object-contain"
              onClick={(e) => {
                const container = e.currentTarget;
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                console.log(`X: ${x.toFixed(2)}%, Y: ${y.toFixed(2)}%`);
              }}
            />

            {/* Pins */}
            {egyptianSites.map((site) => (
              <Pin
                key={site.id}
                site={site}
                onClick={() => handlePinClick(site)}
                mapDimensions={mapDimensions}
              />
            ))}

            {/* Legend */}
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white bg-opacity-90 rounded-lg p-3 sm:p-4 shadow-lg max-w-36 sm:max-w-none">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">{t.legend}</h3>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                <Image src="/images/pin.webp" alt="Pin" width={16} height={16} className="sm:w-5 sm:h-5" />
                <span>{t.historicalSites}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {t.clickToExplore}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 px-2 sm:px-0">
          <div className="text-center p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">5000+</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-600">{t.yearsHistory}</div>
          </div>
          <div className="text-center p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">7</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-600">{t.unescoSites}</div>
          </div>
          <div className="text-center p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">∞</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-600">{t.wonders}</div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedSite && (
        <SidePanel
          site={selectedSite}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}