<template>
  <div>
    <!-- ✅ Main Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Courses Section -->
    <div class="courses-section-wrapper fadeIn" v-else>
      <!-- ✅ Image Header -->
      <ImageHeader>
        <div
          class="header-container container flex items-center justify-start h-full"
        >
          <div class="container mx-auto px-4">
            <div class="header-title-wrapper">
              <h1 v-if="$route.params.id == 'distance-learning-lessons'">
                {{ categoryData.name }}
              </h1>
              <h1 class="w-[30%] text-[5rem] font-bold mb-0" v-else>
                {{ $t("TITLES.all_courses") }}
              </h1>
            </div>
          </div>
        </div>
      </ImageHeader>

      <!-- ✅ Section Content -->
      <StudentFeaturedCourses
        :Items="subjects"
        v-if="userType !== 'parent' && userType !== 'teacher'"
      />

      <!-- ✅ Pagination -->
      <!-- <Pagenation :last_page="lastPage" :current_page="currentPage" @pagenationClick="pagenationClick" /> -->
    </div>
  </div>
</template>

<script setup>
import ImageHeader from "@/components/global/ImageHeader.vue";

import StudentFeaturedCourses from "~/components/home/StudentFeaturedCourses.vue";

const route = useRoute();
const axios = useNuxtApp().$axios;
const isLoading = ref(true);
const subjects = ref([]);
const categoryData = ref({});
const registeredUserType = ref(
  useCookie("elmo3lm_elmosa3d_user_type") || "visitor"
);
const lastPage = ref(null);
const currentPage = ref(1);

const getCoursesData = async () => {
  isLoading.value = true;
  try {
    let response;
    if (route.params.id !== "distance-learning-lessons") {
      response = await axios.get("student/all-subject-name", {});
      subjects.value = response.data.data;
    } else {
      response = await axios.get(
        `student/category/courses/${route.params.id}?page=${currentPage.value}`,
        {}
      );
      categoryData.value = response.data.category;
      subjects.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  } finally {
    isLoading.value = false;
  }
};

const redirectRoute = (course_id) => {
  if (registeredUserType.value === "teacher") {
    return `/teacher/course-details/online/${course_id}`;
  } else {
    return `/courses-categories/${course_id}`;
  }
};

const pagenationClick = (pageNum) => {
  currentPage.value = pageNum;
  getCoursesData();
};

onMounted(() => {
  getCoursesData();
});
</script>

<style scoped>
/* ✅ Tailwind Styles */
.courses-section-wrapper {
  @apply relative;
}

.section-content-wrapper {
  @apply py-12;
}

.course-section-title {
  @apply text-2xl font-bold text-gray-800 mb-4;
}

.text-wrapper {
  @apply text-lg text-gray-600 leading-relaxed;
}

.course-name {
  @apply text-lg font-semibold text-gray-900;
}

.price {
  @apply text-lg font-bold;
}
</style>
