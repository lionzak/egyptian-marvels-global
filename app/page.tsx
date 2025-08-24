// app/page.tsx (modified)
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/i18n/languageContext'
import { uiTranslations } from '@/locales/ui'

export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const t = uiTranslations[language] as Record<string, string | ((year: number) => string)>

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 text-gray-800 overflow-x-hidden">
      {/* Language Dropdown */}
      <div className="fixed top-2 right-2 z-50">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'ru' | 'fr' | 'de')}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      {/*design by */}
      <div className="fixed top-2 left-2 sm:bottom-4 sm:left-4 text-black text-xs sm:text-sm md:text-base z-40 pointer-events-none">
        {t.designedBy as string}
      </div>
      {/* Hero */}
      <section className="relative text-center px-4 pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-yellow-800 leading-tight">
            {t.egyptianWonders as string}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            {t.diveInto as string}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/map"
              className="bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-800 transition-colors"
            >
              {t.exploreMap as string}
            </Link>
            <Link
              href="/artifacts"
              className="flex justify-center items-center gap-2 px-6 py-3 border border-yellow-700 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
            >
              {t.viewArtifacts as string}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        {/* Hero Image */}
        <Image
          src="/images/view.jpg"
          alt="Pharaoh"
          width={600}
          height={400}
          className="mx-auto mt-10 rounded-xl shadow-xl"
        />
      </section>

      {/* Features */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {[
            {
              title: t.realistic3D as string,
              desc: t.studyArtifacts as string,
              icon: '/images/3d.png',
            },
            {
              title: t.interactiveMap as string,
              desc: t.clickLocations as string,
              icon: '/images/map-view.png',
            },
            {
              title: t.learnLegends as string,
              desc: t.discoverStories as string,
              icon: '/images/temple.webp',
            },
          ].map((item) => (
            <div key={item.title} className="bg-yellow-50 rounded-xl shadow p-6">
              {item.title === t.learnLegends ? <Image src={item.icon} alt={item.title} width={400} height={200} className="mx-auto mb-4" /> : <Image src={item.icon} alt={item.title} width={200} height={200} className="mx-auto mb-4" />
              }
              <h3 className="text-xl font-bold text-yellow-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview section */}
      <section className="py-14 px-4 bg-yellow-100 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-900">{t.experienceAncient as string}</h2>
        <p className="text-gray-700 max-w-2xl mx-auto mt-4">
          {t.ourCollection as string}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Image
            src="/images/giza.avif"
            alt="Giza Preview"
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:scale-105 transition-transform"
          />
          <Image
            src="/images/luxor.webp"
            alt="Luxor Preview"
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:scale-105 transition-transform"
          />
          <Image
            src="/images/kings.avif"
            alt="Valley of the Kings"
            width={300}
            height={200}
            className="rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-yellow-700 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">{t.startJourney as string}</h2>
        <p className="mt-3 text-lg max-w-xl mx-auto">
          {t.travelHistory as string}
        </p>
        <Link
          href="/artifacts"
          className="mt-6 inline-block bg-white text-yellow-800 font-bold py-3 px-6 rounded-lg hover:bg-yellow-100 transition"
        >
          {t.viewArtifacts as string}
        </Link>
      </section>

      
    </div>
  )
}