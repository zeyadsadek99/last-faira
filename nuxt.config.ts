// https://nuxt.com/docs/api/configuration/nuxt-config
// import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: true,
  spaLoadingTemplate: false,

  // ========== START:: APP CONFIGURATIONS ========== //
  app: {
    // Start:: Head Configurations //
    head: {
      // title: 'NGT',
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        {
          name: "robots",
          content: `index,follow`,
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
      style: [],

      noscript: [],
    },
    // End:: Head Configurations //
  },

  tailwindcss: {
    cssPath: "~/assets/style/tailwind.scss",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-rating",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],

    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "nuxt-aos",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          {
            name: "English",
            code: "en",
            language: "en",
            file: "en.json",
            dir: "ltr",
          },
          {
            name: "عربي ",
            code: "ar",
            language: "ar",
            file: "ar.json",
            dir: "rtl",
          },
        ],
        lazy: true,
        defaultLocale: "ar",
        detectBrowserLanguage: false,
        precompile: {
          strictMessage: false,
        },
        vueI18nLoader: true,
      },
    ],

    "nuxt-swiper",
    "vue3-carousel-nuxt",
    "@nuxt/image",
  ],

  swiper: {},
  
  plugins: [
    {
      src: "~/plugins/vue-toastification.client.ts",
      mode: "client",
    },
    "~/plugins/i18n.client.ts",
    {
      src: "~/plugins/vue-google-maps.client.ts",
      mode: "client",
    },
    "@/plugins/google-maps",
    "@/plugins/axios",
    // "~/plugins/vuesax.ts",
  ],

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": "postcss-nesting",
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseURL: "https://egypt-api.faiera.com/api/",
      general: "https://egypt-api.faiera.com/api/",
      googleMapsApiKey: "AIzaSyBGrfzw_Qd0p8vzu4ySc5aAZRalrH1EgEY",

      // baseURL: "https://backend.ngtsa.com/api/website",
      // general: "https://backend.ngtsa.com/api",
    },
  },
  devServer: {
    // https: false,

    // host: "127.0.0.1",
    host: "0.0.0.0",
    port: 5030,
    // url: "http://0.0.0.0:3005"
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
          additionalData: `@use "~/assets/style/main.scss";`,
        },
      },
    },
  },
  build: {
    transpile: [
      "vue-toastification",
      "nuxt-aos",
      "swiper",
      "@vee-validate",
      "@fortawesome/fontawesome-free",
    ],
  },
  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 0, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  },
});
