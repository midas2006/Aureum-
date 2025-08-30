import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
}

const projectTypes = [
  'Landing Page',
  'One-Page Site',
  'Multi-Page Site',
  'Booking System',
  'E-Commerce'
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://kyejpmmlxhpzxzwadnlq.supabase.co/functions/v1/leads-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-gray-800 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Info */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Ready to grow
              <span className="text-yellow-400"> your business?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Let's discuss your project and create a website that drives real results for your business.
            </p>
            
            <div className="space-y-4 sm:space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Contact Information</h3>
                <p className="text-sm sm:text-base">Email: admin@aureumweb.online</p>
                <p className="text-sm sm:text-base">Response Time: Within 24 hours</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">What Happens Next?</h3>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                    <span>We'll review your project requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                    <span>Schedule a consultation call within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                    <span>Provide a detailed project proposal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                    <span>Start building your website</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2 bg-gray-900 border border-gray-700 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Get Your Free Quote</h3>
            
            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-green-400 text-sm sm:text-base">Thank you! We'll be in touch within 24 hours.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-red-400 text-sm sm:text-base">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[44px] text-base"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[44px] text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[44px] text-base"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="project_type" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                    Project Type *
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-3 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[44px] text-base"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-3 sm:py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-base resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-gray-900 py-3 sm:py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 min-h-[44px] text-base"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Get Started Today
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}