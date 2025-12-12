"use client"
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-amber-100 to-orange-200 overflow-hidden">
    <div className="absolute inset-0 bg-black/20"></div>
    <video
    src="/videos/hero.mp4"
      className="absolute inset-0 bg-cover bg-center"
     autoPlay
     loop={true}
     muted
    />
    <div className="relative z-10 flex items-center justify-center h-full text-center">
      <div className="max-w-2xl px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          SUMMER
          <br />
          IS CALLING
        </h2>
        <Button
          size="lg" 
          className="bg-white text-slate-800 hover:bg-slate-100 font-semibold px-8 py-3 text-lg"
        >
          SHOP NOW
        </Button>
      </div>
    </div>
  </section>
  )
}

export default Hero
