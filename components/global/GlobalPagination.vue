<template>
  <div v-if="totalPages > 1" class="pagination">
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="3"
      :hide-prev-next="true"  

      color="mainTheme"
      active-color="mainTheme"
      class="custom-pagination"
      @update:model-value="paginationClick"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from "vue";

// ✅ Props
const props = defineProps({
  last_page: { type: Number, required: true }, // Total number of pages
  current_page: { type: Number, required: true } // Current active page
});

// ✅ Emits
const emit = defineEmits(["paginationClick"]);

// ✅ Reactive Current Page
const currentPage = ref(props.current_page);

// ✅ Compute Total Pages
const totalPages = computed(() => props.last_page || 1);

// ✅ Watch for Prop Updates (Keeps Pagination in Sync)
watch(
  () => props.current_page,
  (newPage) => {
    currentPage.value = newPage;
  }
);

// ✅ Emit Page Change
const paginationClick = (pageNum) => {
  console.log("Clicked Page:", pageNum); // Debugging
  emit("paginationClick", pageNum);
};
</script>

<style scoped>
/* ✅ Pagination Container */
.pagination {
  @apply w-full flex justify-center py-6;
}

/* ✅ Custom Pagination Styling */
:deep(.v-pagination .v-btn) {
  @apply w-9 h-9 border rounded-md text-mainTheme bg-gray-100 
         transition hover:bg-mainTheme hover:text-white;
}

/* ✅ Active Page Styling */
:deep(.v-pagination .v-pagination__item.v-pagination__item--is-active button) {
  @apply bg-mainTheme text-white !important;
}

/* ✅ Centering Pagination */
:deep(.v-pagination) {
  @apply flex justify-center;
}
:deep(.v-pagination .v-pagination__prev) {
  @apply hidden; 
}
:deep(.v-pagination .v-pagination__next) {
  @apply hidden; 
}

</style>
