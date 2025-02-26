import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useApiStore = defineStore("apiStore", () => {
  const { $axios } = useNuxtApp(); // ✅ Use Nuxt 3 Axios Instance

  // ✅ Use Cookies Instead of Local Storage
  const userToken = useCookie("elmo3lm_elmosa3d_user_token");
  const appLang = useCookie("elmo3lm_elmosa3d_app_lang", { default: () => "ar" });

  // ✅ State
  const countries = ref(null);
  const sons = ref(null);
  const selectedCountryKey = ref(null);
  const cities = ref([]);
  const studyDegrees = ref(null);
  const studyYears = ref([]);
  const specializations = ref([]);
  const experiences = ref([]);

  // ✅ Headers for API Requests
  const headers = computed(() => ({
    Authorization: `Bearer ${userToken.value}`, // ✅ Token from Cookie
    "Accept-language": appLang.value,
    "cache-control": "no-cache",
    Accept: "application/json",
  }));

  // ✅ Actions (Replacing Vuex Actions)

  async function getCountries() {
    try {
      const res = await $axios.get("countries", { headers: headers.value });
      countries.value = res.data.data;
      selectedCountryKey.value = res.data.data[0]; // Set default country
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  async function getSons() {
    try {
      const res = await $axios.get("parent/my-children", { headers: headers.value });
      sons.value = res.data.data;
    } catch (error) {
      console.error("Error fetching sons:", error);
    }
  }

  async function getCities(countryId:any) {
    try {
      const res = await $axios.get(`cities/${countryId}`, { headers: headers.value });
      cities.value = res.data.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  function changeSelectedPhoneCode(phoneCode:any) {
    selectedCountryKey.value = phoneCode;
  }

  async function getStudyDegrees() {
    try {
      const res = await $axios.get("degrees", { headers: headers.value });
      studyDegrees.value = res.data.data;
    } catch (error) {
      console.error("Error fetching study degrees:", error);
    }
  }

  async function getStudyYears(degreeId:any) {
    try {
      const res = await $axios.get(`academic-years/${degreeId}`, { headers: headers.value });
      studyYears.value = res.data.data;
    } catch (error) {
      console.error("Error fetching study years:", error);
    }
  }

  async function getSpecializations(degreeId:any) {
    try {
      const res = await $axios.get(`specializations/${degreeId}`, { headers: headers.value });
      specializations.value = res.data.data;
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  }

  async function getExperiences() {
    try {
      const res = await $axios.get("experiences", { headers: headers.value });
      experiences.value = res.data.data;
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  // ✅ Getters
  const countriesData = computed(() => ({
    allCountries: countries.value,
    selectedCountry: selectedCountryKey.value,
  }));

  return {
    countries,
    sons,
    selectedCountryKey,
    cities,
    studyDegrees,
    studyYears,
    specializations,
    experiences,

    getCountries,
    getSons,
    getCities,
    changeSelectedPhoneCode,
    getStudyDegrees,
    getStudyYears,
    getSpecializations,
    getExperiences,

    countriesData,
  };
});
