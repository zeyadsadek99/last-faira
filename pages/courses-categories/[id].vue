<template>
  <div class="courses-categories fadeIn">
    <!-- ✅ Image Header -->
    <ImageHeader bgColor="bg-[#bdfcd7]">
      <div class="header-container flex items-center justify-start h-full">
        <div class="container  mx-auto px-4">
          <div class="header-title">
            <h1 class="w-[30%] text-[5rem] font-bold mb-0">{{ courseDetails?.subject_name?.subject_name }}</h1>
          </div>
        </div>
      </div>
    </ImageHeader>

    <!-- ✅ Courses Content -->
    <div class="courses-content">
      <div class="container">
        <!-- ✅ Tabs -->
        <GlobalTabs :tabsContent="tabsContent" @getItems="getItems">
          <!-- ✅ Registered Courses Tab -->
          <template #registered_courses>
            <Loader1
              v-if="
                isLoading &&
                currentTab === 'registered_courses' &&
                current_page === 1
              "
            />

            <div v-else class="fadeIn">
              <MessagesCourseEmpty :imageSrc= image1
              :message="$t('TITLES.empty_courses')" v-if="registeredCourses?.length == 0" />

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
          </template>

          <!-- ✅ Online Courses Tab -->
          <template #online_courses v-if="currentTab === 'online_courses'">
            <Loader1
              v-if="
                isLoading &&
                currentTab === 'online_courses' &&
                current_page === 1
              "
            />

            <div v-else class="fadeIn">
              <MessagesCourseEmpty :imageSrc= image1
              :message="$t('TITLES.empty_courses')" v-if="onlineCourses.length === 0" />

              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                <CourseCard
                  v-for="course in onlineCourses"
                  :key="course.id"
                  :course="course"
                  :link="
                    registeredUserType === 'student'
                      ? `/student/course-details/online/${course.id}`
                      : `/parent/course-details/online/${course.id}`
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
          </template>
        </GlobalTabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthenticationStore } from "@/stores/authentication";
import { useNuxtApp } from "#app";
import image1 from "/assets/media/empty_messages/empty_courses.png"

// ✅ Import Components
//   import ImageHeader from "@/components/ui/ImageHeader.vue";
//   import Tabs from "@/components/ui/Tabs.vue";
//   import CourseCard from "@/components/ui/CourseCard.vue";
//   import MainLoader from "@/components/ui/loaders/MainLoader.vue";
//   import EmptyCoursesMessage from "@/components/ui/emptyMessages/EmptyCoursesMessage.vue";
//   import GlobalPagination from "@/components/ui/GlobalPagination.vue";

// ✅ Setup
const { $axios } = useNuxtApp();
const route = useRoute();
const authStore = useAuthenticationStore();
const isLoading = ref(false);
const courseDetails = ref(null);
const registeredCourses = ref([]);
const onlineCourses = ref([]);
const { t } = useI18n();

//   const registeredUserType = ref(localStorage.getItem("elmo3lm_elmosa3d_user_type"));
const registeredUserType = ref("student");
const currentTab = ref("registered_courses");
const last_page = ref(null);
const current_page = ref(1);

// ✅ Tabs Content
const tabsContent = ref([
  { tab: t("TABS.registered_courses"), key_name: "registered_courses" },
  { tab: t("TABS.online_courses"), key_name: "online_courses" },
]);

// ✅ Fetch Courses Data
const getCourseDetails = async () => {
  isLoading.value = true;
  let url = `student/courses/${route.params.id}?page=${
    current_page.value
  }&subject_kind=${
    currentTab.value === "registered_courses" ? "online" : "online"
  }`;

  if (registeredUserType.value === "student") {
    url = `student/courses/${route.params.id}?page=${
      current_page.value
    }&subject_kind=${
      currentTab.value === "registered_courses" ? "record" : "online"
    }`;
  } else if (registeredUserType.value === "parent") {
    url = `parent/subjects/${route.params.id}/${
      route.params.son_id
    }?subject_kind=${
      currentTab.value === "registered_courses" ? "record" : "online"
    }`;
  }

  try {
    const { data } = await $axios.get(url, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDMwMzI2NCwiZXhwIjoxNzcxODM5MjY0LCJuYmYiOjE3NDAzMDMyNjQsImp0aSI6IlFIN3F0NFVQbGVCTUhnYUMiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.P3y3qlEaWeO5s_l1knUZvuEoDHAFWXqiay1NdLEg04k`,
        //   Authorization: `Bearer ${authStore.token}`,
        "Accept-language": "ar",
        //   "Accept-language": authStore.language,
        "Cache-Control": "no-cache",
      },
    });

    courseDetails.value = data;
    last_page.value = data.meta?.last_page || null;

    if (currentTab.value === "registered_courses") {
      registeredCourses.value = data.data;
      console.log(registeredCourses)
    } else {
      onlineCourses.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ Handle Tab Change
const getItems = (item) => {
  currentTab.value = item;
  getCourseDetails();
};

// ✅ Handle Pagination
const pagenationClick = (pageNum) => {
  current_page.value = pageNum;
  getCourseDetails();
};

onMounted(getCourseDetails);
</script>

<style scoped>
/* ✅ Wrapper */
.courses-categories {
  @apply py-10;
}

/* ✅ Image Header */
/* .header-container {
  @apply text-center bg-gray-100 py-10;
} */

/* .header-title h1 {
  @apply text-2xl font-bold text-gray-900;
} */

/* ✅ Content */
.courses-content {
  @apply py-10;
}
</style>
