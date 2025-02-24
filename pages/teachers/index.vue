<template>
  <div>
    <!-- ✅ Loader -->
    <Loader1 v-if="isLoading" />

    <div v-else class="teachers-wrapper fadeIn">
      <!-- ✅ Header Section -->
      <ImageHeader
        bgColor="bg-[#F5ECFF]"
        bgImage="/media/shapes/pi_sempole.svg"
        :customStyle="{ marginLeft: '-80px' }"


      >
        <div class="header-container container pb-5">
          <div class="container flex justify-start items-center">
            <div class="header-title-wrapper mt-6 text-center">
              <img
                src="@/assets/media/images/pi.png"
                alt="teachers"
                class="w-[50%]  object-contain"
              />
              <h1 class="text-[5rem] font-bold text-themeText">
                {{ $t("TITLES.teachers") }}
              </h1>
            </div>
          </div>
        </div>
      </ImageHeader>

      <!-- ✅ Search & Filters -->
      <div class="container flex py-10 flex-col items-center">
        <!-- ✅ Search Input -->
        <div class="relative w-full max-w-3xl">
          <input
            type="text"
            v-model="searchKeyword"
            @keydown.enter="searchTeachers"
            :placeholder="$t('PLACEHOLDERS.search_for_teacher')"
            class="w-full py-3 pl-12 pr-14 text-lg bg-gray-100 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <!-- 🔍 Search Icon (Right) -->
          <i
            class="fa fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          ></i>
          <!-- ⚙️ Filter Icon (Left) -->
          <img
            src="@/assets/media/icons/filter.png"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            @click="toggleDropdown"
            alt="Filter Icon"
          />

          <!-- 🎯 Filter Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute left-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-10"
            style="top: 50px"
          >
            <div class="space-y-3">
              <!-- 📚 Subject -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">{{
                  $t("PLACEHOLDERS.subject_name")
                }}</label>
                <div class="relative">
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
                  <i class="fa fa-chevron-down dropdown-icon"></i>
                  <!-- ⬇️ Icon -->
                </div>
              </div>

              <!-- 🏙️ City -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">{{
                  $t("PLACEHOLDERS.city")
                }}</label>
                <div class="relative">
                  <select v-model="selectedCityId" class="dropdown-select">
                    <option selected disabled :value="null">
                      {{ $t("PLACEHOLDERS.city") }}
                    </option>
                    <option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city.id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                  <i class="fa fa-chevron-down dropdown-icon"></i>
                  <!-- ⬇️ Icon -->
                </div>
              </div>

              <!-- 🎓 Degree -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">{{
                  $t("PLACEHOLDERS.study_degree")
                }}</label>
                <div class="relative">
                  <select
                    v-model="selectedDegreeId"
                    @change="getSpecializations"
                    class="dropdown-select"
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
                  <i class="fa fa-chevron-down dropdown-icon"></i>
                  <!-- ⬇️ Icon -->
                </div>
              </div>

              <!-- 🏅 Specialization -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">{{
                  $t("PLACEHOLDERS.teacher_specialty")
                }}</label>
                <div class="relative">
                  <select
                    v-model="selectedSpecializationId"
                    class="dropdown-select"
                  >
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
                  <i class="fa fa-chevron-down dropdown-icon"></i>
                  <!-- ⬇️ Icon -->
                </div>
              </div>

              <!-- ⭐ Rate -->
              <div class="relative">
                <label class="block text-gray-700 mb-1">{{
                  $t("PLACEHOLDERS.rate")
                }}</label>
                <div class="relative">
                  <select v-model="selectedRate" class="dropdown-select">
                    <option selected disabled :value="null">
                      {{ $t("PLACEHOLDERS.rate") }}
                    </option>
                    <option>1 star</option>
                    <option>2 stars</option>
                    <option>3 stars</option>
                    <option>4 stars</option>
                    <option>5 stars</option>
                  </select>
                  <i class="fa fa-chevron-down dropdown-icon"></i>
                  <!-- ⬇️ Icon -->
                </div>
              </div>

              <!-- ✅ Buttons -->
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
            <NuxtLink :to="`/teachers/${teacher.id}`" class="teacher-card">
              <!-- ✅ Row: Image + Name + Specialization -->
              <div class="teacher-header">
                <img
                  :src="teacher.profile_image"
                  :alt="teacher.fullname"
                  class="teacher-image"
                />
                <div class="teacher-details">
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
                </div>
              </div>

              <!-- ✅ Below the Row: Teacher Description -->
              <p class="teacher-desc">{{ teacher.desc }}</p>
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
          @paginationClick="changePage"
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
      // params: { page: currentPage.value },
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
const getCities = async () => {
  try {
    const response = await $axios.get("/cities", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

        "Accept-Language": "ar",
        "Cache-Control": "no-cache",
      },
    });
    cities.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// ✅ Get All Degrees
