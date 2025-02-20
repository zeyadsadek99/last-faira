<template>
  <div v-if="lastPage > 1" class="pagination-container">
    <ul>
      <li
        v-for="index in lastPage"
        :key="index"
        v-if="
          Math.abs(currentPage - index) < 4 ||
          index === lastPage ||
          index === 1
        "
        :class="{ 'dots': index === lastPage && Math.abs(currentPage - index) > 4 }"
      >
        <button
          type="button"
          @click="paginationClick(index)"
          :class="{
            'active': index === currentPage,
            'last': lastPage === index && Math.abs(currentPage - index) > 4
          }"
        >
          {{ index }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  lastPage: Number,
  currentPage: Number
});

const emit = defineEmits(["paginationClick"]);

const paginationClick = (pageNum) => {
  emit("paginationClick", pageNum);
};
</script>

<style scoped>
/* ✅ Pagination Container */
.pagination-container {
  @apply w-full py-6 text-center;
}

/* ✅ Pagination List */
.pagination-container ul {
  @apply flex justify-center space-x-2;
}

/* ✅ Pagination List Item */
.pagination-container ul li {
  @apply relative w-9 h-9 text-xl text-themeText;
}

/* ✅ Pagination Button */
.pagination-container ul li button {
  @apply w-full h-full border border-gray-200 rounded-md 
         font-bold text-mainTheme bg-gray-100 transition 
         hover:bg-mainTheme hover:text-white;
}

/* ✅ Active Button */
.pagination-container ul li button.active {
  @apply bg-mainTheme border-mainTheme text-white;
}

/* ✅ Last Page Button */
.pagination-container ul li button.last {
  @apply ml-5;
}

/* ✅ Dots Indicator */
.pagination-container ul li.dots::before {
  content: "...";
  @apply absolute text-xl text-darkGray left-1/2 transform -translate-x-1/2;
}
</style>
