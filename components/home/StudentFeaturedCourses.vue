<template>
  <div class="featured_courses_wrapper">
    <div class="container">
      <!-- START:: HEADER WRAPPER -->
      <div class="section_title_wrapper">
        <h2 class="title">
          <img
            src="../../assets/media/shapes/title_icon.svg"
            alt="Title Icon"
          />
          <span>{{ t("TITLES.recently_added") }}</span>
        </h2>

        <div class="route_wrapper">
          <NuxtLink to="/course-section/distance-learning-lessons">
            {{ t("BUTTONS.show_all") }}
          </NuxtLink>
        </div>
      </div>
      <!-- END:: HEADER WRAPPER -->

      <!-- START:: FEATURED COURSES SLIDER -->
      <div class="featured_courses_slider_wrapper mt-5">
        <swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="15"
          :loop="false"
          :autoplay="{ delay: 6000 }"
          :speed="2000"
          :pagination="{ clickable: true }"
          :breakpoints="{
            0: { slidesPerView: 1 },
            750: { slidesPerView: 2 },
            900: { slidesPerView: 4 },
          }"
          dir="rtl"
          class="mySwiper"
        >
        <swiper-slide
            v-for="course in Items"
            :key="course.id"
            class="slider_image_wrapper"
            :dir="getAppLocale == 'ar' ? 'rtl' : 'ltr'"
          >
          <NuxtLink :to="'/courses-categories/' + course.id">
              <div>
                <img
                  :src="course.specialization_ar"
                  alt="Course Category Image"
                />

                <div class="wrapper">
                  <p class="course_name">
                    {{ course.subject_name }}
                  </p>
                  <p class="courses_count">
                    {{ course.num_of_courses }}
                    <span class="font-weight-light text-secondary">كورس</span>
                  </p>
                </div>
                <div class="wrapper">
                  <p class="teachers_count">
                    {{ course.num_of_teachers }}
                    <span class="font-weight-light text-secondary">معلم</span>
                  </p>
                </div>
              </div>
            </NuxtLink>
          </swiper-slide>
      </swiper>
      </div>
      <!-- END:: FEATURED COURSES SLIDER -->
    </div>
  </div>
</template>

<script setup>
// import { defineProps, computed } from "vue";
import { useI18n } from "vue-i18n";
// import { useAppLangStore } from "@/stores/appLang"; // Import Pinia store
// import ImagedCard from "../ui/ImagedCard.vue";

// Internationalization
const { t } = useI18n();
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Pinia Store for Language
// const appLangStore = useAppLangStore();
// const appLocale = computed(() => appLangStore.appLanguage);
// console.log("appLocale", appLocale);

// Props
defineProps({
  Items: Array,
});
</script>

<style scoped>
/* Custom Swiper Styles */
.mySwiper {
  @apply w-full;
}

.slider_image_wrapper {
  @apply relative h-[400px];
}

.slider_image_wrapper img {
  @apply w-full h-full object-cover;
}

.slide_content_wrapper {
  @apply absolute top-0 right-0 w-full h-full bg-black bg-opacity-50;
}

.slide_content_wrapper h2 {
  @apply absolute right-[25px] top-1/2 transform -translate-y-1/2 w-[35%] mb-[30px] text-[70px] leading-none text-white;
  font-family: "ArbFONTS-Somar-Bold";
}

/* .start_tutorial_route {
  @apply relative inline-block w-[150px] text-center mt-[30px] px-[20px] py-[5px] text-[25px] text-white 
  border border-[var(--main_theme_clr)] rounded-[10px] transition-all duration-500 ease-in-out 
  bg-gradient-to-r from-transparent via-transparent to-[var(--main_theme_clr)] bg-[400%];
  background: linear-gradient();
} */

.start_tutorial_route:hover {
  @apply bg-[0%] text-[var(--main_theme_clr)];
}

.start_tutorial_route .btn_loader {
  @apply absolute left-[15px] top-[30%] w-[20px] h-[20px] p-[2px] border-[3px]  border-white 
    rounded-full transition-all duration-500 ease-in-out inline-block 
  animate-spin;
}

.start_tutorial_route:disabled {
  @apply opacity-50;
}

/* Swiper Pagination Dots */
/* .swiper-pagination-bullet {
  @apply bg-[var(--main_theme_clr)] opacity-30 transition-all duration-500 ease-in-out;
}

.swiper-pagination-bullet-active {
  @apply bg-[var(--main_theme_clr)] opacity-100 scale-[1.3];
} */

/* Responsive Adjustments */
@media (max-width: 767px) {
  .slider_image_wrapper {
    @apply h-[180px];
  }

  .slide_content_wrapper h2 {
    @apply mb-[15px] text-[40px] w-[80%];
  }
}

.featured_courses_wrapper {
  padding-block: 50px;
}
.featured_courses_wrapper .section_title_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.featured_courses_wrapper .section_title_wrapper .title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -moz-column-gap: 12px;
  column-gap: 12px;
}
.featured_courses_wrapper .section_title_wrapper .title img {
  width: 60px;
}
.featured_courses_wrapper .section_title_wrapper .title span {
  font-size: 2.3rem;
  font-family: "ArbFONTS-Somar-Bold";
  color: var(--theme_text_clr);
}
.featured_courses_wrapper .section_title_wrapper .route_wrapper a {
  text-decoration: none;
  width: -moz-max-content;
  width: max-content;
  display: block;
  font-size: 22px;
  font-family: "ArbFONTS-Somar-SemiBold";
  color: var(--main_theme_clr);
}
/* .featured_courses_wrapper .carousel__viewport .carousel__track {
  position: relative;
}
.featured_courses_wrapper .carousel__viewport .carousel__pagination {
  padding-top: 15px;
}
.featured_courses_wrapper
  .carousel__pagination
  .carousel__pagination-item
  span {
  background: var(--main_theme_clr);
  opacity: 0.3;
  transition: all 0.4s ease-in-out;
}
.featured_courses_wrapper
  .carousel__viewport
  .carousel__pagination
  .carousel__pagination-item.active
  span {
  background: var(--main_theme_clr);
  opacity: 1;
  transform: scale(1.3);
} */
</style>
