<script setup>
import UserEmptyMessage from "~/components/UserEmptyMessage.vue";
</script>

<template>
  <div class="empty-courses-message-wrapper">
    <GlobalMessage>
      <!-- ✅ Image Slot -->
      <template #image>
        <img
          src="/assets/media/empty_messages/empty_courses.png"
          alt="Empty Message Image"
          width="250"
          height="130"
          class="object-contain"
        />
      </template>

      <!-- ✅ Message Slot -->
      <template #message>
        <h2 class="message-title">{{ $t("TITLES.empty_courses") }}</h2>
      </template>
    </GlobalMessage>
  </div>
</template>

<style scoped>
.empty-courses-message-wrapper {
  @apply flex items-center justify-center min-h-[70vh];
}
</style>
