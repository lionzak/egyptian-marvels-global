'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const invisibleButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-play function
  const autoPlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Auto-play was prevented by browser:', error)
        // If auto-play fails, we can show a play button or handle it differently
      }
    }
  }

  // Trigger auto-play on component mount
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      if (invisibleButtonRef.current) {
        invisibleButtonRef.current.click()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const togglePlay = async () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Play was prevented:', error)
        }
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/music/audio.mp3" // Replace with your audio file path
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Invisible button for auto-trigger */}
      <button
        ref={invisibleButtonRef}
        onClick={autoPlay}
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Visible music controls - positioned fixed */}
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={togglePlay}
          className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </>
  )
}