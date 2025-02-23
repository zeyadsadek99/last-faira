<template>
  <div v-if="totalPages > 1" class="pagination">
    <ul>
      {{ totalPages }}
      <li
        v-for="index in totalPages"
        :key="index"
        v-if="
          Math.abs(props.current_page - index) < 4 ||
          index === totalPages ||
          index === 1
        "
      >
        <button
          type="button"
          @click="paginationClick(index)"
          :class="{ 'active': index === currentPage }"
        >
          {{ index }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  last_page: { type: Number, required: true },
  current_page: { type: Number, required: true }
});

const emit = defineEmits(["paginationClick"]);

const totalPages = computed(() => props.last_page || 1);

const paginationClick = (pageNum) => {
  console.log("Clicked Page:", pageNum); // Debugging
  emit("paginationClick", pageNum);
};
</script>

<style scoped>
.pagination {
  @apply w-full flex justify-center py-6;
}

.pagination ul {
  @apply flex space-x-2;
}

.pagination ul li button {
  @apply w-9 h-9 border rounded-md text-mainTheme bg-gray-100 transition hover:bg-mainTheme hover:text-white;
}

.pagination ul li button.active {
  @apply bg-mainTheme text-white;
}
</style>
