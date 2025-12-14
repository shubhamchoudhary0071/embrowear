"use client";

import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen min-h-[500px] overflow-hidden">
      {/* Video Background */}
      <video
        src="/videos/hero.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline // Important for mobile browsers (especially iOS)
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6 md:mb-8">
            SUMMER
            <br />
            IS CALLING
          </h1>

          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-gray-100 font-semibold px-8 py-6 text-base sm:text-lg md:text-xl shadow-lg transition-all duration-300"
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;