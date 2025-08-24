import React, { useState } from 'react';
import { Wrench, Shield, Truck, Award, ArrowRight, CheckCircle, Star, Settings } from 'lucide-react';
import { useTranslation } from '../translations';

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useTranslation();

  const whyChooseUs = [
    {
      icon: Wrench,
      title: t('heroTitle'),
      description: t('heroSubtitle')
    },
    {
      icon: Shield,
      title: "Professional Quality Guarantee",
      description: "CE certified products with technical specifications and quality assurance for professional installations"
    },
    {
      icon: Truck,
      title: "Fast European Delivery",
      description: "Strategic warehouse locations across Europe for rapid delivery of plumbing parts and components"
    },
    {
      icon: Award,
      title: "Technical Support & Expertise",
      description: "Professional technical support team with expertise in plumbing installations and component specifications"
    }
  ];

  const orderProcess = [
    { step: "Browse", description: "Browse our extensive catalog of professional parts" },
    { step: "Select", description: "Choose products with detailed technical specifications" },
    { step: "Configure", description: "Select variants, quantities and delivery options" },
    { step: "Order", description: "Secure checkout with multiple payment methods" },
    { step: "Ship", description: "Fast processing and dispatch to your location" },
    { step: "Install", description: "Professional installation with our quality parts" }
  ];
  const testimonials = [
    {
       name: "Jean-Pierre Dubois",
      company: "Dubois Plomberie",
      text: "PipeSan provides excellent quality brass fittings with fast delivery. Perfect for our professional installations!",
     rating: 5
    },
    {
       name: "Marco Rossi",
      company: "Rossi Impianti",
      text: "Outstanding technical support and product quality. The specifications are always accurate and complete.",
     rating: 5
    },
    {
       name: "Klaus Mueller",
      company: "Mueller Sanitär GmbH",
      text: "Reliable supplier with CE certified products. Great for both B2B and professional installations.",
     rating: 5
    }
  ];

   const certifications = [
    { name: "CE Marking", logo: "🏆" },
    { name: "ISO 9001", logo: "📋" },
    { name: "WRAS Approved", logo: "💧" },
    { name: "ACS Certified", logo: "✅" },
    { name: "KTW Approved", logo: "🔬" },
    { name: "FDA Compliant", logo: "🛡️" }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <button className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl">
                Browse Products
              </button>
           </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
               Why Choose PipeSan for Professional Plumbing Parts
           </h2>
            <p className="text-lg sm:text-xl text-text-secondary">
               Professional plumbing components and installation parts designed for European professionals
           </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-200">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
               How to Order
           </h2>
            <p className="text-lg sm:text-xl text-text-secondary">
               Simple 6-step process from selection to installation
           </p>
          </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {orderProcess.map((item, index) => (
             <div key={index} className="text-center">
                <div className="bg-primary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-sm sm:text-base">
                  {index + 1}
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-text-primary mb-2">
                  {item.step}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary">
                  {item.description}
                </p>
                 {index < orderProcess.length - 1 && (
                 <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-text-light mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
               What Our Professional Clients Say
           </h2>
            <p className="text-lg sm:text-xl text-text-secondary">
               Trusted by professional installers across Europe
           </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-base sm:text-lg text-text-secondary mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="text-sm sm:text-base font-semibold text-text-primary">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sm sm:text-base text-text-secondary">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Carriers */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
               Quality Certifications & Standards
           </h2>
            <p className="text-sm sm:text-base text-text-secondary">
               All products meet European standards and certifications
           </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 lg:gap-8 items-center justify-items-center">
             {certifications.map((cert, index) => (
             <div key={index} className="text-center">
                 <div className="text-2xl sm:text-4xl mb-2">{cert.logo}</div>
                <p className="text-xs sm:text-sm font-medium text-text-secondary">{cert.name}</p>
             </div>
            ))}
          </div>
        </div>
      </section>

       {/* Product Categories */}
     <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
               Professional Product Categories
           </h2>
            <p className="text-lg sm:text-xl text-text-secondary">
               Complete range of plumbing parts and installation components
           </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
               <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">Brass & Steel Components</h3>
             <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">CW617N brass ball valves and fittings</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">316L stainless steel components</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">BSP and NPT threaded connections</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">Pressure ratings up to PN40</span>
               </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 rounded-xl">
               <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">Professional Tools & Accessories</h3>
             <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">Professional installation tools</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">Gaskets and sealing solutions</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">Flexible hoses and connections</span>
               </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                   <span className="text-sm sm:text-base text-text-secondary">Technical documentation included</span>
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
             Ready to Source Professional Plumbing Parts in Europe?
         </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
             Browse our extensive catalog of professional plumbing parts. CE certified components, technical specifications and fast delivery across Europe for professional installers.
         </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
               {t('requestCatalog')}
           </button>
             <button className="w-full sm:w-auto bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-dark transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse Products
            </button>
         </div>
        </div>
      </section>
    </div>
  );
}

export default Home;