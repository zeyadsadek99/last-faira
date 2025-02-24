<template>
  <div>
    <!-- ✅ Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Teacher Profile Section -->
    <div v-else class="teacher-profile fadeIn">
      <!-- ✅ Header -->
      <ImageHeader
        bgColor="bg-[#F5ECFF]"
        bgImage="/media/shapes/pi_sempole.svg"
        :customStyle="{ marginLeft: '-80px' }"


      >
        <div class="header-container container">
          <div class="container">
            <div class="flex flex-col md:flex-row items-center">
              <div class="header-title-wrapper mt-6 text-center md:text-left">
                <h1 class="!text-[5rem] font-bold text-themeText">
                  {{ teacherDetails.fullname }}
                </h1>

                <h3 class="text-gray-600 mt-2">
                  <div class="flex">
                    <template
                      v-for="(
                        specialization, index
                      ) in teacherDetails.specializations.slice(0, 2)"
                      :key="specialization.id"
                    >
                      <h4 class="!text-secondary text-2xl">
                        {{ specialization.name }}
                        <span
                          v-if="
                            index < teacherDetails.specializations.length - 1
                          "
                        >
                          /
                        </span>
                      </h4>
                    </template>
                    <h4
                      v-if="teacherDetails.specializations.length > 2"
                      class="text-gray-600"
                    >
                      ...
                    </h4>
                  </div>
                </h3>
              </div>
              <div class="ml-auto">
                <!-- ✅ Optional Teacher Image -->
                <!-- <img src="@/assets/media/illustrations/header.png" alt="teacher-profile" class="w-52 hidden md:block" /> -->
              </div>
            </div>
          </div>
        </div>
      </ImageHeader>

      <!-- ✅ About Section -->
      <div class="courses-section">
        <div class="container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
            <!-- ✅ Teacher Bio -->
            <div>
              <h2 class="text-3xl font-arb font-bold">نبذة عنـي</h2>
              <p class="text-gray-600 text-xl mt-3">
                {{ teacherDetails.desc }}
              </p>
            </div>

            <!-- ✅ Video -->
            <div>
              <video
                ref="videoElement"
                :src="teacherDetails.explanatory_video"
                class="custom-video w-full h-96 rounded-xl shadow-md"
                controls
              ></video>
            </div>
          </div>

          <!-- ✅ Horizontal Divider -->
          <!-- <hr class="border-gray-300 my-6" /> -->

          <!-- ✅ Subjects Section -->
          <div class="mt-6">
            <h3 class="text-3xl font-bold flex items-center gap-3">
              <img src="../../assets/media/shapes/title_icon.svg" class="w-8" />
              المواد الدراسية
            </h3>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            >
              <div
                v-for="specialization in teacherDetails.specializations"
                :key="specialization.id"
                class="subject-card"
              >
                <img
                  :src="specialization.specialization_ar"
                  alt="subject"
                  class="w-28 h-32 object-contain rounded-lg"
                />
                <div class="ml-4">
                  <h2 class="text-[2rem] font-bold">{{ specialization.name }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";
// import Loader1 from "~/components/Loader1.vue";

const { $axios } = useNuxtApp();
const route = useRoute();
const isLoading = ref(true);
const teacherDetails = ref({});

// ✅ Fetch Teacher Profile
const getTeacherProfile = async () => {
  try {
    const response = await $axios.get(
      `/student/teacher_profile/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

          // Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Accept-Language": "ar",
          "Cache-Control": "no-cache",
        },
      }
    );

    teacherDetails.value = response.data.data;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getTeacherProfile);
</script>

<style scoped>
/* ✅ Header */
.header-container {
  @apply flex items-center justify-start h-full;
}
.header-title-wrapper h1 {
  @apply text-5xl font-bold;
}

/* ✅ Courses Section */
.courses-section {
  @apply py-12;
}
.subject-card {
  @apply flex items-center bg-white gap-5 border  border-gray-100 rounded-lg p-4 shadow-sm;
}

/* ✅ Video */
.custom-video {
  @apply w-full h-96 rounded-xl shadow-md;
}
</style>
