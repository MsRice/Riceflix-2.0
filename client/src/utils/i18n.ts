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
        trending: "Trending Now",
        more_reasons: "More Reasons to Join",
        faq: "Frequently Asked Questions",

        more_reasons_title_1: "Enjoy on your TV",
        more_reasons_subtitle_1:
          "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",

        more_reasons_title_2: "Download your shows to watch offline",
        more_reasons_subtitle_2:
          "Save your favorites easily and always have something to watch.",

        more_reasons_title_3: "Watch everywhere",
        more_reasons_subtitle_3:
          "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",

        more_reasons_title_4: "Create profiles for kids",
        more_reasons_subtitle_4:
          "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
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
        trending: "Tendencia Ahora",
        more_reasons: "Más razones para unirse",
        faq: "Preguntas frecuentes",

        more_reasons_title_1: "Disfrútalo en tu TV",
        more_reasons_subtitle_1:
          "Míralo en Smart TV, Playstation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.",

        more_reasons_title_2: "Descarga tus programas para verlos sin conexión",
        more_reasons_subtitle_2:
          "Guarda tus favoritos fácilmente y siempre tendrás algo que ver.",

        more_reasons_title_3: "Mira en todas partes",
        more_reasons_subtitle_3:
          "Transmita películas y programas de TV ilimitados en su teléfono, tableta, computadora portátil y TV.",

        more_reasons_title_4: "Crear perfiles para niños",
        more_reasons_subtitle_4:
          "Envía a los niños a aventuras con sus personajes favoritos en un espacio creado solo para ellos, gratis con tu membresía.",
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
