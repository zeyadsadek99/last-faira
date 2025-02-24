<template>
  <div class="featured-courses-wrapper py-12">
    <div class="container mx-auto px-4">
      <!-- ✅ Section Title -->
      <div class="section-title-wrapper flex items-center justify-between">
        <h2 class="title flex items-center gap-3">
          <img
            src="/assets/media/shapes/title_icon.svg"
            alt="Title Icon"
            class="w-12"
          />
          <span class="text-4xl font-bold text-themeText">{{
            $t("TITLES.teachers")
          }}</span>
        </h2>

        <div class="route-wrapper">
          <NuxtLink
            to="/teachers"
            class="text-lg font-semibold text-mainTheme no-underline"
          >
            {{ $t("BUTTONS.show_all") }}
          </NuxtLink>
        </div>
      </div>

      <!-- ✅ Featured Teacher Slider -->
      <div class="featured-courses-slider-wrapper relative mt-8">
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
          <SwiperSlide v-for="teacher in Items" :key="teacher.id">
            <SolidCard
              class="p-5 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <NuxtLink
                :to="`/teachers/${teacher.id}`"
                class="flex items-center gap-4"
              >
                <!-- ✅ Smaller Image -->
                <div class="w-20 h-20 flex-shrink-0">
                  <img
                    :src="teacher.profile_image"
                    :alt="teacher.user_type"
                    class="w-full h-full object-fill rounded-md"
                  />
                </div>

                <!-- ✅ Larger Font for Teacher Info -->
                <div class="flex flex-col">
                  <h2 class="text-2xl font-bold text-gray-900">
                    {{ teacher.fullname }}
                  </h2>

                  <!-- ✅ Specializations -->
                  <div class="flex items-center text-gray-600 text-xl">
                    <span
                      v-for="(
                        specialization, index
                      ) in teacher.specializations.slice(0, 2)"
                      :key="specialization.id"
                    >
                      {{ specialization.name }}
                      <span v-if="index < teacher.specializations.length - 1">
                        /
                      </span>
                    </span>
                    <span v-if="teacher.specializations.length > 2">...</span>
                  </div>
                </div>
              </NuxtLink>
            </SolidCard>
          </SwiperSlide>
        </Swiper>

        <!-- ✅ Swiper Pagination -->
        <div class="swiper-pagination mt-4 flex justify-center"></div>
      </div>
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
import SolidCard from "@/components/global/SolidCard.vue";

const { t } = useI18n();

defineProps({
  Items: Array,
});
</script>

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
  @apply w-12;
}

.title span {
  @apply text-4xl font-bold text-themeText;
}

.route-wrapper a {
  @apply text-lg font-semibold text-mainTheme no-underline;
}

/* ✅ Swiper Pagination */
.swiper-pagination {
  @apply flex justify-center items-center mt-4;
}
</style>
