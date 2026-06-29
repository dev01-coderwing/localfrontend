import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import ar from "./locales/ar.json";
import pt from "./locales/pt.json";
import hi from "./locales/hi.json";
import ko from "./locales/ko.json";
import it from "./locales/it.json";
import ru from "./locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      ja: { translation: ja },
      zh: { translation: zh },
      ar: { translation: ar },
      pt: { translation: pt },
      hi: { translation: hi },
      ko: { translation: ko },
      it: { translation: it },
      ru: { translation: ru },
    },

    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;