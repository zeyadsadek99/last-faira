<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthenticationStore } from "~/stores/authentication"; // Import Pinia store
import axios from "axios";
import { useI18n } from "vue-i18n";
import AboutUs from "~/components/about/AboutUs.vue";
import StudentFeaturedCourses from "~/components/home/StudentFeaturedCourses.vue";
const { t } = useI18n();
// Import Components
// import HeroSlider from "@/components/structure/TheSlider.vue";
// import AboutSection from "@/components/general/AboutUs.vue";
// import Loader1 from "~/components/Loader1.vue";

// Initialize Pinia Authentication Store
const authStore = useAuthenticationStore();

// Reactive state variables
const isLoading = ref(false);
const homeData = ref(null);
const { $axios } = useNuxtApp();
const userType = ref(process.client ? localStorage.getItem("elmo3lm_elmosa3d_user_type") : null);

// Get current route
const route = useRoute();
const endpoint = computed(() => {
  if (userType.value === "teacher") return "teacher/home";
  if (userType.value === "student") return "student/home";
  if (userType.value === "parent") return "parent/home";
  return "visitor/home"; // Default for visitors
});
const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get(endpoint.value);
    homeData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
    isLoading.value = false;
  }
};
// Fetch Home Page Data using Axios
// const getHomeData = async () => {
//   isLoading.value = true;
//   const userType = localStorage.getItem("elmo3lm_elmosa3d_user_type");

//   let endpoint = "visitor/home"; // Default for visitors
//   if (userType === "teacher") endpoint = "teacher/home";
//   else if (userType === "student") endpoint = "student/home";
//   else if (userType === "parent") endpoint = "parent/home";

//   try {
//     const response = await axios.get(
//       `https://egypt-api.faiera.com/api/${endpoint}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem(
//             "elmo3lm_elmosa3d_user_token"
//           )}`,
//           "Accept-language": localStorage.getItem("elmo3lm_elmosa3d_app_lang"),
//           "cache-control": "no-cache",
//           Accept: "application/json",
//         },
//       }
//     );
//     homeData.value = response.data.data;
//   } catch (error) {
//     console.error("Error fetching home data:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// Scroll to Section
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// const documentDirection = ref("ltr");
// Mounted Lifecycle Hook
onMounted(() => {
  getHomeData();
  if (route.hash === "#contact") {
    setTimeout(() => {
      scrollToSection("contact");
    }, 1000);
  }
  // documentDirection.value = document.documentElement.dir;
});
// import { ref, onMounted } from "vue";
</script>

<template ::key="$route.path">
  <div>
    <!-- START:: MAIN LOADER -->
    <Loader1 v-if="isLoading" />
    <!-- END:: MAIN LOADER -->

    <!-- START:: HOME PAGE CONTENT -->
    <div class="home_wrapper fadeIn">
      <!-- START:: HERO SECTION -->
      <!-- <HeroSlider v-if="homeData" :sliderData="homeData.sliders" /> -->
      <AboutUs v-if="homeData" :aboutUsData="homeData.about" />
      <StudentFeaturedCourses
        :Items="homeData?.newer_subject_name"
        v-if="
          authStore.getAuthenticatedUserData.type != 'parent' &&
          authStore.getAuthenticatedUserData.type != 'teacher'
        "
      />
      <!-- <GeneralContactUs :contactUsData="homeData?.contacts" v-if="homeData" /> -->

      <!-- END:: HERO SECTION -->
    </div>
    <!-- END:: HOME PAGE CONTENT -->
  </div>
</template>
<style>

</style>