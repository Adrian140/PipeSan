import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CountryContext = createContext();

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};

export const CountryProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState('FR');

  const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷', amazon: 'amazon.fr', currency: 'EUR', primary: true },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', amazon: 'amazon.com.be', currency: 'EUR' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', amazon: 'amazon.it', currency: 'EUR' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', amazon: 'amazon.es', currency: 'EUR' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', amazon: 'amazon.de', currency: 'BGN' },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'CY', name: 'Cyprus', flag: '🇨🇾', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', amazon: 'amazon.de', currency: 'CZK' },
    { code: 'DK', name: 'Denmark', flag: '🇩��', amazon: 'amazon.de', currency: 'DKK' },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'GR', name: 'Greece', flag: '🇬��', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺', amazon: 'amazon.de', currency: 'HUF' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', amazon: 'amazon.co.uk', currency: 'EUR' },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'LT', name: 'Lithuania', flag: '🇱��', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', amazon: 'amazon.fr', currency: 'EUR' },
    { code: 'MT', name: 'Malta', flag: '🇲🇹', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', amazon: 'amazon.se', currency: 'SEK' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', amazon: 'amazon.pl', currency: 'PLN' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', amazon: 'amazon.nl', currency: 'EUR' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', amazon: 'amazon.es', currency: 'EUR' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴', amazon: 'amazon.de', currency: 'RON' },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', amazon: 'amazon.co.uk', currency: 'GBP' },
    { code: 'OTHER', name: 'Altă țară', flag: '🌍', amazon: 'amazon.de', currency: 'EUR' }
  ];

  useEffect(() => {
    // Prioritize user's registered country, then saved preference
    if (user && user.country) {
      setSelectedCountry(user.country);
    } else {
      const savedCountry = localStorage.getItem("pipesan_country");
      if (savedCountry) {
        setSelectedCountry(savedCountry);
      }
    }
  }, [user]);
  const changeCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    localStorage.setItem("pipesan_country", countryCode);
  };

  const getCurrentCountry = () => {
    return countries.find(country => country.code === selectedCountry) || countries[0];
  };

  const getAmazonLink = (amazonLinks) => {
    const country = getCurrentCountry();
    
    // If amazonLinks is a string (old format), return it as is
    if (typeof amazonLinks === 'string') {
      return `https://${country.amazon}/dp/${amazonLinks}`;
    }
    
    // If amazonLinks is an object with country-specific links
    if (amazonLinks && amazonLinks[country.code]) {
      return amazonLinks[country.code];
    }
    
    // Special case for OTHER countries - use German Amazon
    if (country.code === 'OTHER' && amazonLinks && amazonLinks.DE) {
      return amazonLinks.DE;
    }
    
    // Fallback to French Amazon if no specific link found
    return amazonLinks?.FR || '#';
  };

  const formatPrice = (price) => {
    const country = getCurrentCountry();
    let convertedPrice = price;
    
    // Simple conversion rates (in real app, use live rates)
    switch (country.currency) {
      case 'BGN':
        convertedPrice = price * 1.96;
        break;
      case 'CZK':
        convertedPrice = price * 24.5;
        break;
      case 'DKK':
        convertedPrice = price * 7.44;
        break;
      case 'HUF':
        convertedPrice = price * 390;
        break;
      case 'RON':
        convertedPrice = price * 4.97;
        break;
      case 'SEK':
        convertedPrice = price * 11.5;
        break;
      case 'PLN':
        convertedPrice = price * 4.3;
        break;
      case 'GBP':
        convertedPrice = price * 0.85;
        break;
      default:
        convertedPrice = price; // EUR
    }

    // Format based on country locale
    const locale = {
      'UK': 'en-GB',
      'DE': 'de-DE',
      'ES': 'es-ES',
      'IT': 'it-IT',
      'NL': 'nl-NL',
      'PL': 'pl-PL',
      'SE': 'sv-SE',
      'PT': 'pt-PT',
      'RO': 'ro-RO',
      'CZ': 'cs-CZ',
      'HU': 'hu-HU',
      'BG': 'bg-BG',
      'DK': 'da-DK',
      'FI': 'fi-FI',
      'GR': 'el-GR'
    }[country.code] || 'fr-FR';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: country.currency
    }).format(convertedPrice);
  };

  const value = {
    selectedCountry,
    countries,
    changeCountry,
    getCurrentCountry,
    getAmazonLink,
    formatPrice
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;