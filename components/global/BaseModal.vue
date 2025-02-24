<template>
    <transition name="fadeInUp" mode="out-in">
      <div v-if="show" class="model-container">
        <!-- ✅ Background Overlay (Clicking it closes the modal) -->
        <div class="modal-overlay" @click="closeModal"></div>
  
        <!-- ✅ Modal Content (Clicking inside should NOT close the modal) -->
        <div class="main-body" @click.stop>
          <slot name="modal"></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(["controleModalApperance"]);
  
  // ✅ Close modal when clicking on overlay (but NOT inside modal)
  const closeModal = () => {
    emit("controleModalApperance");
  };
  </script>
  
  <style scoped>
  /* ✅ Fullscreen Modal Container */
  .model-container {
    @apply fixed inset-0 z-50 flex items-center justify-center;
  }
  
  /* ✅ Modal Overlay (Clicking on it closes the modal) */
  .modal-overlay {
    @apply absolute inset-0 bg-black bg-opacity-50 ;
  }
  
  /* ✅ Modal Content */
  .main-body {
    @apply relative w-[40%] max-h-[85vh] bg-white px-8 py-5 rounded-lg shadow-lg overflow-y-auto;
  }
  
  /* ✅ Responsive: Adjust modal width on small screens */
  @media (max-width: 767px) {
    .main-body {
      @apply w-[90%];
    }
  }
  
  /* ✅ Smooth fade-in effect */
  .fadeInUp-enter-active,
  .fadeInUp-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .fadeInUp-enter-from,
  .fadeInUp-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  </style>
  