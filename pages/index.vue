<script setup>
import { useAuthenticationStore } from "~/stores/authentication"; // Pinia store
import TheSlider from "~/components/home/TheSlider.vue";
import ContactUs from "~/components/home/ContactUs.vue";
import StudentFeaturedCourses from "~/components/home/StudentFeaturedCourses.vue";
import ParentFeaturedCourses from "~/components/home/ParentFeaturedCourses.vue";
import CoursesCats from "~/components/home/CoursesCats.vue";
import StudentFeaturedTeachers from "~/components/home/StudentFeaturedTeachers.vue";
import TeacherFeaturedCourses from "~/components/home/TeacherFeaturedCourses.vue";

const { t } = useI18n();
const route = useRoute();

const userToken = useCookie("elmo3lm_elmosa3d_user_token");
const userType = useCookie("elmo3lm_elmosa3d_user_type");
const appLang = useCookie("elmo3lm_elmosa3d_app_lang", { default: () => "ar" });

const isLoading = ref(false);
const homeData = ref(null);
const axios = useNuxtApp().$axios;

console.log("User Type from Cookie:", userType.value);

const endpoint = computed(() => {
  if (userType.value === "teacher") return "teacher/home";
  if (userType.value === "student") return "student/home";
  if (userType.value === "parent") return "parent/home";
  return "visitor/home"; // Default for visitors
});

const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${endpoint.value}`, {});
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
      <ParentFeaturedCourses :Items="homeData?.my_children" />
      <StudentFeaturedTeachers :Items="homeData?.teachers" />
      <StudentFeaturedCourses
        :Items="homeData?.newer_subject_name"
        v-if="userType !== 'parent' && userType !== 'teacher'"
      />
      <TeacherFeaturedCourses
        :Items="homeData?.my_subjects"
        v-if="userType == 'teacher'"
      />
      <ContactUs :contactUsData="homeData?.contacts" v-if="homeData" />
    </div>
  </div>
</template>
