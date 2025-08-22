// components/SidePanel.tsx (modified)
import { Site } from "@/data/sites";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from '@/i18n/languageContext'
import { uiTranslations } from '@/locales/ui'

export const SidePanel = ({ site, onClose }: { site: Site; onClose: () => void }) => {
  const { language } = useLanguage()
  const t = uiTranslations[language] as Record<string, string>
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation on mount
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Reduced timeout for better UX
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none mr-5">
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden pointer-events-auto
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Desktop Panel - Right Side */}
      <div
        className={`absolute right-0 top-4 bottom-4 transform transition-transform duration-300 ease-in-out pointer-events-auto hidden lg:block
          ${isVisible ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="bg-white shadow-2xl max-w-md w-full max-h-full overflow-y-auto rounded-l-2xl">
          {/* Header */}
          <div className="relative">
            <img
              src={site.image}
              alt={site.name}
              className="w-full h-48 xl:h-56 object-cover rounded-tl-2xl"
            />
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all hover:cursor-pointer shadow-md"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-2">{site.name}</h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {site.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-4 text-sm xl:text-base">
              {site.description}
            </p>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">{t.quickFacts}</h3>
              <div className="space-y-3 text-sm xl:text-base text-gray-600">
                <div className="flex justify-between">
                  <span>{t.category}</span>
                  <span className="font-medium">{site.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.location}</span>
                  <span className="font-medium">{t.egypt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Panel - Bottom Slide Up */}
      <div
        className={`absolute left-0 right-0 bottom-0 transform transition-transform duration-300 ease-in-out pointer-events-auto lg:hidden
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <div className="bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="relative">
            <img
              src={site.image}
              alt={site.name}
              className="w-full h-40 sm:h-48 object-cover rounded-t-2xl"
            />
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all hover:cursor-pointer shadow-md"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{site.name}</h2>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                {site.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              {site.description}
            </p>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">{t.quickFacts}</h3>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
                <div className="flex justify-between">
                  <span>{t.category}</span>
                  <span className="font-medium">{site.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.location}</span>
                  <span className="font-medium">{t.egypt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Handle indicator for mobile */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full lg:hidden" />
        </div>
      </div>
    </div>
  );
};