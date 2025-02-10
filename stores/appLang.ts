import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useAppLangStore = defineStore("appLang", {
  state: () => ({
    appLanguage: process
      ? localStorage.getItem("elmo3lm_elmosa3d_app_lang") || "ar"
      : "ar",
  }),

  actions: {
    setAppLocale(payload: string) {
      this.appLanguage = payload;
      if (process) {
        localStorage.setItem("elmo3lm_elmosa3d_app_lang", payload);
      }
    },

    handelAppDefaultLanguage() {
      const i18n = useI18n();

      if (!this.appLanguage) {
        this.setAppLocale("ar");
        i18n.locale.value = "ar";
        document.querySelector("body")?.setAttribute("dir", "rtl");
      } else {
        i18n.locale.value = this.appLanguage as "ar" | "en";
        document.querySelector("body")?.setAttribute(
          "dir",
          this.appLanguage === "en" ? "ltr" : "rtl"
        );
      }
    },

    changeAppLanguage(payload: string) {
      const i18n = useI18n();

      if (payload === "en") {
        this.setAppLocale("en");
        i18n.locale.value = "en";
        document.querySelector("body")?.setAttribute("dir", "ltr");
      } else {
        this.setAppLocale("ar");
        i18n.locale.value = "ar";
        document.querySelector("body")?.setAttribute("dir", "rtl");
      }

      location.reload(); // Reload to apply changes
    },
  },
});
