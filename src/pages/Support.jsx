import React, { useState } from 'react';
import { HelpCircle, FileText, Video, MessageCircle, Phone, Mail, Download, Search } from 'lucide-react';

function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportCategories = [
    { id: 'all', name: 'All Topics' },
    { id: 'installation', name: 'Installation' },
    { id: 'specifications', name: 'Technical Specs' },
    { id: 'ordering', name: 'Ordering & Delivery' },
    { id: 'returns', name: 'Returns & RMA' },
    { id: 'account', name: 'Account Management' }
  ];

  const faqItems = [
    {
      category: 'specifications',
      question: 'What does DN mean in pipe sizing?',
      answer: 'DN (Diamètre Nominal) is the European standard for pipe sizing. DN15 = 1/2", DN20 = 3/4", DN25 = 1", DN32 = 1 1/4", etc. It represents the approximate internal diameter in millimeters.'
    },
    {
      category: 'specifications',
      question: 'What is the difference between BSP and NPT threads?',
      answer: 'BSP (British Standard Pipe) has a 55° thread angle and is parallel or tapered. NPT (National Pipe Thread) has a 60° thread angle and is always tapered. BSP is more common in Europe, NPT in North America.'
    },
    {
      category: 'installation',
      question: 'What pressure rating do I need for domestic installations?',
      answer: 'For domestic water systems, PN10 (10 bar) is typically sufficient. For commercial or high-pressure applications, consider PN16 (16 bar) or higher. Always check local building codes.'
    },
    {
      category: 'installation',
      question: 'Can I mix brass and stainless steel fittings?',
      answer: 'Yes, but use dielectric unions to prevent galvanic corrosion. Direct contact between dissimilar metals in water systems can cause corrosion over time.'
    },
    {
      category: 'ordering',
      question: 'Do you offer same-day shipping?',
      answer: 'Yes, orders placed before 2 PM CET are shipped the same day via UPS Express. Standard orders are processed within 24 hours.'
    },
    {
      category: 'ordering',
      question: 'What are your minimum order quantities?',
      answer: 'No minimum order for retail customers. B2B customers have volume discounts starting from 50 pieces. Custom quotes available for large projects.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: '30-day return policy for unused products in original packaging. Custom or modified products cannot be returned. RMA number required for all returns.'
    },
    {
      category: 'account',
      question: 'How do I set up a B2B account?',
      answer: 'Register online and select "Business Account". Provide company details and VAT number. Our team will verify and activate B2B pricing within 24 hours.'
    }
  ];

  const technicalGuides = [
    {
      title: 'Pipe Sizing & Thread Guide',
      description: 'Complete guide to pipe sizing, DN/inch conversions and thread types',
      downloadUrl: '#',
      pages: 24,
      languages: ['EN', 'FR', 'DE']
    },
    {
      title: 'Material Selection Guide',
      description: 'Choosing the right materials for different applications and environments',
      downloadUrl: '#',
      pages: 18,
      languages: ['EN', 'FR', 'DE', 'IT']
    },
    {
      title: 'Pressure Rating Reference',
      description: 'Understanding PN ratings, pressure classes and safety factors',
      downloadUrl: '#',
      pages: 12,
      languages: ['EN', 'FR', 'DE', 'ES']
    },
    {
      title: 'Installation Best Practices',
      description: 'Professional installation techniques and common troubleshooting',
      downloadUrl: '#',
      pages: 32,
      languages: ['EN', 'FR', 'DE', 'IT', 'ES']
    }
  ];

  const filteredFAQ = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Technical Support & Resources
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get expert help with product selection, technical specifications and installation guidance. 
            Our technical team is here to support your professional projects.
          </p>
        </div>

        {/* Contact Options */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Get Technical Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Phone Support</h3>
              <p className="text-text-secondary mb-4">Direct line to our technical team</p>
              <p className="font-semibold text-primary mb-4">+33 1 23 45 67 89</p>
              <p className="text-sm text-text-light">Mon-Fri: 8:00-18:00 CET</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Email Support</h3>
              <p className="text-text-secondary mb-4">Detailed technical inquiries</p>
              <p className="font-semibold text-primary mb-4">technical@pipesan.eu</p>
              <p className="text-sm text-text-light">Response within 4 hours</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Live Chat</h3>
              <p className="text-text-secondary mb-4">Instant help with product selection</p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                Start Chat
              </button>
              <p className="text-sm text-text-light mt-2">Available 9:00-17:00 CET</p>
            </div>
          </div>
        </section>

        {/* Technical Guides */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Technical Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-primary mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{guide.title}</h3>
                      <p className="text-sm text-text-secondary">{guide.description}</p>
                    </div>
                  </div>
                  <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{guide.pages} pages</span>
                  <div className="flex gap-1">
                    {guide.languages.map((lang, langIndex) => (
                      <span key={langIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Frequently Asked Questions
          </h2>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {supportCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
                  <HelpCircle className="w-5 h-5 text-primary mr-2" />
                  {item.question}
                </h3>
                <p className="text-text-secondary leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          {filteredFAQ.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-secondary mb-2">No results found</h3>
              <p className="text-text-light">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-12">
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Our technical experts are ready to assist with your specific requirements and project needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors">
                Contact Technical Team
              </button>
              <button className="bg-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-dark transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Support;
