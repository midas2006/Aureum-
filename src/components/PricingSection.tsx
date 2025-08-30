import React from 'react';
import { Check, Star } from 'lucide-react';

const packages = [
  {
    name: 'Landing Page',
    price: '$399.99',
    audience: 'Startups and lead generation campaigns',
    features: [
      'Single conversion-focused page',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO optimization',
      'Free frontend preview'
    ],
    delivery: '48-hour delivery',
    revisions: '2 rounds revisions',
    popular: false
  },
  {
    name: 'One-Page Site',
    price: '$999.99',
    audience: 'Complete business presence on one scrollable page',
    features: [
      'Multi-section single page',
      'Advanced mobile optimization',
      'Social media integration',
      'Analytics & tracking setup',
      'Free SEO optimization',
      'Performance optimization'
    ],
    delivery: '5-day delivery',
    revisions: '3 rounds revisions',
    popular: true
  },
  {
    name: 'Multi-Page Site',
    price: '$1,199.99',
    audience: 'Full-featured website for established businesses',
    features: [
      'Up to 7 custom pages',
      'Advanced navigation system',
      'Content management system',
      'Blog integration',
      'Advanced SEO optimization'
    ],
    delivery: '7-day delivery',
    revisions: 'Unlimited revisions',
    support: 'Free 30-day support',
    popular: false
  },
  {
    name: 'Booking System',
    price: '$1,299.99',
    audience: 'Appointment scheduling for service businesses',
    features: [
      'Calendar integration',
      'Payment processing',
      'Email notifications',
      'Client management portal',
      'Multi-service support'
    ],
    delivery: '10-day delivery',
    training: 'Training included',
    support: 'Free 60-day support',
    popular: false
  },
  {
    name: 'E-Commerce',
    price: '$1,500',
    audience: 'Complete online store solution',
    features: [
      'Product catalog management',
      'Shopping cart & checkout',
      'Payment gateway integration',
      'Order management system',
      'Inventory tracking'
    ],
    delivery: '14-day delivery',
    training: 'E-commerce training',
    support: 'Free 90-day support',
    popular: false
  }
];

const additionalServices = [
  {
    name: 'Custom Integrations',
    description: 'Connect your favorite tools and platforms',
    price: 'From $200'
  },
  {
    name: 'Ongoing Maintenance',
    description: 'Regular updates and security monitoring',
    price: '$99/month'
  },
  {
    name: 'Rush Delivery',
    description: 'Get your project delivered in half the time',
    price: '+50% fee'
  }
];

export default function PricingSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-12 sm:py-16 bg-gray-900 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Transparent pricing
            <span className="text-yellow-400"> that scales with you</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No hidden fees. No hourly rates. Just fixed pricing for predictable business growth.
          </p>
        </div>

        {/* Main Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {packages.map((pkg, index) => (
            <div key={index} className={`bg-gray-800 rounded-xl border-2 p-4 sm:p-6 relative w-full ${
              pkg.popular ? 'border-yellow-400 shadow-lg lg:transform lg:scale-105 ring-2 ring-yellow-400/20' : 'border-gray-700'
            }`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">{pkg.name}</h3>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">{pkg.price}</div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{pkg.audience}</p>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-xs sm:text-sm text-gray-300">
                    <Check size={14} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400">
                <div className="font-medium text-blue-400">{pkg.delivery}</div>
                <div>{pkg.revisions}</div>
                {pkg.training && <div>{pkg.training}</div>}
                {pkg.support && <div>{pkg.support}</div>}
              </div>
              
              <button
                onClick={scrollToContact}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors min-h-[44px] text-sm sm:text-base ${
                  pkg.popular 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Popular Add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-4">
                <h4 className="font-bold text-white mb-2 text-sm sm:text-base">{service.name}</h4>
                <p className="text-gray-300 text-xs sm:text-sm mb-2 leading-relaxed">{service.description}</p>
                <div className="text-yellow-400 font-semibold text-sm sm:text-base">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}