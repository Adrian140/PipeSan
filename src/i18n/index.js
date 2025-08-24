import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ro from './locales/ro.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';
import nl from './locales/nl.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';
import sv from './locales/sv.json';
import da from './locales/da.json';
import fi from './locales/fi.json';
import el from './locales/el.json';
import hu from './locales/hu.json';
import cs from './locales/cs.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import bg from './locales/bg.json';
import hr from './locales/hr.json';
import et from './locales/et.json';
import lv from './locales/lv.json';
import lt from './locales/lt.json';
import mt from './locales/mt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      es: { translation: es },
      it: { translation: it },
      nl: { translation: nl },
      pl: { translation: pl },
      pt: { translation: pt },
      sv: { translation: sv },
      da: { translation: da },
      fi: { translation: fi },
      el: { translation: el },
      hu: { translation: hu },
      cs: { translation: cs },
      sk: { translation: sk },
      sl: { translation: sl },
      bg: { translation: bg },
      hr: { translation: hr },
      et: { translation: et },
      lv: { translation: lv },
      lt: { translation: lt },
      mt: { translation: mt },
    },
    fallbackLng: 'ro',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
