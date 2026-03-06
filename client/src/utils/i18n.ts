import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        signin: "Sign In",
        signout: "Sign out of RiceFlix",
        english: "English",
        spanish: "Spanish",
        hero_title: "Unlimited movies, TV shows, and more",
        hero_subtitle: "Starts at $7.99. Cancel anytime.",
        hero_subtitle_info:
          "Ready to watch? Enter your email to create or restart your membership.",
        get_started: "Get Started",
        connect_header: "The Riceflix you love for just $7.99.",
        connect_subheader: "Get our most affordable, ad-supported plan.",
        learn_more: "Learn More",
        trending: "Trending Now",
        more_reasons: "More Reasons to Join",
        faq: "Frequently Asked Questions",
        email_address: "Email address",
        password: "Password",
        valid_email: "Please enter a valid email",

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

        faq_question_1: "What is Riceflix?",
        faq_answer_1:
          "Riceflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
        faq_question_2: "How much does Riceflix cost?",
        faq_answer_2:
          "Watch Riceflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $7.99 to $24.99/month (pre-tax).",
        faq_question_3: "Where can I watch?",
        faq_answer_3:
          "Watch anywhere, anytime. Sign in with your Riceflix account to watch instantly on the web at Riceflix.com from your personal computer or on any internet-connected device that offers the Riceflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Riceflix with you anywhere.",
        faq_question_4: "How do I cancel?",
        faq_answer_4:
          "Riceflix is flexible. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
        faq_question_5: "What can I watch on Riceflix?",
        faq_answer_5:
          "Riceflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Riceflix originals, and more. Watch as much as you want, anytime you want.",
        faq_question_6: "Is Riceflix good for kids?",
        faq_answer_6:
          "The Riceflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",

        questions: "Questions? Call",
        toll_free: "Toll-Free",
        footer_link_1: "FAQ",
        footer_link_2: "Media Center",
        footer_link_3: "Redeem Gift Cards",
        footer_link_4: "Privacy",
        footer_link_5: "Speed Test",
        footer_link_6: "Ad Choices",
        footer_link_7: "Help Center",
        footer_link_8: "Investor Relations",
        footer_link_9: "Buy Gift Cards",
        footer_link_10: "Cookie Preferences",
        footer_link_11: "Legal Notices",
        footer_link_12: "Account",
        footer_link_13: "Jobs",
        footer_link_14: "Ways to Watch",
        footer_link_15: "Corporate Information",
        footer_link_16: "Only on Riceflix",
        footer_link_17: "Riceflix House",
        footer_link_18: "Riceflix Shop",
        footer_link_19: "Terms of Use",
        footer_link_20: "Contact Us",
        footer_link_21: "Do Not Sell My Personal Information",

        author: 'Designed & Engineered by Patrice "Rice 🍚" Maxwell',

        enter_info: "Enter your info to sign in",
        or_new_acct: "Or get started with a new account.",
        rePATCHA:
          "This page is protected by Google reCAPTCHA to ensure you're not a bot.",
        rePATCHA_more:
          "The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).",
        continue: "Continue",
        get_help: "Get Help",
        finish_acct_setup: "Finish setting up your account",
        whos_watching: "Who's watching?",
        add_profile: "Add Profile",
        manage_profile: "Manage Profiles",
        done: "Done",
        add_a_profile: "Add a profile",
        add_a_profile_sub: "Add a profile for another person watching Riceflix",
        kid_profile: "Kid Profile",
        kid_profile_sub: "Only see kid-friendly TV Show and movies",
        save: "Save",
        cancel: "Cancel",

        play: "Play",
        more_info: "More Info",

        category_section_trending_all: "Trending All",
        category_section_action_movies: "Action Movies",
        category_section_comedy_movies: "Comedy Movies",
        category_section_trending_tv: "Trending Tv",

        category_section_favorites: "Favorites",
        category_section_watchlist: "Watchlist",
        category_section_history: "Continue Watching",

        browser_nav_link_home: "Home",
        browser_nav_link_show: "Show",
        browser_nav_link_movies: "Movies",
        browser_nav_link_games: "Games",
        browser_nav_link_new_popular: "New & Popular",
        browser_nav_link_my_list: "My List",
        browser_nav_link_browse_by: "Browse by Language",

        browser_dropdown_opt_manage_profiles: "Manage Profiles",
        browser_dropdown_opt_transfer_profiles: "Transfer Profile",
        browser_dropdown_opt_account: "Account",
        browser_dropdown_opt_help_center: "Help Center",
      },
    },
    es: {
      translation: {
        signin: "Iniciar sesión",
        signout: "Cerrar sesión en RiceFlix",
        english: "Inglés",
        spanish: "Español",
        hero_title: "Películas y series ilimitadas y mucho más",
        hero_subtitle: "A partir de $7.99. Cancela cuando quieras.",
        hero_subtitle_info:
          "¿Listo para ver? Ingresa tu correo electrónico para crear o reiniciar tu suscripción.",
        get_started: "Empezar",
        connect_header: "El Riceflix que amas por sólo $7,99.",
        connect_subheader: "Obtenga nuestro plan más asequible con publicidad.",
        learn_more: "Más Información",
        trending: "Tendencia Ahora",
        more_reasons: "Más razones para unirse",
        faq: "Preguntas frecuentes",
        email_address: "Dirección de correo electrónico",
        password: "Contraseña",
        valid_email: "Por favor, introduzca un correo electrónico válido",

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

        faq_question_1: "¿Qué es Riceflix?",
        faq_answer_1:
          "Riceflix es un servicio de streaming que ofrece una amplia variedad de series premiadas, películas, anime, documentales y mucho más en miles de dispositivos conectados a Internet. Puedes ver todo lo que quieras, cuando quieras, por un precio mensual accesible. Siempre hay algo nuevo por descubrir, y cada semana se agregan nuevas series y películas.",

        faq_question_2: "¿Cuánto cuesta Riceflix?",
        faq_answer_2:
          "Disfruta Riceflix en tu smartphone, tablet, Smart TV, laptop o dispositivo de streaming por una tarifa mensual fija. Los planes van desde $7.99 hasta $24.99 al mes (antes de impuestos).",

        faq_question_3: "¿Dónde puedo verlo?",
        faq_answer_3:
          "Mira donde quieras y cuando quieras. Inicia sesión en tu cuenta de Riceflix para ver contenido al instante desde la web en tu computadora o en cualquier dispositivo conectado a Internet que tenga la aplicación de Riceflix, incluyendo Smart TVs, smartphones, tablets, reproductores multimedia y consolas de videojuegos. También puedes descargar tus series y películas favoritas con la app para iOS o Android y verlas sin conexión. Lleva Riceflix contigo a donde vayas.",

        faq_question_4: "¿Cómo puedo cancelar?",
        faq_answer_4:
          "Riceflix es flexible. Puedes cancelar tu cuenta fácilmente en línea con solo unos clics. No hay cargos por cancelación: puedes iniciar o detener tu suscripción en cualquier momento.",

        faq_question_5: "¿Qué puedo ver en Riceflix?",
        faq_answer_5:
          "Riceflix cuenta con un amplio catálogo de películas, documentales, series, anime y producciones originales premiadas. Mira todo lo que quieras, cuando quieras.",

        faq_question_6: "¿Riceflix es adecuado para niños?",
        faq_answer_6:
          "La experiencia Riceflix Kids está incluida en tu membresía para que los padres tengan control mientras los niños disfrutan de contenido familiar en su propio espacio. Los perfiles infantiles incluyen controles parentales protegidos con PIN que permiten restringir la clasificación de contenido y bloquear títulos específicos que no deseas que los niños vean.",

        questions: "¿Preguntas? Llamar",
        toll_free: "Número gratuito",
        footer_link_1: "Preguntas Frecuentes",
        footer_link_2: "Centro de Medios",
        footer_link_3: "Canjear Tarjetas de Regalo",
        footer_link_4: "Privacidad",
        footer_link_5: "Prueba de Velocidad",
        footer_link_6: "Opciones de Anuncios",
        footer_link_7: "Centro de Ayuda",
        footer_link_8: "Relaciones con Inversionistas",
        footer_link_9: "Comprar Tarjetas de Regalo",
        footer_link_10: "Preferencias de Cookies",
        footer_link_11: "Avisos Legales",
        footer_link_12: "Cuenta",
        footer_link_13: "Empleos",
        footer_link_14: "Formas de Ver",
        footer_link_15: "Información Corporativa",
        footer_link_16: "Solo en Riceflix",
        footer_link_17: "Casa Riceflix",
        footer_link_18: "Tienda Riceflix",
        footer_link_19: "Términos de Uso",
        footer_link_20: "Contáctanos",
        footer_link_21: "No Vender Mi Información Personal",

        author: 'Diseñado y desarrollado  por Patrice "Arrozito 🍚" Maxwell',
        enter_info: "Ingresa tu información para iniciar sesión",
        or_new_acct: "O comience con una nueva cuenta.",

        rePATCHA:
          "Esta página está protegida por Google reCAPTCHA para garantizar que no eres un bot.",
        rePATCHA_more:
          "La información recopilada por Google reCAPTCHA está sujeta a la Política de privacidad y las Condiciones del servicio de Google, y se utiliza para proporcionar, mantener y mejorar el servicio reCAPTCHA y para fines de seguridad general (no se utiliza para publicidad personalizada por parte de Google).",
        continue: "Continuar",
        get_help: "Obtener ayuda",
        finish_acct_setup: "Termine de configurar su cuenta",
        whos_watching: "¿Quién está mirando?",
        add_profile: "Agregar perfil",
        manage_profile: "Administrar perfiles",
        done: "Hecho",
        add_a_profile: "Añadir un perfil",
        add_a_profile_sub:
          "Agregar un perfil para otra persona que mira Riceflix",
        kid_profile: "Perfil de niño",
        kid_profile_sub:
          "Vea únicamente programas de televisión y películas aptos para niños.",
        save: "Ahorrar",
        cancel: "Cancelar",

        play: "Reproducir",
        more_info: "Más Info",

        category_section_trending_all: "Tendencias",
        category_section_action_movies: "Películas de Acción",
        category_section_comedy_movies: "Películas de Comedia",
        category_section_trending_tv: "Series en Tendencia",

        category_section_favorites: "Favoritos",
        category_section_watchlist: "Lista de seguimiento",
        category_section_history: "Continuar viendo",

        browser_nav_link_home: "Inicio",
        browser_nav_link_show: "Series",
        browser_nav_link_movies: "Películas",
        browser_nav_link_games: "Juegos",
        browser_nav_link_new_popular: "Nuevo y Popular",
        browser_nav_link_my_list: "Mi Lista",
        browser_nav_link_browse_by: "Explorar por Idioma",

        browser_dropdown_opt_manage_profiles: "Administrar Perfiles",
        browser_dropdown_opt_transfer_profiles: "Transferir Perfil",
        browser_dropdown_opt_account: "Cuenta",
        browser_dropdown_opt_help_center: "Centro de Ayuda",
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
