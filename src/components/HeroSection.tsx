import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Fast, research-driven websites that convert
            <span className="text-yellow-400"> visitors into customers</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Helping U.S. businesses grow through professional websites that drive results.
            No hidden fees. No hourly rates. Just fixed pricing for predictable business growth.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center bg-green-900/30 border border-green-800 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-green-400 font-medium text-sm sm:text-base">Free SEO optimization</span>
            </div>
            <div className="flex items-center bg-blue-900/30 border border-blue-800 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-blue-400 font-medium text-sm sm:text-base">Frontend preview included</span>
            </div>
            <div className="flex items-center bg-yellow-900/30 border border-yellow-700 px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto justify-center sm:justify-start">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-yellow-400 font-medium text-sm sm:text-base">Split payment options</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all transform hover:scale-105 inline-flex items-center gap-2 min-h-[44px] w-full sm:w-auto justify-center"
          >
            Start Your Project Today
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>

          <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
            No-spam outreach • Fast research-driven builds
          </p>
        </div>
      </div>
    </section>
  );
}