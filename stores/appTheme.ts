import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAppThemeStore = defineStore("appTheme", () => {
  // Reactive state
  const appTheme = ref(
    process.client
      ? localStorage.getItem("elmo3lm_elmosa3d_app_theme") || "light_theme"
      : "light_theme"
  );

  // Getters
  const getAppTheme = computed(() => appTheme.value);

  // Set App Theme
  const setAppTheme = (theme: string) => {
    appTheme.value = theme;
    if (process.client) {
      localStorage.setItem("elmo3lm_elmosa3d_app_theme", theme);
      document.body.classList.remove("light_theme", "dark_theme");
      document.body.classList.add(theme);
    }
  };

  // Handle Default Theme
  const handelAppDefaultTheme = () => {
    if (!appTheme.value) {
      setAppTheme("light_theme");
    } else {
      document.body.classList.add(appTheme.value);
    }
  };

  // Toggle Theme
  const changeAppTheme = () => {
    if (appTheme.value === "light_theme") {
      setAppTheme("dark_theme");
    } else {
      setAppTheme("light_theme");
    }
  };

  return {
    appTheme,
    getAppTheme,
    setAppTheme,
    handelAppDefaultTheme,
    changeAppTheme,
  };
});
