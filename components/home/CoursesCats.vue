<template>
    <div class="courses_categories_wrapper py-12">
      <div class="container mx-auto ">
        <!-- ✅ Section Title -->
        <div class="section_title_wrapper flex items-center justify-between">
          <h2 class="title flex items-center gap-3">
            <img src="/assets/media/shapes/title_icon.svg" alt="Title Icon" class="w-[60px]" />
            <span class="text-[2.3rem] font-bold text-themeText">{{ $t("TITLES.courses_cats") }}</span>
          </h2>
        </div>
  
        <!-- ✅ Course Categories Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div v-for="category in courseCatsData" :key="category.id">
            <SolidCard>
              <NuxtLink :to="`/courses/${category.id}`" class="card_content_wrapper">
                <h3>{{ category.name }}</h3>
                <img :src="category.category_image" :alt="category.name" class="w-[145px] h-[160px]" />
              </NuxtLink>
            </SolidCard>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
//   import SolidCard from "~/components/home/SolidCard.vue";
  
  // ✅ Accept course categories as Props
  defineProps({
    courseCatsData: Array,
  });
  </script>
<style scoped>
/* ✅ Wrapper */
.courses_categories_wrapper {
  @apply py-12;
}

/* ✅ Section Title */
.section_title_wrapper {
  @apply flex items-center justify-between;
}

.title {
  @apply flex items-center gap-3;
}

.title img {
  @apply w-[60px];
}

.title span {
  @apply text-[2.3rem] font-bold text-themeText;
}

/* ✅ Card Wrapper */
.card_content_wrapper {
  @apply flex items-center justify-between  pb-0 overflow-hidden relative no-underline;
}

.card_content_wrapper img {
  @apply object-contain relative bottom-[-5px];
}

.card_content_wrapper h3 {
  @apply text-[35px] font-semibold text-themeText;
}
</style>
  
  