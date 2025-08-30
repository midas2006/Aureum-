import React from 'react';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 border-t border-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-2 mr-2 sm:mr-3">
                <span className="font-bold text-lg sm:text-xl">A</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Aureum</h3>
                <p className="text-xs sm:text-sm text-gray-400">Web Development</p>
              </div>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 max-w-md text-sm sm:text-base leading-relaxed">
              U.S.-focused web development agency delivering fast, research-driven websites that convert visitors into customers.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-300 text-sm sm:text-base">
              <div className="flex items-center">
                <Mail size={14} className="mr-2 flex-shrink-0" />
                <span>admin@aureumweb.online</span>
              </div>
              <div className="flex items-center">
                <Globe size={14} className="mr-2 flex-shrink-0" />
                <span>aureumweb.online</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-base sm:text-lg">Services</h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Landing Pages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  One-Page Sites
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Multi-Page Sites
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Booking Systems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  E-Commerce
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-white text-base sm:text-lg">Get Started</h4>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  View Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-yellow-400 transition-colors text-left"
                >
                  Free Quote
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2025 Aureum Web Development. All rights reserved.</p>
          <p className="mt-1 sm:mt-2">Fast, research-driven websites that convert visitors into customers.</p>
        </div>
      </div>
    </footer>
  );
}