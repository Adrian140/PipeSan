import React from 'react';
import { Wrench, Phone, Mail, MapPin, Award, Truck, Shield } from 'lucide-react';
function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
               <div className="w-10 h-10 bg-gradient-to-br from-primary to-copper rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
             </div>
               <span className="text-xl font-bold text-text-primary">PipeSan</span>
           </div>
            <p className="text-text-secondary mb-4">
               Professional plumbing parts and pipe fittings supplier for Europe. High-quality brass and stainless steel components with technical specifications, certificates and fast delivery. Serving professionals and installers since 2020.
           </p>
            <div className="flex space-x-4">
               <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-copper mr-2" />
                  <span className="text-sm text-text-secondary">CE Certified</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-text-secondary">ISO 9001</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-accent mr-2" />
                  <span className="text-sm text-text-secondary">Fast EU Delivery</span>
                </div>
              </div>
           </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-text-secondary" />
                 <span className="text-text-secondary">info@pipesan.eu</span>
             </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-text-secondary" />
                 <span className="text-text-secondary">+33 1 23 45 67 89</span>
             </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-text-secondary mt-1" />
                <span className="text-text-secondary">
                   Zone Industrielle Nord<br />
                  69120 Vaulx-en-Velin, France
               </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <div className="space-y-2">
               <a href="/categories" className="block text-text-secondary hover:text-primary transition-colors">
                Product Categories
             </a>
               <a href="/technical-specs" className="block text-text-secondary hover:text-primary transition-colors">
                Technical Specifications
             </a>
               <a href="/b2b" className="block text-text-secondary hover:text-primary transition-colors">
                B2B Solutions
             </a>
               <a href="/support" className="block text-text-secondary hover:text-primary transition-colors">
                Technical Support
             </a>
               <a href="/terms" className="block text-text-secondary hover:text-primary transition-colors">
                Terms of Service
             </a>
               <a href="/privacy-policy" className="block text-text-secondary hover:text-primary transition-colors">
                Privacy Policy
             </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-100 border-t py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-text-light">
            AI vibe coded development by{' '}
            <a 
              href="https://biela.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Biela.dev
            </a>
            , powered by{' '}
            <a 
              href="https://teachmecode.ae/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              TeachMeCode® Institute
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;