const getDegrees = async () => {
  try {
    const response = await $axios.get("/degrees", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

        "Accept-Language": "ar",
        "Cache-Control": "no-cache",
      },
    });
    degrees.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// ✅ Get Specializations based on selected degree
const getSpecializations = async () => {
  if (!selectedDegreeId.value) return;

  try {
    const response = await $axios.get(
      `/specializations/${selectedDegreeId.value}`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

          "Accept-Language": "ar",
          "Cache-Control": "no-cache",
        },
      }
    );
    specializations.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// ✅ Get All Subjects
const getSubjects = async () => {
  try {
    const response = await $axios.get("/student/all-subject-name", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

        "Accept-Language": "ar",
        "Cache-Control": "no-cache",
      },
    });
    subjects.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

// ✅ Search Teachers
const searchTeachers = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get("/student/all_teachers", {
      params: {
        keyword: searchKeyword.value,
        city_id: selectedCityId.value,
        avg_rate: selectedRate.value,
        subject_id: selectedSubjectId.value,
        degree_id: selectedDegreeId.value,
        specialization_id: selectedSpecializationId.value,
      },
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDI5NTUwNCwiZXhwIjoxNzcxODMxNTA0LCJuYmYiOjE3NDAyOTU1MDQsImp0aSI6InVscE5rTVBCYnhQY0NYU1MiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JdnZaVm7B3_gErAeelc-CBIqtLGLVtS3Ri-48r2pous`,

        "Accept-Language": "ar",
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
  searchTeachers();
};

const resetFilters = () => {
  isLoading.value = false;

  selectedCityId.value = null;
  selectedRate.value = null;
  selectedSubjectId.value = null;
  selectedDegreeId.value = null;
  selectedSpecializationId.value = null;
  // getTeachers();
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return teachers.value.slice(start, start + itemsPerPage);
});
console.log(paginatedTeachers);
const changePage = (pageNum) => {
  // console.log(currentPage)
  if (pageNum > 0 && pageNum <= totalPages.value) {
    currentPage.value = pageNum; // ✅ Update Page First
    // console.log(currentPage)
    // getTeachers(); // ✅ Fetch New Page Data
  }
};

const totalPages = computed(() => {
  return teachers.value.length > 0
    ? Math.ceil(teachers.value.length / itemsPerPage)
    : 1;
});

onMounted(() => {
  getTeachers();
  getCities();
  getDegrees();
  getSubjects();
});
</script>

<style scoped>
/* ✅ Search Input */
.search-input {
  @apply w-full py-3 pl-12 pr-14 bg-gray-100 rounded-lg border text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none;
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
.dropdown-item {
  @apply my-3 w-full;
}
.dropdown-select {
  @apply w-full py-2 pr-10 pl-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none appearance-none;
}
.dropdown-icon {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none;
}
/* ✅ Buttons */
.btn-filter {
  @apply px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg transition hover:bg-blue-700;
}
.btn-clear {
  @apply px-6 py-2 bg-red-500 text-white font-semibold rounded-lg transition hover:bg-red-600;
}

.teacher-card {
  @apply flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg;
}
.teacher-header {
  @apply flex items-center gap-6; /* Image + Details in one row */
}
.teacher-image {
  @apply w-32 h-32 rounded-xl object-cover; /* Bigger image, square rounded corners */
}
.teacher-details {
  @apply flex flex-col;
}
.teacher-name {
  @apply text-[2rem] font-bold text-themeText; /* Larger font */
}
.teacher-specialization {
  @apply text-2xl text-secondary; /* Bigger specialization text */
}
.teacher-desc {
  @apply text-2xl text-secondary mt-4; /* Space between details & description */
}
</style>
