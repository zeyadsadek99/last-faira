<template>
    <div class="image-header-wrapper">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  defineProps({});
  </script>
  
  <style scoped>
  /* ✅ Apply Tailwind Styles */
  /* .courses_section_wrapper .image_header_wrapper {
    @apply bg-[#fff0e1];
  } */
  .image-header-wrapper {
    @apply h-[350px] bg-contain bg-no-repeat bg-left bg-[#fff0e1];
    background-image: url("/assets/media/shapes/green_logo_title.png");
  }
  
  .image-header-wrapper img {
    @apply w-full object-cover;
  }
  
  .image-header-wrapper .header-container {
    @apply flex items-center justify-start h-full;
  }
  
  .image-header-wrapper .header-container h1 {
    @apply w-[30%] text-5xl font-bold mb-0;
  }
  
  /* ✅ Responsive Styles */
  @media (max-width: 767px) {
    .image-header-wrapper {
      @apply h-[180px] bg-[65%] bg-left;
    }
    .image-header-wrapper img {
      @apply h-[130px];
    }
    .image-header-wrapper .header-container h1 {
      @apply w-[55%] text-[3.3rem];
    }
  }
  </style>
  