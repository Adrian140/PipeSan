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
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'GR', name: 'Greece', flag: '🇬��', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'LT', name: 'Lithuania', flag: '🇱��', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'FR', name: 'France', flag: 'https://flagcdn.com/w20/fr.png', amazon: 'amazon.fr', currency: 'EUR', primary: true },
    { code: 'BE', name: 'Belgium', flag: 'https://flagcdn.com/w20/be.png', amazon: 'amazon.com.be', currency: 'EUR' },
    { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/w20/it.png', amazon: 'amazon.it', currency: 'EUR' },
    { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/w20/de.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w20/es.png', amazon: 'amazon.es', currency: 'EUR' },
    { code: 'AT', name: 'Austria', flag: 'https://flagcdn.com/w20/at.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'BG', name: 'Bulgaria', flag: 'https://flagcdn.com/w20/bg.png', amazon: 'amazon.de', currency: 'BGN' },
    { code: 'HR', name: 'Croatia', flag: 'https://flagcdn.com/w20/hr.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'CY', name: 'Cyprus', flag: 'https://flagcdn.com/w20/cy.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'CZ', name: 'Czech Republic', flag: 'https://flagcdn.com/w20/cz.png', amazon: 'amazon.de', currency: 'CZK' },
    { code: 'DK', name: 'Denmark', flag: 'https://flagcdn.com/w20/dk.png', amazon: 'amazon.de', currency: 'DKK' },
    { code: 'EE', name: 'Estonia', flag: 'https://flagcdn.com/w20/ee.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'FI', name: 'Finland', flag: 'https://flagcdn.com/w20/fi.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'GR', name: 'Greece', flag: 'https://flagcdn.com/w20/gr.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'HU', name: 'Hungary', flag: 'https://flagcdn.com/w20/hu.png', amazon: 'amazon.de', currency: 'HUF' },
    { code: 'IE', name: 'Ireland', flag: 'https://flagcdn.com/w20/ie.png', amazon: 'amazon.co.uk', currency: 'EUR' },
    { code: 'LV', name: 'Latvia', flag: 'https://flagcdn.com/w20/lv.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'LT', name: 'Lithuania', flag: 'https://flagcdn.com/w20/lt.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'LU', name: 'Luxembourg', flag: 'https://flagcdn.com/w20/lu.png', amazon: 'amazon.fr', currency: 'EUR' },
    { code: 'MT', name: 'Malta', flag: 'https://flagcdn.com/w20/mt.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'SE', name: 'Sweden', flag: 'https://flagcdn.com/w20/se.png', amazon: 'amazon.se', currency: 'SEK' },
    { code: 'PL', name: 'Poland', flag: 'https://flagcdn.com/w20/pl.png', amazon: 'amazon.pl', currency: 'PLN' },
    { code: 'NL', name: 'Netherlands', flag: 'https://flagcdn.com/w20/nl.png', amazon: 'amazon.nl', currency: 'EUR' },
    { code: 'PT', name: 'Portugal', flag: 'https://flagcdn.com/w20/pt.png', amazon: 'amazon.es', currency: 'EUR' },
    { code: 'RO', name: 'Romania', flag: 'https://flagcdn.com/w20/ro.png', amazon: 'amazon.de', currency: 'RON' },
    { code: 'SK', name: 'Slovakia', flag: 'https://flagcdn.com/w20/sk.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'SI', name: 'Slovenia', flag: 'https://flagcdn.com/w20/si.png', amazon: 'amazon.de', currency: 'EUR' },
    { code: 'UK', name: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png', amazon: 'amazon.co.uk', currency: 'GBP' },
    { code: 'OTHER', name: 'Altă țară', flag: 'https://flagcdn.com/w20/un.png', amazon: 'amazon.de', currency: 'EUR' }
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