<template>
    <div class="space-y-3">
      <div v-if="description" class="info-box">
        <h3 class="info-title">{{ $t("TITLES.about_course") }}</h3>
        <p class="info-text">{{ description }}</p>
      </div>
  
      <div v-if="goals && goals.length" class="info-box">
        <h3 class="info-title">{{ $t("TITLES.course_goals") }}</h3>
        <p class="info-text">{{ goals }}</p>
      </div>
  
      <div v-if="enrichments && enrichments.length" class="info-box">
        <h3 class="info-title">{{ $t("TITLES.course_enrichments") }}</h3>
        <p class="info-text">{{ enrichments }}</p>
      </div>
  
      <div  class="info-box">
        <h3 class="info-title">                {{ $t("TITLES.attachments") }}
        </h3>
        <ul class="list-disc pl-4 info-text">
          <li v-for="(file, index) in attachments" :key="index">
            <a :href="file.url" target="_blank" class="text-blue-500 hover:underline">
              {{ file.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    description: String,
    goals: String,
    enrichments: String,
    attachments: Array,
  });
  </script>
  
  <style scoped>
  .info-box {
    @apply p-[10px] border-2 rounded-[15px] my-3 border-secondaryTheme;
  }
  
  .info-title {
    @apply text-themeText text-[25px] font-bold;
  }
  
  .info-text {
    word-break: break-word;
    word-spacing: 2px;
    @apply text-start leading-[1.1] text-[22px] text-lightGray;
  }
  </style>
  