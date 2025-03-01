<template>
  <div>
    <!-- ✅ Main Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Courses Section -->
    <div class="courses-section-wrapper fadeIn" v-else>
      <!-- ✅ Image Header -->
      <GlobalBreadCrumbs>
        <template v-slot:page_title>
          <span v-if="authStore.getAuthenticatedUserData.type == 'student'"
            >{{ $t("TITLES.son_courses") }}
          </span>
          <span v-if="authStore.getAuthenticatedUserData.type == 'teacher'"
            >{{ $t("TITLES.subjects") }}
          </span>
          <span v-if="authStore.getAuthenticatedUserData.type == 'teacher'"
            >{{ $t("TITLES.added_subjects") }}
          </span>
        </template>
        <template v-slot:breadcrumb_current_page>
          <span v-if="authStore.getAuthenticatedUserData.type == 'student'">
            {{ $t("TITLES.son_courses") }}
          </span>
          <span v-if="authStore.getAuthenticatedUserData.type == 'teacher'">
            {{ $t("TITLES.subjects") }}
          </span>
          <span v-if="authStore.getAuthenticatedUserData.type == 'teacher'">
            {{ $t("TITLES.added_subjects") }}
          </span>
        </template>
      </GlobalBreadCrumbs>

      <!-- ✅ Section Content -->
      <!-- ✅ Courses Content -->
      <div class="courses-content">
        <div class="container">
          <!-- ✅ Tabs -->

          <!-- ✅ Registered Courses Tab -->
          <!-- <template #registered_courses> -->
          <Loader1
            v-if="
              isLoading &&
              currentTab === 'registered_courses' &&
              current_page === 1
            "
          />

          <div v-else class="fadeIn">
            <MessagesCourseEmpty
              :imageSrc="image1"
              :message="$t('TITLES.empty_courses')"
              v-if="registeredCourses?.length == 0"
            />

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <CoursesCourseCard
                v-for="course in registeredCourses"
                :key="course.id"
                :course="course"
                :link="
                  registeredUserType === 'student'
                    ? `/student/course-details/record/${course.id}`
                    : `/parent/course-details/record/${course.id}`
                "
              />
            </div>

            <!-- ✅ Pagination -->
            <GlobalPagination
              :last_page="last_page"
              :current_page="current_page"
              @pagenationClick="pagenationClick"
            />
          </div>
          <!-- </template> -->

          <!-- ✅ Online Courses Tab -->
        </div>
      </div>
      <!-- ✅ Pagination -->
      <!-- <Pagenation :last_page="lastPage" :current_page="currentPage" @pagenationClick="pagenationClick" /> -->
    </div>
  </div>
</template>

<script setup>
import { useAuthenticationStore } from "@/stores/authentication";

import image1 from "/assets/media/empty_messages/empty_courses.png";
const authStore = useAuthenticationStore();
const { t } = useI18n();

const route = useRoute();
const axios = useNuxtApp().$axios;
const isLoading = ref(true);
const subjects = ref([]);
const courseDetails = ref(null);
const registeredCourses = ref([]);
const onlineCourses = ref([]);
const categoryData = ref({});
const registeredUserType = ref(
  useCookie("elmo3lm_elmosa3d_user_type") || "visitor"
);
const currentTab = ref("registered_courses");

const lastPage = ref(null);
const currentPage = ref(1);
const tabsContent = ref([
  { tab: t("TABS.registered_courses"), key_name: "registered_courses" },
  { tab: t("TABS.online_courses"), key_name: "online_courses" },
]);
const getCoursesData = async () => {
  isLoading.value = true;
  try {
    let response;

    response = await axios.get(
      `parent/subjectName?page=${this.current_page}&student_id=${this.$route.params.id}`,
      {}
    );

    categoryData.value = response.data.category;
    subjects.value = response.data.data;
    lastPage.value = response.data.meta.last_page;
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
  @apply text-lg font-bold text-green-500;
}
</style>
