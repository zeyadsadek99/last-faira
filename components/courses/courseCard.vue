<template>
    <NuxtLink :to="link" class="course-card">
      <div class="relative">
        <!-- ✅ Course Image -->
        <img :src="course.image" :alt="course.subject_name" class="w-full h-48 object-cover rounded-lg" />
  
        <!-- ✅ Instructor Info -->
        <div class="instructor-info">
          <img :src="course.teacher.image" alt="Instructor Image" class="w-12 h-12 rounded-full" />
          <div>
            <p class="text-white font-bold">{{ course.teacher.fullname }}</p>
            <p class="text-yellow-400">
              <i class="fas fa-star"></i> {{ course.avg_rate }}
            </p>
          </div>
        </div>
      </div>
  
      <!-- ✅ Course Details -->
      <div class="p-4">
        <p class="text-lg font-semibold text-gray-800">{{ course.subject_name }}</p>
        <p class="text-sm text-gray-500">Duration: {{ course.num_of_hour }} Hours</p>
      </div>
    </NuxtLink>
  </template>
  
  <script setup>
  defineProps({
    course: Object,
    link: String,
  });
  </script>
  
  <style scoped>
  .course-card {
    @apply block bg-white border rounded-lg shadow-lg transition hover:shadow-xl overflow-hidden;
  }
  
  .instructor-info {
    @apply absolute bottom-3 right-3 flex items-center bg-black bg-opacity-50 p-2 rounded-lg space-x-2;
  }
  </style>
  