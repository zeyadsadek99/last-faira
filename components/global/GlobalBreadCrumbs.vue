<template>
  <div class="breadcrumb_wrapper">
    <!-- START:: PAGE TITLE -->
    <h2 class="page_title">
      <slot name="page_title"></slot>
    </h2>
    <!-- END:: PAGE TITLE -->

    <!-- START:: BREADCRUMB -->
    <h4 class="breadcrumb_routs">
      <!-- ====== HOME PAGE ROUTE -->
      <NuxtLink to="/" class="breadcrumb_link">{{ t("TITLES.home") }}</NuxtLink>

      <!-- ====== BREADCRUMB ARROW -->
      <span> > </span>

      <!-- ====== CURRENT PAGE NAME -->
      <p>
        <slot name="breadcrumb_current_page"></slot>
      </p>
    </h4>
    <!-- END:: BREADCRUMB -->
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

// ✅ Use Nuxt 3 i18n setup
const { t } = useI18n();
</script>

<style scoped>
/* ✅ Breadcrumb Wrapper */
.breadcrumb_wrapper {
  @apply relative h-[200px] z-30 bg-mainTheme flex flex-col items-center justify-center overflow-hidden isolate;
}

/* ✅ Background Shapes */
.breadcrumb_wrapper::before {
  content: "";
  position: absolute;
  width: 540px;
  height: 380px;
  background-size: 100%;
  background-image: url("/assets/media/shapes/light_green_book_bg_shape_left.svg");
  bottom: -70%;
  left: -10px;
  z-index: -1;
}

.breadcrumb_wrapper::after {
  content: "";
  position: absolute;
  width: 540px;
  height: 380px;
  background-size: 100%;
  background-image: url("/assets/media/shapes/light_green_book_bg_shape_right.svg");
  bottom: -70%;
  right: -10px;
  z-index: -1;
}

/* ✅ Title and Breadcrumb */
.page_title {
  @apply text-white text-[3.5rem] font-bold;
}

.breadcrumb_routs {
  @apply flex items-center justify-center gap-2 text-[2.2rem];
}

.breadcrumb_link {
  @apply text-white no-underline;
}

.breadcrumb_routs span {
  @apply text-white text-[40px] opacity-70 flex items-center justify-center;
}

.breadcrumb_routs p {
  @apply text-white m-0 p-0 opacity-70;
}

/* ✅ Responsive Design */
@media (max-width: 767px) {
  .breadcrumb_wrapper {
    @apply h-[110px];
  }
  
  .breadcrumb_wrapper::before,
  .breadcrumb_wrapper::after {
    display: none;
  }
  
  .page_title {
    @apply text-[3rem] m-0;
  }
  
  .breadcrumb_routs {
    @apply text-[2rem] m-0;
  }
}
</style>
