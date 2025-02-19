<script setup>
import { computed } from "vue";
// import { useAppLangStore } from "~/stores/appLang"; // ✅ Pinia store for language
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css"; // ✅ Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
// const langStore = useAppLangStore();
// const getAppLocale = computed(() => langStore.appLanguage.value); // ✅ Get language from Pinia

defineProps({
  Items: Array,
});
</script>

<template>
  <div class="featured-courses-wrapper">
    <div class="container mx-auto px-4">
      <!-- ✅ Section Title -->
      <div class="section-title-wrapper">
        <h2 class="title">
          <img src="/assets/media/shapes/title_icon.svg" alt="Title Icon" />
          <span>{{ $t("TITLES.my_sons") }}</span>
        </h2>
        <div class="route-wrapper">
          <NuxtLink to="/my-sons">{{ $t("BUTTONS.show_all") }}</NuxtLink>
        </div>
      </div>

      <!-- ✅ Featured Courses Slider -->
      <div class="featured-courses-slider-wrapper relative mt-5">
        <Swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="15"
          :loop="false"
          :autoplay="{ delay: 6000 }"
          :pagination="{ clickable: true, el: '.swiper-pagination' }"
          :speed="2000"
          :breakpoints="{
            0: { slidesPerView: 1 },
            750: { slidesPerView: 2 },
            900: { slidesPerView: 4 },
          }"
          class="pb-12"
        >
          <SwiperSlide v-for="item in Items" :key="item.id" class="p-2">
            <!-- <NuxtLink :to="`/son-courses/${item.user.id}`">
              <div class="imaged-card">
                <div class="card-image block w-full rounded-2xl">
                  <img :src="item.user.image" alt="Course Category Image" />
                </div>
                <div class="card-text">
                  <p class="course-name text-xl font-semibold text-themeText">{{ item.user.fullname }}</p>
                  <p class="duration ">
                    <span class="text-xl font-semibold text-themeText">{{ item.user.academic_year.name }}</span>
                  </p>
                </div>
              </div>

            </NuxtLink> -->
            <NuxtLink :to="`/son-courses/${item.user.id}`" class="block">
              <div
                class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2"
              >
                <!-- Course Image -->
                <div class="w-full h-48 overflow-hidden">
                  <img
                    :src="item.user.image"
                    alt="Course Category Image"
                    class="w-full h-full object-fill"
                  />
                </div>

                <!-- Course Details -->
                <div class="p-4 flex justify-between">
                  <!-- Course Info -->
                  <div class="flex flex-col text-right">
                    <p class="text-xl font-semibold text-gray-800">
                      {{ item.user.fullname }}
                    </p>
                    <p class="text-xl flex gap-1 font-semibold text-gray-600">
                      <span>{{ item.user.academic_year.name }}</span>
                      <!-- <span class="text-gray-500">كورس</span> -->
                    </p>
                  </div>

                  <!-- Teacher Info -->
                  <!-- <div class="">
                    <p class="flex gap-1 text-xl font-semibold text-gray-800">
                      {{ course.num_of_teachers }}
                      <span class="text-gray-500">معلم</span>
                    </p>
                  </div> -->
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination absolute bottom-0 text-mainTheme left-1/2 transform -translate-x-1/2"></div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ✅ Applying Tailwind Styles */
.featured-courses-wrapper {
  @apply py-12;
}

.section-title-wrapper {
  @apply flex items-center justify-between;
}

.title {
  @apply flex items-center gap-3;
}

.title img {
  @apply w-16;
}

.title span {
  @apply text-3xl font-bold text-themeText;
}

.route-wrapper a {
  @apply text-xl font-semibold text-mainTheme no-underline;
}

/* ✅ Card Styles */
/* .imaged-card {
  @apply bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl;
}

.card-image img {
  @apply w-full h-48 object-fill rounded-t-lg;
}

.card-text {
  @apply p-4 text-start;
}

.course-name {
  @apply text-lg font-semibold text-gray-800;
}

.duration {
  @apply text-sm text-gray-600 mt-1;
} */
.swiper-pagination {
  @apply flex justify-center items-center mt-4;
}
</style>
