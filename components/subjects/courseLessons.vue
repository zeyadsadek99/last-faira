<template>
    <div class="lessons-wrapper">
      <h3 class="title">
        {{ $t("TITLES.subject_lessons") }}
      </h3>
  
      <ul class="lessons-list">
        <li v-for="(lesson, index) in lessonsList.listens" :key="lesson.id" class="lesson">
          <div class="lesson-details">
            <router-link
              :to="`/course-videos/${lesson.id}`"
              class="lesson-details"
              v-if="courseType == 'record'"
            >
              <div class="item-content-wrapper">
                <span class="lesson-number">#{{ index + 1 }}</span>
                <div class="lesson-info">
                  <span class="name">{{ lesson.name }}</span>
                  <span class="lesson-duration" v-show="lesson.duration != 0">
                    {{ Math.floor(lesson.duration / 60) }} {{ $t("TITLES.hour") }}
                  </span>
                </div>
              </div>
            </router-link>
  
            <a
              :href="lesson.link"
              class="lesson-details"
              :class="{ disabled: !lesson.is_paid && routeName !== 'teacher_my_course' }"
              target="_blank"
              v-if="courseType == 'online'"
            >
              <div class="item-content-wrapper">
                <span class="lesson-number">#{{ index + 1 }}</span>
                <div class="lesson-info">
                  <span class="name">{{ lesson.name }}</span>
  
                  <template v-if="routeName === 'student_course_details'">
                    <span class="price">{{ lesson.price }} جنيه</span>
                    <span class="desc">
                      {{ lesson.lesson_price }} + {{ lesson.app_persentage }}% الضريبة المضافة
                    </span>
                  </template>
  
                  <template v-if="routeName === 'teacher_my_course'">
                    <span class="price">{{ lesson.teacher_lesson_price }} جنيه</span>
                    <span class="desc">
                      {{ lesson.lesson_price }} - {{ lesson.app_percentage_from_teacher }}% نسبة التطبيق
                    </span>
                    <span>
                      {{
                        lesson.all_amount_for_teacher > 0
                          ? lesson.all_amount_for_teacher
                          : "لا يوجد طلبات حالية"
                      }}
                    </span>
                  </template>
  
                  <span>
                    <span class="lesson-status running" v-if="lesson.status === 'now'">
                      <i class="fas fa-circle"></i> {{ $t("STATUS.on_going") }}
                    </span>
                    <span class="lesson-status done" v-if="lesson.status === 'finish'">
                      <i class="fas fa-circle"></i> {{ $t("STATUS.done") }}
                    </span>
                    <span class="lesson-status have-not" v-if="lesson.status === 'have_not_came_yet'">
                      <i class="fas fa-circle"></i> {{ lesson.start_date }}
                    </span>
                  </span>
                </div>
              </div>
            </a>
  
            <div class="left-part">
              <div class="item-btns-wrapper">
                <router-link
                  :to="`/course-videos/${lesson.id}`"
                  class="play-icon"
                  v-if="courseType === 'record' && routeName !== 'teacher_my_course'"
                >
                  <i class="fas fa-play-circle"></i>
                </router-link>
  
                <span
                  class="lock-icon disabled"
                  v-if="courseType === 'online' && !lesson.is_paid && routeName !== 'teacher_my_course'"
                >
                  <i class="fas fa-lock"></i>
                </span>
  
                <div class="lesson-actions-menu-wrapper" v-if="routeName === 'teacher_my_course'">
                  <button class="single-lesson-actions-btn" @click.stop="toggleActionsMenu($event)">
                    <i class="fal fa-ellipsis-h"></i>
                  </button>
  
                  <ul class="lesson-actions-menu">
                    <li class="menu-item">
                      <button @click.stop="closeActionsMenu($event); toggleEditLessonModal(lesson);">
                        {{ $t("BUTTONS.edit_lesson") }}
                      </button>
                    </li>
  
                    <li class="menu-item">
                      <button @click.stop="closeActionsMenu($event); toggleDeleteModal(lesson);">
                        {{ $t("BUTTONS.delete_lesson") }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
  
      <!-- Modals -->
      <EditLessonModal
        :courseType="courseType"
        :selectedLesson="selectedLessonToEdit"
        :modalApperanceData="editLessonModalIsOpen"
        @controleModalApperance="toggleEditLessonModal"
        @getDetailsAfterEdit="getDetailsAfterEdit"
      />
  
      <DeleteModal
        :targetElement="'lesson'"
        :selectedLesson="selectedLessonToDelete"
        :modalApperanceData="deleteModalIsOpen"
        @controleModalApperance="toggleDeleteModal"
        @getDetailsAfterDelete="getDetailsAfterEdit"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import EditLessonModal from "@/components/modals/EditLessonModal.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  
  defineProps(["courseType", "routeName", "lessonsList"]);
  
  const editLessonModalIsOpen = ref(false);
  const deleteModalIsOpen = ref(false);
  const selectedLessonToEdit = ref(null);
  const selectedLessonToDelete = ref(null);
  
  const toggleActionsMenu = (event) => {
    event.currentTarget.nextSibling.classList.toggle("active");
  };
  
  const closeActionsMenu = (event) => {
    event.target.closest(".lesson-actions-menu").classList.remove("active");
  };
  
  const toggleEditLessonModal = (lesson) => {
    editLessonModalIsOpen.value = !editLessonModalIsOpen.value;
    selectedLessonToEdit.value = lesson;
  };
  
  const toggleDeleteModal = (lesson) => {
    deleteModalIsOpen.value = !deleteModalIsOpen.value;
    selectedLessonToDelete.value = lesson;
  };
  
  const getDetailsAfterEdit = () => {
    emit("getDetailsAfterEdit");
  };
  </script>
  
  <style scoped>
  .lessons-wrapper {
    @apply p-2;
  }
  
  .title {
    @apply text-themeText text-2xl font-bold;
  }
  
  .lessons-list {
    @apply list-none m-0 p-0 min-h-[300px] max-h-[300px] overflow-y-auto;
  }
  
  .lessons-list::-webkit-scrollbar {
    @apply w-2;
  }
  
  .lessons-list::-webkit-scrollbar-track {
    @apply bg-secondary rounded-xl;
  }
  
  .lessons-list::-webkit-scrollbar-thumb {
    @apply bg-primary border-2 border-secondary rounded-xl;
  }
  
  .lesson:not(:last-of-type) {
    @apply mb-2;
  }
  
  .lesson-details {
    @apply flex items-center justify-between px-3;
  }
  
  .lesson-details.disabled {
    @apply opacity-50 cursor-not-allowed pointer-events-none;
  }
  
  .item-content-wrapper {
    @apply flex items-center gap-4;
  }
  
  .lesson-number {
    @apply text-4xl font-bold text-gray-500;
  }
  
  .lesson-info {
    @apply flex flex-col items-start;
  }
  
  .name {
    @apply text-themeText text-lg font-medium leading-none;
  }
  
  .price {
    @apply text-black text-lg font-extrabold;
  }
  
  .desc {
    @apply text-gray-500 text-base leading-tight;
  }
  
  .lesson-status {
    @apply text-base flex items-center gap-2;
  }
  
  .lesson-status.done {
    @apply text-red-500;
  }
  
  .lesson-status.running {
    @apply text-green-500;
  }
  
  .lesson-status.have-not {
    @apply text-gray-500;
  }
  
  .play-icon i {
    @apply text-primary text-4xl;
  }
  
  .lesson-actions-menu {
    @apply absolute top-[130%] left-[120%] bg-themeBg rounded-lg shadow-lg opacity-0 scale-0 transition-transform;
  }
  
  .lesson-actions-menu.active {
    @apply opacity-100 scale-100;
  }
  
  .menu-item {
    @apply px-5 py-2 transition hover:bg-primary/10;
  }
  
  .menu-item button {
    @apply text-themeText text-lg font-medium;
  }
  </style>
  