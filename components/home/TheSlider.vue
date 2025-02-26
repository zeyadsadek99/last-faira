<template>
    <div class="slider-wrapper rounded-lg container">
      <!-- ✅ START:: SKELETON LOADER (Uncomment if needed) -->
      <!-- <SliderSkeletonLoader v-if="!sliderData" /> -->
  
      <!-- ✅ START:: SWIPER SLIDER -->
      <swiper
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 6000 }"
        :speed="2000"
        :pagination="{ clickable: true }"
        :dir="appLocale === 'ar' ? 'rtl' : 'ltr'"
        class="relative rounded-2xl container"
      >
        <!-- ✅ START:: SLIDER ITEM -->
        <swiper-slide
          v-for="slide in sliderData"
          :key="slide.id"
          class="relative w-full"
        >
          <img
            :src="slide.slider"
            alt="Slider Image"
            class="w-full h-[450px] object-fill"
          />
        </swiper-slide>
        <!-- ✅ END:: SLIDER ITEM -->
      </swiper>
      <!-- ✅ END:: SWIPER SLIDER -->
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Autoplay, Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  
  // ✅ Get Language for RTL/LTR
  const { locale } = useI18n();
  const appLocale = computed(() => locale.value);
  
  // ✅ Props
  defineProps({
    sliderData: Array,
  });
  </script>
  
  <style scoped>
  /* ✅ Custom Swiper Styling */
  .swiper-pagination {
    @apply mt-4 flex justify-center items-center;
  }
  </style>
  