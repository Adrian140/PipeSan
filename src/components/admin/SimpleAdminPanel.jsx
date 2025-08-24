import React, { useState } from 'react';
import { Settings, DollarSign, FileText, LogOut, Save, Edit } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

function SimpleAdminPanel() {
  const { adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('content');
  const [message, setMessage] = useState('');
  
  // Stare pentru tot conținutul site-ului
 const [content, setContent] = useState({
     // Hero Section
   heroTitle: 'Prep Center France – 24h Turnaround to Amazon FBA',
    heroSubtitle: 'Reception, quality control, FNSKU labeling, polybagging & fast shipping to EU Amazon FCs.',
     
    // Contact Info
   phone: '+33 6 75 11 62 18',
    email: 'contact@prep-center.eu',
    address: '35350 La Gouesnière, France',
    whatsappLink: 'https://wa.me/33675116218',
     calendlyLink: 'https://calendly.com/global-fulfill-hub',
    
    // Pricing
    fnSkuStandard: '€0.50',
    fnSkuNewCustomer: '€0.45',
    fbmStarter: '€1.20',
    fbmGrowth: '€1.10',
    fbmEnterprise: '€0.95',
    storagePerPallet: '€15',
    climateControlled: '+€5',
    
    // Services Page Content
    standardFBATitle: 'Standard FBA Services',
    standardFBASubtitle: 'Complete prep solution with everything included',
    fnSkuLabelingTitle: 'FNSKU Labeling Service',
    privateLabelTitle: 'Private Label & Multi-Platform Services',
    privateLabelSubtitle: 'Complete fulfillment solutions for Amazon, eBay, Shopify and custom websites',
    fbmShippingTitle: 'FBM Shipping Rates',
    fbmShippingSubtitle: 'Competitive rates based on your monthly volume',
    storageTitle: 'Storage Solutions',
    storageSubtitle: 'Secure and affordable storage for your inventory',
    
    // About Page Content
    aboutTitle: 'Reliable French Prep Center for European Sellers',
    aboutSubtitle: 'Founded by Adrian Bucur, 4+ years Amazon experience. We handle end-to-end FBA prep.',
    ourStoryP1: 'Prep Center France was founded with a simple mission: to provide European Amazon sellers with reliable, fast, and professional FBA preparation services.',
    ourStoryP2: 'Our founder, Adrian Bucur, brings over 4 years of hands-on Amazon FBA experience.',
    ourStoryP3: 'Today, we handle hundreds of orders monthly across multiple platforms including Amazon FBA/FBM, eBay, Shopify, and custom websites.',
    ourStoryP4: 'We believe in building long-term partnerships with our clients, providing not just prep services but also Private Label consultation.',
    
    // Contact Page Content
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Ready to streamline your FBA operations? Contact our team today for a personalized consultation.'
 });

  const tabs = [
     { id: 'content', label: 'Conținut Site', icon: FileText },
   { id: 'pricing', label: 'Prețuri', icon: DollarSign },
    { id: 'settings', label: 'Setări', icon: Settings }
  ];

   const handleSaveAll = () => {
   // În implementarea reală, aici ai salva în baza de date
    localStorage.setItem('adminContent', JSON.stringify(content));
     setMessage('Toate modificările au fost salvate cu succes!');
   setTimeout(() => setMessage(''), 3000);
  };

  const renderContentTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Editare Conținut Complet Site</h2>
      
      {/* Hero Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Secțiunea Hero (Homepage)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu Principal Hero
            </label>
            <input
              type="text"
              value={content.heroTitle}
              onChange={(e) => handleContentChange('heroTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subtitlu Hero
            </label>
            <textarea
              value={content.heroSubtitle}
              onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Services Page Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Pagina Services & Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu Standard FBA
            </label>
            <input
              type="text"
              value={content.standardFBATitle}
              onChange={(e) => handleContentChange('standardFBATitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subtitlu Standard FBA
            </label>
            <input
              type="text"
              value={content.standardFBASubtitle}
              onChange={(e) => handleContentChange('standardFBASubtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu FNSKU Labeling
            </label>
            <input
              type="text"
              value={content.fnSkuLabelingTitle}
              onChange={(e) => handleContentChange('fnSkuLabelingTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu Private Label
            </label>
            <input
              type="text"
              value={content.privateLabelTitle}
              onChange={(e) => handleContentChange('privateLabelTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Subtitlu Private Label
          </label>
          <textarea
            value={content.privateLabelSubtitle}
            onChange={(e) => handleContentChange('privateLabelSubtitle', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* About Page Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Pagina About</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu About
            </label>
            <input
              type="text"
              value={content.aboutTitle}
              onChange={(e) => handleContentChange('aboutTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subtitlu About
            </label>
            <textarea
              value={content.aboutSubtitle}
              onChange={(e) => handleContentChange('aboutSubtitle', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Paragraful 1 - Our Story
            </label>
            <textarea
              value={content.ourStoryP1}
              onChange={(e) => handleContentChange('ourStoryP1', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Paragraful 2 - Our Story
            </label>
            <textarea
              value={content.ourStoryP2}
              onChange={(e) => handleContentChange('ourStoryP2', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Contact Page Content */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Pagina Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Titlu Contact
            </label>
            <input
              type="text"
              value={content.contactTitle}
              onChange={(e) => handleContentChange('contactTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subtitlu Contact
            </label>
            <textarea
              value={content.contactSubtitle}
              onChange={(e) => handleContentChange('contactSubtitle', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveAll}
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center"
      >
        <Save className="w-5 h-5 mr-2" />
        Salvează Tot Conținutul
      </button>
    </div>
  );

  const handleContentChange = (field, value) => {
    setContent({
      ...content,
      [field]: value
    });
  };

  const renderPricingTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Gestionare Prețuri</h2>
      
      {/* FBA Pricing */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Prețuri FBA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preț Standard FNSKU
            </label>
            <input
              type="text"
              value={content.fnSkuStandard}
              onChange={(e) => handleContentChange('fnSkuStandard', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preț Clienți Noi FNSKU
            </label>
            <input
              type="text"
              value={content.fnSkuNewCustomer}
              onChange={(e) => handleContentChange('fnSkuNewCustomer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* FBM Pricing */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Prețuri FBM</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Starter (0-999 units/month)
            </label>
            <input
              type="text"
              value={content.fbmStarter}
              onChange={(e) => handleContentChange('fbmStarter', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Growth (1000-1999 units/month)
            </label>
            <input
              type="text"
              value={content.fbmGrowth}
              onChange={(e) => handleContentChange('fbmGrowth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Enterprise (2000+ units/month)
            </label>
            <input
              type="text"
              value={content.fbmEnterprise}
              onChange={(e) => handleContentChange('fbmEnterprise', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Storage Pricing */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Prețuri Storage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Storage per Pallet (per month)
            </label>
            <input
              type="text"
              value={content.storagePerPallet}
              onChange={(e) => handleContentChange('storagePerPallet', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Climate Controlled (extra)
            </label>
            <input
              type="text"
              value={content.climateControlled}
              onChange={(e) => handleContentChange('climateControlled', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveAll}
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center"
      >
        <Save className="w-5 h-5 mr-2" />
        Salvează Prețurile
      </button>
    </div>
  );

  const renderContactInfoTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Informații Contact</h2>
      
      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Date de Contact</h3>
        <div className="space-y-4">
         <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Telefon
            </label>
            <input
              type="text"
              value={content.phone}
              onChange={(e) => handleContentChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={content.email}
              onChange={(e) => handleContentChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
           <div>
           <label className="block text-sm font-medium text-text-primary mb-2">
              Adresă
            </label>
             <textarea
             value={content.address}
              onChange={(e) => handleContentChange('address', e.target.value)}
               rows={2}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Link WhatsApp
            </label>
            <input
              type="url"
              value={content.whatsappLink}
              onChange={(e) => handleContentChange('whatsappLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Link Calendly
            </label>
            <input
              type="url"
              value={content.calendlyLink}
              onChange={(e) => handleContentChange('calendlyLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <button
         onClick={handleSaveAll}
       className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center"
      >
        <Save className="w-5 h-5 mr-2" />
         Salvează Informațiile de Contact
     </button>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Setări Generale</h2>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Informații Site</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nume Site
            </label>
            <input
              type="text"
              defaultValue="Prep Center France"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Descriere SEO
            </label>
            <textarea
              defaultValue="Professional Amazon FBA prep center in France. 24h turnaround, quality control, FNSKU labeling, polybagging & fast shipping to European Amazon fulfillment centers."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Limba Implicită
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="es">Español</option>
              <option value="ro">Română</option>
            </select>
          </div>
        </div>
        
        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center">
          <Save className="w-5 h-5 mr-2" />
          Salvează Setările
        </button>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Informații Admin:</h4>
          <p className="text-sm text-blue-700">
            <strong>Username:</strong> admin<br />
            <strong>Parolă:</strong> PrepCenter2024!<br />
            <strong>Acces:</strong> Permanent (nu expiră)
          </p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return renderContentTab();
      case 'pricing':
        return renderPricingTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderContentTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Panou de Administrare</h1>
              <p className="text-text-secondary">Gestionează prețurile și conținutul site-ului</p>
            </div>
            <button
              onClick={adminLogout}
              className="flex items-center px-4 py-2 text-text-secondary hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Deconectare
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-600">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleAdminPanel;
