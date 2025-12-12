import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BrandStoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Every brand has a story.
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-700">
              Here's ours.
            </h2>
          </div>

          {/* Main Content Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* Hero Image Section */}
              <div className="relative h-80 md:h-96 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Simulated Product Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Brand Box */}
                    <div className="bg-slate-900 text-amber-400 p-8 rounded-lg shadow-xl transform -rotate-3 mb-8">
                      <div className="text-2xl font-bold tracking-wider">FAHRENHEIT</div>
                    </div>
                    
                    {/* Stacked Clothing Items */}
                    <div className="flex space-x-4 mt-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg transform rotate-12"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg transform -rotate-6"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg shadow-lg transform rotate-3"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg transform -rotate-12"></div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 space-y-8">
                {/* The Brand Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2 inline-block">
                    The Brand
                  </h3>
                  
                  <div className="space-y-4 text-slate-700 leading-relaxed">
                    <p className="text-lg">
                      The year was 1992. As a host of global fashion brands vied for the affection of an increasingly suave Indian customer base, we realized the time was ripe to create a fashion brand, made in India, styled and priced for the global Indian. And so{' '}
                      <span className="font-semibold text-amber-600">Fahrenheit</span> was born.
                    </p>
                    
                    <p className="text-lg">
                      The brain child of a team of exceptionally talented individuals, Fahrenheit is the gold standard in contemporary style and unparalleled craftsmanship. We are{' '}
                      <span className="font-semibold text-slate-800">proud to be reputable</span> shots who let our product do the talking.
                    </p>
                    
                    <p className="text-lg">
                      Whether you're hanging out with your mates, waxing eloquent on a zoom call, or even going out for a date night, there's a Fahrenheit for every occasion.
                    </p>
                  </div>
                </div>

                {/* Our Vision Section */}
                <div className="space-y-6 pt-8 border-t border-slate-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 border-b-2 border-amber-400 pb-2 inline-block">
                    Our Vision
                  </h3>
                  
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Our vision is to leave behind a superior brand that's made in India, a brand that's unflinching in its commitment to{' '}
                    <span className="font-semibold text-amber-600">quality and innovation</span>.
                  </p>
                </div>

                {/* Call to Action */}
                <div className="pt-8 text-center">
                  <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                    Discover Our Collection
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandStoryPage;