<template>
    <div class="sons-wrapper w-full">
      <!-- ✅ START:: BREADCRUMB -->
      <GlobalBreadCrumbs>
        <template v-slot:page_title> {{ t("TITLES.my_sons") }} </template>
        <template v-slot:breadcrumb_current_page> {{ t("TITLES.my_sons") }} </template>
      </GlobalBreadCrumbs>
      <!-- ✅ END:: BREADCRUMB -->
  
      <!-- ✅ START:: MAIN LOADER -->
      <Loader1 v-if="isLoading" />
      <!-- ✅ END:: MAIN LOADER -->
  
      <!-- ✅ START:: CONTENT -->
      <div v-else class="sons-content-wrapper fadeIn">
        <div class="container mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <!-- ✅ SON CARD -->
            <NuxtLink 
              v-for="son in userData" 
              :key="son.id" 
              :to="`/son-courses/${son.child_data.id}`" 
              class="son-card-wrapper"
            >
              <!-- ✅ IMAGE WRAPPER -->
              <div class="image-wrapper">
                <img :src="son.child_data.image" alt="Son Image" class="w-full h-full object-cover rounded-lg" />
              </div>
              <!-- ✅ NAME -->
              <h3 class="name">{{ son.child_data.fullname }}</h3>
              <!-- ✅ STUDY YEAR -->
              <h4 class="study-year">{{ son.child_data.academic_year.name }}</h4>
            </NuxtLink>
            <!-- ✅ END:: SON CARD -->
          </div>
        </div>
      </div>
      <!-- ✅ END:: CONTENT -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useApiStore } from "@/stores/apiStores";
//   import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
//   import MainLoader from "@/components/ui/loaders/MainLoader.vue";
  
  const { t } = useI18n();
  const apiStore = useApiStore();
  
  const userData = ref([]);
  const isLoading = ref(false);
  
  const getSons = async () => {
    isLoading.value = true;
    try {
      const response = await apiStore.getSons(); // Fetch API from Pinia store
      userData.value = response.data;
    } catch (error) {
      console.error("Error fetching sons:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    getSons();
  });
  </script>
  
  <style scoped>
  /* ✅ Sons Content Wrapper */
  .sons-content-wrapper {
    @apply py-10;
  }
  
  /* ✅ Son Card */
  .son-card-wrapper {
    @apply block p-4 bg-themeBg rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out;
  }
  
  .image-wrapper {
    @apply w-full h-40;
  }
  
  .name {
    @apply text-center text-[25px] text-themeText font-medium my-4;
  }
  
  .study-year {
    @apply text-center text-[22px] text-lightGray font-medium;
  }
  </style>
  