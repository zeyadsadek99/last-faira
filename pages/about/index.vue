<template>
  <div>
    <!-- START:: MAIN LOADER -->
    <Loader1 v-if="isLoading" />
    <!-- END:: MAIN LOADER -->

    <!-- START:: PAGE CONTENT -->
    <div class="about_us_page_wrapper fadeIn" v-else>
      <!-- START:: BREADCRUMB -->
      <GlobalBreadCrumbs>
        <template #page_title>
          {{ t("TITLES.about_us") }}
        </template>
        <template #breadcrumb_current_page>
          {{ t("TITLES.about_us") }}
        </template>
      </GlobalBreadCrumbs>
      <!-- END:: BREADCRUMB -->

      <!-- START:: ABOUT US PAGE CONTENT -->
      <AboutUs
        v-if="homeData"
        :aboutUsData="homeData.about"
        :hideMoreButton="true"
      />
      <!-- END:: ABOUT US PAGE CONTENT -->

      <!-- START:: CONTACT SECTION -->
      <ContactUs :contactUsData="homeData?.contacts" />
      <!-- END:: CONTACT SECTION -->
    </div>
    <!-- END:: PAGE CONTENT -->
  </div>
</template>

<script setup>
import AboutUs from "@/components/about/AboutUs.vue";
import ContactUs from "@/components/home/ContactUs.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// ✅ Inject Axios from Plugin
const axios = useNuxtApp().$axios;
const isLoading = ref(false);
const homeData = ref(null);

// ✅ Detect user type
const userType = computed(() => useCookie("elmo3lm_elmosa3d_user_type").value);

// ✅ Define API Endpoint Dynamically
const endpoint = computed(() => {
  if (userType.value === "teacher") return "teacher/home";
  if (userType.value === "student") return "student/home";
  if (userType.value === "parent") return "parent/home";
  return "visitor/home"; // Default for visitors
});

const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(endpoint.value);
    homeData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

// ✅ Fetch data when component mounts
onMounted(() => {
  getHomeData();
});
</script>
