<template>
  <div class="featured_courses_wrapper py-12">
    <div class="container">
      <!-- START:: HEADER WRAPPER -->
      <GlobalHeader
        :title="$t('TITLES.recently_added')"
        :showLink="true"
        routePath="/course-section/distance-learning-lessons"
        :linkText="$t('BUTTONS.show_all')"
      />

      <!-- END:: HEADER WRAPPER -->

      <!-- START:: FEATURED COURSES SLIDER -->
      <div class="featured_courses_slider_wrapper mt-5 relative">
        <Swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="15"
          :loop="false"
          :autoplay="{ delay: 6000 }"
          :speed="2000"
          :pagination="{ clickable: true, el: '.swiper-pagination' }"
          :breakpoints="{
            0: { slidesPerView: 1 },
            750: { slidesPerView: 2 },
            900: { slidesPerView: 4 },
          }"
          class="pb-12"
        >
          <SwiperSlide v-for="course in Items" :key="course.id" class="p-2">
            <NuxtLink :to="'/courses-categories/' + course.id" class="block">
              <div
                class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2"
              >
                <!-- Course Image -->
                <div class="w-full h-48 overflow-hidden">
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
          </SwiperSlide>
        </Swiper>

        <div
          class="swiper-pagination absolute bottom-0 left-1/2 transform -translate-x-1/2"
        ></div>
      </div>
      <!-- END:: FEATURED COURSES SLIDER -->
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Internationalization
const { t } = useI18n();

// Props
defineProps({
  Items: Array,
});
</script>

<style scoped>
/* ✅ Custom Styling for Pagination */
.swiper-pagination {
  @apply flex justify-center items-center mt-4;
}
</style>
