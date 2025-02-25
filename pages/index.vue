<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthenticationStore } from "~/stores/authentication"; // Pinia store
import { useI18n } from "vue-i18n";
import { useCookie } from "#app"; // ✅ Import Nuxt Cookie Management
import TheSlider from "~/components/home/TheSlider.vue";
import ContactUs from "~/components/home/ContactUs.vue";
import StudentFeaturedCourses from "~/components/home/StudentFeaturedCourses.vue";
import ParentFeaturedCourses from "~/components/home/ParentFeaturedCourses.vue";
import CoursesCats from "~/components/home/CoursesCats.vue";
import StudentFeaturedTeachers from "~/components/home/StudentFeaturedTeachers.vue";
// import Courses from "./mySons/courses.vue";

const { t } = useI18n();
const route = useRoute();

// ✅ Replace localStorage with Cookies
const userToken = useCookie("elmo3lm_elmosa3d_user_token"); // User token
const userType = useCookie("elmo3lm_elmosa3d_user_type", { default: () => "visitor" });
const appLang = useCookie("elmo3lm_elmosa3d_app_lang", { default: () => "ar" });

const isLoading = ref(false);
const homeData = ref(null);
const { $axios } = useNuxtApp();

console.log("User Type from Cookie:", userType.value);

// ✅ Dynamically set API endpoint based on user type
const endpoint = computed(() => {
  if (userType.value === "teacher") return "teacher/home";
  if (userType.value === "student") return "student/home";
  if (userType.value === "parent") return "parent/home";
  return "visitor/home"; // Default for visitors
});

// ✅ Fetch Home Data (Using Token from Cookie)
const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get("student/home", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks`, // ✅ Token from Cookie
        "Accept-language": appLang.value,
        "cache-control": "no-cache",
        Accept: "application/json",
      },
    });
    homeData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ Scroll to Section (for Contact Us)
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// ✅ Fetch Data on Mount
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
    <!-- ✅ Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Home Content -->
    <div class="home_wrapper fadeIn">
      <TheSlider v-if="homeData" :sliderData="homeData.sliders" />
      <AboutUs v-if="homeData" :aboutUsData="homeData.about" />
      <CoursesCats :courseCatsData="homeData?.categories" />
      <ParentFeaturedCourses :Items="homeData?.my_children"  />
      <StudentFeaturedTeachers
                :Items="homeData?.teachers"
            />
      <StudentFeaturedCourses
        :Items="homeData?.newer_subject_name"
        v-if="userType !== 'parent' && userType !== 'teacher'"
      />

      <ContactUs :contactUsData="homeData?.contacts" v-if="homeData" />
    </div>
  </div>
</template>
