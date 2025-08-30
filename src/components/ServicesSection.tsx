import React from 'react';
import { Globe, Smartphone, Layout, Calendar, ShoppingCart } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Landing Page Development',
    description: 'Single conversion-focused page designed to turn visitors into leads',
    features: ['Responsive design', 'SEO optimized', 'Contact forms', 'Fast loading']
  },
  {
    icon: Smartphone,
    title: 'One-Page Websites',
    description: 'Complete business presence on one scrollable page',
    features: ['All-in-one design', 'Mobile optimized', 'Social integration', 'Analytics setup']
  },
  {
    icon: Layout,
    title: 'Multi-Page Websites',
    description: 'Full-featured website for established businesses',
    features: ['Custom navigation', 'Content management', 'Blog integration', 'Advanced SEO']
  },
  {
    icon: Calendar,
    title: 'Booking Systems',
    description: 'Appointment scheduling for service businesses',
    features: ['Calendar integration', 'Payment processing', 'Email notifications', 'Client management']
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description: 'Complete online store solution',
    features: ['Product catalogs', 'Shopping cart', 'Payment gateways', 'Order management']
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-16 bg-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Services that drive
            <span className="text-yellow-400"> real business growth</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From simple landing pages to complex e-commerce solutions, we build websites that work for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-gray-900 rounded-xl border border-gray-700 p-4 sm:p-6 hover:shadow-lg hover:border-gray-600 transition-all">
                <div className="bg-blue-900/30 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <IconComponent className="text-blue-400" size={20} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">{service.title}</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{service.description}</p>
                
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}