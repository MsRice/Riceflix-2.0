import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        english: "English",
        spanish: "Spanish",
      },
    },
    es: {
      translation: {
        login: "Acceso",
        english: "Inglés",
        spanish: "Español",
      },
    },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
