<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import GlobalBreadCrumbs from "~/components/global/GlobalBreadCrumbs.vue";
// import Breadcrumb from "~/components/structure/TheBreadcrumb.vue";
// import MainLoader from "~/components/ui/loaders/MainLoader.vue";

const { $axios } = useNuxtApp(); // ✅ Access Nuxt’s global `$axios` instance

const isLoading = ref(false);
const userData = ref([]);

// ✅ Fetch Data from API Using `$axios`
const getSons = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get("parent/my-children", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTczOTg5MDA2NCwiZXhwIjoxNzcxNDI2MDY0LCJuYmYiOjE3Mzk4OTAwNjQsImp0aSI6Ik84cHRPaUFDOGZtS3NUV1kiLCJzdWIiOiIxNzQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.tetCd0ksKooO1a7Bj5V5o8EifI30H7hX1ZpyzlazjMw`,
        "Accept-language": process.client ? localStorage.getItem("elmo3lm_elmosa3d_app_lang") || "en" : "en",
        "cache-control": "no-cache",
        Accept: "application/json",
      },
    });

    userData.value = response.data.data;
  } catch (error) {
    console.error("❌ Error fetching sons data:", error);
  } finally {
    isLoading.value = false;
  }
};

// ✅ Fetch Data on Component Mount
onMounted(() => {
  getSons();
});
</script>

<template>
  <div class="sons-wrapper">
    <!-- ✅ Breadcrumb -->
    <GlobalBreadCrumbs>
      <template v-slot:page_title> {{ $t("TITLES.my_sons") }} </template>
      <template v-slot:breadcrumb_current_page>
        {{ $t("TITLES.my_sons") }}
      </template>
    </GlobalBreadCrumbs>

    <!-- ✅ Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Sons List -->
    <div v-else class="sons-content-wrapper fadeIn py-9">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <!-- ✅ Son Card -->
          <NuxtLink
            v-for="son in userData"
            :key="son.id"
            :to="`/mySons/${son.child_data.id}`"
            class="son-card-wrapper p-4 bg-themeBg rounded-lg shadow-md transition hover:scale-105"
          >
            <!-- ✅ Image -->
            <div class="image-wrapper h-40 w-full">
              <img
                :src="son.child_data.image"
                alt="Son Image"
                class="w-full h-full object-cover rounded-lg"
              />
            </div>

            <!-- ✅ Name -->
            <h3 class="name text-center mt-4 text-2xl font-medium text-themeText">
              {{ son.child_data.fullname }}
            </h3>

            <!-- ✅ Study Year -->
            <h4 class="study-year text-center mt-2 text-lg text-lightGray">
              {{ son.child_data.academic_year.name }}
            </h4>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ✅ Using @apply for Tailwind Styling */
.sons-wrapper {
  @apply w-full;
}

.sons-content-wrapper {
  @apply py-9;
}

.son-card-wrapper {
  @apply block no-underline bg-themeBg p-4 rounded-lg shadow-md transition hover:scale-105;
}

.image-wrapper {
  @apply w-full h-40;
}

.image-wrapper img {
  @apply w-full h-full object-cover rounded-lg;
}

.name {
  @apply text-center mt-4 text-2xl font-medium text-themeText;
}

.study-year {
  @apply text-center mt-2 text-lg text-lightGray;
}
</style>
