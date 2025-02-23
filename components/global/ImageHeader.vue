<template>
  <div
    class="image-header-wrapper"
    :style="{ backgroundImage: `url(${bgImage})` }"
    :class="bgColor"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

// ✅ Define Props
const props = defineProps({
  bgColor: {
    type: String,
    default: "bg-[#fff0e1]", // Default Tailwind background color
  },
  bgImage: {
    type: String,
    default: "/assets/media/shapes/green_logo_title.png", // Default background image
  },
});
</script>

<style scoped>
.image-header-wrapper {
  @apply h-[350px] bg-contain bg-no-repeat bg-left;
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
