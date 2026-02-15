import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        signin: "Sign In",
        english: "English",
        spanish: "Spanish",
        hero_title: "Unlimited movies, TV shows, and more",
        hero_subtitle: "Starts at $7.99. Cancel anytime.",
        hero_subtitle_info:
          "Ready to watch? Enter your email to create or restart your membership.",
        get_started: "Get Started",
        connect_header: "The Netflix you love for just $7.99.",
        connect_subheader: "Get our most affordable, ad-supported plan.",
        learn_more: "Learn More",
      },
    },
    es: {
      translation: {
        signin: "Iniciar sesión",
        english: "Inglés",
        spanish: "Español",
        hero_title: "Películas y series ilimitadas y mucho más",
        hero_subtitle: "A partir de $7.99. Cancela cuando quieras.",
        hero_subtitle_info:
          "¿Listo para ver? Ingresa tu correo electrónico para crear o reiniciar tu suscripción.",
        get_started: "Empezar",
        connect_header: "El Netflix que amas por sólo $7,99.",
        connect_subheader: "Obtenga nuestro plan más asequible con publicidad.",
        learn_more: "Más Información",
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
