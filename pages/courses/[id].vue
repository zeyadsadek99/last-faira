<template>
  <div>
    <!-- ✅ Main Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Courses Section -->
    <div v-else class="courses-section fadeIn">
      <!-- ✅ Image Header -->
      <ImageHeader>
        <div class="header-container flex items-center justify-start h-full">
          <div class="container mx-auto px-4">
            <div class="header-title">
              <h1
                class="w-[30%] text-[5rem] font-bold mb-0"
                v-if="$route.params.id !== 'distance-learning-lessons'"
              >
                {{ categoryData.name }}
              </h1>
              <h1 class="w-[30%] text-[5rem] font-bold mb-0" v-else>
                {{ $t("TITLES.all_courses") }}
              </h1>
            </div>
          </div>
        </div>
      </ImageHeader>

      <div class="section-content">
        <div class="container">
          <!-- ✅ About Course Section -->
          <div
            class="section-top mb-8"
            v-if="$route.params.id !== 'distance-learning-lessons'"
          >
            <h2 class="section-title">{{ $t("TITLES.about_section") }}</h2>
            <p class="text-wrapper">{{ categoryData.desc }}</p>
          </div>

          <!-- ✅ Subjects -->
          <div class="subjects-wrapper">
            <h2 class="section-title">{{ $t("TITLES.subjects") }}</h2>
            <MessagesCourseEmpty
            v-if="subjects.length === 0"
              :imageSrc= image1
              :message="$t('TITLES.empty_courses')"
            />

            <!-- <EmptyCoursesMessage v-if="subjects.length === 0" /> -->

            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <!-- <router-link
                v-for="course in subjects"
                :key="course.id"
                :to="redirectRoute(course.id)"
                class="course-card"
              > -->
              <NuxtLink
                v-for="course in subjects"
                :key="course.id"
                :to="redirectRoute(course.id)"
                class="block"
              >
                <div
                  class="bg-white shadow-lg rounded-lg overflow-hidden p-3 transition-transform transform hover:-translate-y-2"
                >
                  <!-- Course Image -->
                  <div class="w-full h-48 rounded-lg overflow-hidden">
                    <img
                      :src="course.specialization_ar"
                      alt="Course Category Image"
                      class="w-full h-full object-fill"
                    />
                  </div>

                  <!-- Course Details -->
                  <div class="p-4 flex justify-between">
                    <!-- Course Info -->
                    <div class="flex flex-col text-right">
                      <p class="text-xl font-semibold text-gray-800">
                        {{ course.subject_name }}
                      </p>
                      <p class="text-xl flex gap-1 font-semibold text-gray-600">
                        <span>{{ course.num_of_courses }}</span>
                        <span class="text-gray-500">كورس</span>
                      </p>
                    </div>

                    <!-- Teacher Info -->
                    <div class="">
                      <p class="flex gap-1 text-xl font-semibold text-gray-800">
                        {{ course.num_of_teachers }}
                        <span class="text-gray-500">معلم</span>
                      </p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
              <!-- <ImagedCard>
                    <template #card_image>
                      <img :src="course.image" :alt="course.subject_name" class="rounded-lg object-cover w-full h-40" />
                    </template>
  
                    <template #card_text>
                      <div class="flex justify-between">
                        <p class="course-name">{{ course.subject_name }}</p>
                        <p class="price">{{ course.price }} {{ course.currency }}</p>
                      </div>
                      <p v-if="course.avg_rate" class="rating">
                        <i class="fas fa-star text-yellow-500"></i> {{ course.avg_rate }}
                      </p>
                    </template>
                  </ImagedCard> -->
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Pagination -->
    <GlobalPagination
      :last_page="lastPage"
      :current_page="currentPage"
      @pagenationClick="pagenationClick"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthenticationStore } from "@/stores/authentication"; // Pinia store for authentication
import { useNuxtApp } from "#app"; // Nuxt app for axios instance
import Loader1 from "~/components/Loader1.vue";
import image1 from "/assets/media/empty_messages/empty_courses.png"
// Import Components
//   import MainLoader from "@/components/ui/loaders/MainLoader.vue";
//   import ImageHeader from "@/components/ui/ImageHeader.vue";
//   import ImagedCard from "@/components/ui/ImagedCard.vue";
//   import EmptyCoursesMessage from "@/components/ui/emptyMessages/EmptyCoursesMessage.vue";
//   import GlobalPagination from "@/components/ui/GlobalPagination.vue";

// Initialize Nuxt app
const { $axios } = useNuxtApp();
const route = useRoute();
const authStore = useAuthenticationStore(); // Pinia store for authentication

const isLoading = ref(true);
const subjects = ref([]);
const categoryData = ref({});
const registeredUserType = ref("teacher");
//   const registeredUserType = ref(localStorage.getItem("elmo3lm_elmosa3d_user_type"));
const currentPage = ref(1);
const lastPage = ref(null);

// ✅ Fetch Course Data using $axios
const getCoursesData = async () => {
  isLoading.value = true;
  // else if (registeredUserType.value === "teacher") {
  //   url = `/teacher/category/${route.params.id}`;
  // }

  let url = "";
  if (route.params.id === "distance-learning-lessons") {
    url = "/student/all-subject-name";
  } else {
    url = `/student/category/courses/${route.params.id}?page=${currentPage.value}`;
  }

  try {
    const response = await $axios.get(url, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,
        //   Authorization: `Bearer ${authStore.token}`,
        "Accept-Language": "ar",
        //   "Accept-Language": authStore.language,
        "Cache-Control": "no-cache",
      },
    });

    if (route.params.id === "distance-learning-lessons") {
      subjects.value = response.data.data;
    } else {
      categoryData.value =
        response.data.category || response.data.data.category;
      subjects.value = response.data.data || response.data.subjects;
      lastPage.value = response.data.meta?.last_page || null;
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ Redirect Route Handling
const redirectRoute = (course_id) => {
  return registeredUserType.value === "teacher"
    ? `/teacher/course-details/online/${course_id}`
    : `/courses-categories/${course_id}`;
};

// ✅ Pagination Click Handling
const pagenationClick = (pageNum) => {
  currentPage.value = pageNum;
  getCoursesData();
};

// ✅ Fetch Data on Component Mount & Watch Route Changes
onMounted(getCoursesData);
watch(() => route.params.id, getCoursesData);
</script>

<style scoped>
/* ✅ General Section Styling */
.courses-section {
  @apply relative;
}

.section-content {
  @apply py-10;
}

.section-title {
  @apply text-3xl font-bold text-themeText mb-2;
}

.text-wrapper {
  @apply text-[22px] break-words leading-[1.2]  text-lightGray;
}

/* ✅ Course Card Styling */
.course-card {
  @apply block bg-white border rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl p-4;
}

.course-name {
  @apply text-lg font-semibold text-gray-800;
}

.price {
  @apply text-lg font-bold text-green-600;
}

.rating {
  @apply flex items-center space-x-2 text-yellow-500;
}
</style>
