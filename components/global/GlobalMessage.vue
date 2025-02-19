<script setup>
defineProps({});
</script>

<template>
  <div class="user-empty-message-wrapper">
    <!-- ✅ Image Slot -->
    <div class="image-wrapper">
      <slot name="image"></slot>
    </div>

    <!-- ✅ Message Slot -->
    <div class="text-wrapper">
      <slot name="message"></slot>
    </div>
  </div>
</template>

<style scoped>
.user-empty-message-wrapper {
  @apply flex flex-col items-center justify-center min-h-[70vh] gap-4;
}

.image-wrapper img {
  @apply object-contain;
}

.text-wrapper .message-title {
  @apply text-mainTheme font-medium;
}
</style>
