import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useNuxtApp } from "#app"; // ✅ Import Nuxt App

export const useApiStore = defineStore("apiStore", () => {
  const { $axios } = useNuxtApp(); // ✅ Use the injected axios instance

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
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTczOTg5MDA2NCwiZXhwIjoxNzcxNDI2MDY0LCJuYmYiOjE3Mzk4OTAwNjQsImp0aSI6Ik84cHRPaUFDOGZtS3NUV1kiLCJzdWIiOiIxNzQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tetCd0ksKooO1a7Bj5V5o8EifI30H7hX1ZpyzlazjMw`,
    "Accept-language": localStorage.getItem("elmo3lm_elmosa3d_app_lang"),
    "cache-control": "no-cache",
    Accept: "application/json",
  }));

  // ✅ Actions

  async function getCountries() {
    try {
      const res = await $axios.get("countries", { headers: headers.value }); // ✅ Use $axios
      countries.value = res.data.data;
      selectedCountryKey.value = res.data.data[0];
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }
  async function getSons() {
    try {
      const res = await $axios.get("parent/my-children", { headers: headers.value }); // ✅ Use $axios
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
})
