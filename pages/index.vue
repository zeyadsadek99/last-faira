<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useNuxtApp } from "#app";
import { useAuthenticationStore } from "~/stores/authentication"; // Pinia Store
import { useI18n } from "vue-i18n";
import TheSlider from "~/components/home/TheSlider.vue";
import ContactUs from "~/components/home/ContactUs.vue";
import StudentFeaturedCourses from "~/components/home/StudentFeaturedCourses.vue";

const { t } = useI18n();
const route = useRoute();
const { $fetch } = useNuxtApp(); // ✅ Using $fetch for API calls

// ✅ Authentication Store (for checking user data)
const authStore = useAuthenticationStore();

// ✅ Reactive State
const isLoading = ref(false);
const homeData = ref(null);

// ✅ Get User Type from localStorage (client-side only)
const userType = ref(null);
if (process.client) {
  userType.value = localStorage.getItem("elmo3lm_elmosa3d_user_type") || "visitor";
}

// ✅ Compute API Endpoint Based on User Type
const endpoint = computed(() => {
  switch (userType.value) {
    case "teacher":
      return "teacher/home";
    case "student":
      return "student/home";
    case "parent":
      return "parent/home";
    default:
      return "visitor/home"; // Default for visitors
  }
});

// ✅ Fetch Home Page Data using Nuxt `$fetch`
const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch(`https://egypt-api.faiera.com/api/${endpoint.value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.client ? localStorage.getItem("elmo3lm_elmosa3d_user_token") : ""}`,
        "Accept-language": process.client ? localStorage.getItem("elmo3lm_elmosa3d_app_lang") || "en" : "en",
        "cache-control": "no-cache",
        Accept: "application/json",
      },
    });

    homeData.value = response.data;
  } catch (error) {
    console.error("❌ Error fetching home data:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ Scroll to Section
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// ✅ Fetch Data on Mount & Handle Route Hash Navigation
onMounted(() => {
  getHomeData();
  if (route.hash === "#contact") {
    setTimeout(() => {
      scrollToSection("contact");
    }, 1000);
  }
});
</script>

<template>
  <div>
    <!-- ✅ MAIN LOADER -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ HOME PAGE CONTENT -->
    <div class="home_wrapper fadeIn">
      <!-- ✅ HERO SECTION -->
      <TheSlider v-if="homeData" :sliderData="homeData.sliders" />
      <AboutUs v-if="homeData" :aboutUsData="homeData.about" />
      <StudentFeaturedCourses
        v-if="authStore.getAuthenticatedUserData.type !== 'parent' &&
              authStore.getAuthenticatedUserData.type !== 'teacher'"
        :Items="homeData?.newer_subject_name"
      />
      <ContactUs v-if="homeData" :contactUsData="homeData?.contacts" />
    </div>
  </div>
</template>
