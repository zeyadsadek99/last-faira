<template>
  <div>
    <!-- ✅ Loader -->
    <Loa der1 v-if="isLoading" />

    <div v-else class="teachers-wrapper fadeIn">
      <!-- ✅ Header Section -->
      <ImageHeader
        bgColor="bg-[#F5ECFF]"
        bgImage="@/assets/media/shapes/pi_sempole.svg"
      >
        <div class="header-container pb-5">
          <div class="container flex justify-center items-center">
            <div class="header-title-wrapper mt-6 text-center">
              <img
                src="@/assets/media/images/pi.png"
                alt="teachers"
                class="w-48 mx-auto"
              />
              <h1 class="text-3xl font-bold text-themeText">
                {{ $t("TITLES.teachers") }}
              </h1>
            </div>
          </div>
        </div>
      </ImageHeader>

      <!-- ✅ Search & Filters -->
      <div class="container my-6">
        <div dir="ltr" class="relative w-full max-w-lg mx-auto">
          <!-- 🔍 Search Input -->
          <input
            type="text"
            class="search-input"
            :placeholder="$t('PLACEHOLDERS.search_for_teacher')"
            v-model="searchKeyword"
            @keydown.enter="searchTeachers"
          />
          <i class="fa fa-search search-icon"></i>
          <img
            src="@/assets/media/icons/filter.png"
            class="filter-icon"
            title="filter"
            @click="toggleDropdown"
            alt="search for teacher"
          />

          <!-- 🎯 Filter Dropdown -->
          <div v-if="showDropdown" class="dropdown-list">
            <select v-model="selectedSubjectId" class="dropdown-select">
              <option selected disabled :value="null">
                {{ $t("PLACEHOLDERS.subject_name") }}
              </option>
              <option
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.subject_name }}
              </option>
            </select>

            <select v-model="selectedCityId" class="dropdown-select">
              <option selected disabled :value="null">
                {{ $t("PLACEHOLDERS.city") }}
              </option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>

            <select
              v-model="selectedDegreeId"
              class="dropdown-select"
              @change="getSpecializations"
            >
              <option selected disabled :value="null">
                {{ $t("PLACEHOLDERS.study_degree") }}
              </option>
              <option
                v-for="degree in degrees"
                :key="degree.id"
                :value="degree.id"
              >
                {{ degree.name }}
              </option>
            </select>

            <select v-model="selectedSpecializationId" class="dropdown-select">
              <option selected disabled :value="null">
                {{ $t("PLACEHOLDERS.teacher_specialty") }}
              </option>
              <option
                v-for="specialization in specializations"
                :key="specialization.id"
                :value="specialization.id"
              >
                {{ specialization.name }}
              </option>
            </select>

            <select v-model="selectedRate" class="dropdown-select">
              <option selected disabled :value="null">
                {{ $t("PLACEHOLDERS.rate") }}
              </option>
              <option v-for="n in 5" :key="n">{{ n }} stars</option>
            </select>

            <div class="flex justify-between mt-3">
              <button class="btn-filter" @click="filterTeachers">
                {{ $t("BUTTONS.filter") }}
              </button>
              <button class="btn-clear" @click="resetFilters">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Teachers List -->
      <div class="container my-8">
        <div
          v-if="teachers.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          <GlobalSolidCard
            v-for="teacher in paginatedTeachers"
            :key="teacher.id"
          >
            <NuxtLink :to="`/teacher/${teacher.id}`" class="teacher-card">
              <img
                :src="teacher.profile_image"
                :alt="teacher.fullname"
                class="teacher-image"
              />
              <div class="teacher-info">
                <h2 class="teacher-name">{{ teacher.fullname }}</h2>
                <p class="teacher-specialization">
                  {{
                    teacher.specializations
                      .map((s) => s.name)
                      .slice(0, 2)
                      .join(" / ")
                  }}
                  <span v-if="teacher.specializations.length > 2">...</span>
                </p>
                <p class="teacher-desc">{{ teacher.desc }}</p>
              </div>
            </NuxtLink>
          </GlobalSolidCard>
        </div>

        <!-- 🛑 No Teachers Found -->
        <div v-else class="text-center mt-6">
          <h4 class="text-red-500 text-lg">{{ $t("TITLES.noTeachers") }}</h4>
        </div>
        
        <!-- ✅ Pagination -->
        <GlobalPagination
          v-if="totalPages > 1"
          :last_page="totalPages"
          :current_page="currentPage"
          @pagenationClick="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";
import image2 from "../../assets/media/shapes/pi_sempole.svg";
//   import MainLoader from "@/components/ui/loaders/MainLoader.vue";
//   import ImageHeader from "@/components/ui/ImageHeader.vue";
//   import SolidCard from "@/components/ui/SolidCard.vue";
//   import GlobalPagination from "@/components/global/GlobalPagination.vue";

const { $axios } = useNuxtApp(); // 🔥 Use Nuxt 3 Axios

const isLoading = ref(true);
const showDropdown = ref(false);
const teachers = ref([]);
const searchKeyword = ref("");
const selectedCityId = ref(null);
const selectedSubjectId = ref(null);
const selectedDegreeId = ref(null);
const selectedSpecializationId = ref(null);
const selectedRate = ref(null);
const currentPage = ref(1);
const itemsPerPage = 6;
const subjects = ref([]);
const cities = ref([]);
const degrees = ref([]);
const specializations = ref([]);

const getTeachers = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get("/student/all_teachers", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,
        //   Authorization: `Bearer ${authStore.token}`,
        "Accept-Language": "ar",
        //   "Accept-Language": authStore.language,
        "Cache-Control": "no-cache",
      },
    });
    teachers.value = response.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};


const filterTeachers = () => {
  showDropdown.value = false;
  getTeachers();
};

const resetFilters = () => {
  selectedCityId.value = null;
  selectedRate.value = null;
  selectedSubjectId.value = null;
  selectedDegreeId.value = null;
  selectedSpecializationId.value = null;
  getTeachers();
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return teachers.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
  return teachers.value.length > 0
    ? Math.ceil(teachers.value.length / itemsPerPage)
    : 1;
});

onMounted(() => {
  getTeachers();
});
</script>

<style scoped>
/* ✅ Search Input */
.search-input {
  @apply w-full py-3 pl-10 pr-12 bg-gray-100 rounded-lg border-none text-lg;
}
.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500;
}
.filter-icon {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer;
}

/* ✅ Filter Dropdown */
.dropdown-list {
  @apply absolute left-0 w-full bg-white shadow-md rounded-lg p-4;
}
.dropdown-select {
  @apply w-full py-2 border rounded-lg mb-2;
}

/* ✅ Teacher Card */
.teacher-card {
  @apply flex gap-4 p-4 bg-white rounded-lg shadow-md;
}
.teacher-image {
  @apply w-24 h-24 rounded-full object-cover;
}
.teacher-info {
  @apply flex flex-col;
}
.teacher-name {
  @apply text-xl font-bold text-gray-900;
}
.teacher-specialization {
  @apply text-sm text-gray-600;
}
.teacher-desc {
  @apply text-sm text-gray-500;
}
</style>
