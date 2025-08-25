// app/artifacts/page.tsx
'use client'
import { useState } from 'react'
import { getArtifacts } from '@/data/artifacts'
import ModelViewer from '@/components/ModelViewer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/languageContext'
import { uiTranslations } from '@/locales/ui'

export default function ArtifactsPage() {
  const { language } = useLanguage()
  const t = uiTranslations[language] as Record<string, string>
  const artifacts = getArtifacts(language)
  const [index, setIndex] = useState(0)
  const artifact = artifacts[index]
  const goNext = () => {
    if (index < artifacts.length - 1) setIndex(index + 1)
  }
  const goPrevious = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Map Icon */}
      <Link href="/map" className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 z-50">
        <Image
          src="/images/treasure-map.webp"
          alt="map"
          width={48}
          height={48}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 hover:scale-105 transition-transform duration-200"
        />
      </Link>
      {/* Responsive Logo Navigation */}
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 flex flex-col items-center space-y-6 md:space-y-8">
        {/* Title */}
        <h1 className="text-black font-bold text-center px-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {t.egyptianMarvels}
        </h1>
        <h1 className="text-yellow-600 font-bold text-center px-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {artifact.name}
        </h1>
        {/* Model + Description */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full items-center md:items-start">
          {/* 3D Model */}
          <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center md:items-end space-y-2">
            <div className="flex justify-center md:justify-end w-full">
              <Image
                src="/images/orbitcontrols.png"
                alt="movement icon"
                width={20}
                height={20}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 translate-y-4 md:translate-y-6"
              />
            </div>
            <div className="w-full">
              <ModelViewer modelUrl={artifact.model} uniqueKey={artifact.id} />
            </div>
          </div>
          {/* Description */}
          <motion.div
            key={artifact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-1/2 lg:w-2/5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 md:p-8 text-center md:text-left space-y-3 shadow-lg"
          >
            <p className="text-xs sm:text-sm md:text-base text-lime-200 tracking-wide">
              📜 {artifact.period} • 📍 {artifact.location}
            </p>
            <p className="text-orange-100 leading-relaxed font-semibold text-sm sm:text-base md:text-lg">
              {artifact.description}
            </p>
          </motion.div>
        </div>
        {/* Navigation */}
        <div className="flex gap-3 md:gap-4 mt-4 md:mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md ">
          <button
            onClick={goPrevious}
            disabled={index === 0}
            className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors duration-200 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base font-medium"
          >
            ◀ {t.previous}
          </button>
          <button
            onClick={goNext}
            disabled={index === artifacts.length - 1}
            className="flex-1 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors duration-200 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base font-medium"
          >
            {t.next} ▶
          </button>
        </div>
        <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 text-white text-xs sm:text-sm md:text-base z-40 pointer-events-none">
          {t.designedBy}
        </div>

      </div>
    </div>
  )
}