<template>
  <div
    class="image-header-wrapper"
    :style="[backgroundStyle, customStyle]"
    :class="bgColor"
  >
    <slot></slot>
  </div>
</template>

<script setup>
// import { computed } from "vue";
import image1 from "/assets/media/shapes/green_logo_title.png";

// ✅ Define Props
const props = defineProps({
  bgColor: {
    type: String,
    default: "bg-[#fff0e1]", // Default Tailwind background color
  },
  bgImage: {
    type: String,
    default: image1, // Default background image
  },
  customStyle: {
    type: Object,
    default: () => ({ marginLeft: "0px" }), // Default ml-[-80px]
  },
});

// ✅ Computed Background Style
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${props.bgImage})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left",
}));
</script>

<style scoped>
.image-header-wrapper {
  @apply h-[350px] flex justify-start items-center;
}

/* .image-header-wrapper .header-container {
  @apply  flex items-center justify-start h-full;
}

.image-header-wrapper .header-container h1 {
  @apply w-[30%] text-5xl font-bold mb-0;
} */

/* ✅ Responsive Styles */
@media (max-width: 767px) {
  .image-header-wrapper {
    @apply h-[180px] bg-[65%] bg-left;
  }
  .image-header-wrapper .header-container h1 {
    @apply w-[55%] text-[3.3rem];
  }
}
</style>
