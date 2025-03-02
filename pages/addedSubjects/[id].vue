<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

// import MainLoader from "@/components/ui/loaders/MainLoader.vue";
// import CourseStaticInfoAndAttachments from "@/components/courseDetailsDividedComps/CourseStaticInfoAndAttachments.vue";
// import CourseDetailsAndActionsButtons from "@/components/courseDetailsDividedComps/CourseDetailsAndActionsButtons.vue";
// import CourseLessonsLinks from "@/components/courseDetailsDividedComps/CourseLessonsLinks.vue";
// import CourseInstructor from "@/components/courseDetailsDividedComps/CourseInstructor.vue";
// import CourseRegisteredStudents from "@/components/courseDetailsDividedComps/CourseRegisteredStudents.vue";
// import CourseRates from "@/components/courseDetailsDividedComps/CourseRates.vue";
// import SetCourseRate from "@/components/courseDetailsDividedComps/SetCourseRate.vue";
// import ImageHeader from "@/components/ui/ImageHeader.vue";
const axios = useNuxtApp().$axios;

const route = useRoute();

const isLoading = ref(true);
const courseDetails = ref(null);
const courseRates = ref(null);
const courseType = ref(route.params.type);
const routeName = ref(route.name);
const registeredUserType = ref(useCookie("elmo3lm_elmosa3d_user_type"));

const courseViewType = computed(() => {
  if (route.path.includes("teacher-view-course-details")) {
    return "teacher-view";
  } else if (registeredUserType.value === "parent") {
    return "parent-view";
  } else {
    return "student-view";
  }
});

const getCourseDetails = async () => {
  let endpoint = "";
  if (registeredUserType.value === "teacher") {
    endpoint = `teacher/subject/show/${route.params.id}`;
  } else if (
    registeredUserType.value === "student" &&
    routeName.value === "student_course_details"
  ) {
    endpoint = `student/course/${route.params.id}`;
  } else if (registeredUserType.value === "parent") {
    endpoint = `parent/subject/${route.params.id}`;
  }

  if (endpoint) {
    try {
      const res = await axios.get(endpoint);
      courseDetails.value = res.data.data;
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  }
};

const getCourseRates = async () => {
  try {
    const res = await axios.get(`user/rate/${route.params.id}`);
    courseRates.value = res.data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCourseDetails();
  getCourseRates();
});
</script>

<template>
  <div>
    <Loader1 v-if="isLoading" />
    <div v-else class="course-details-wrapper fadeIn">
      <ImageHeader bgColor="bg-[#bdfcd7]">
        <div
          class="header-container container flex items-center justify-start h-full"
        >
          <div class="container mx-auto px-4">
            <div class="header-title">
              <h1 class="w-[30%] text-[5rem] font-bold mb-0">
                {{ courseDetails?.subject_name?.subject_name }}
              </h1>
            </div>
          </div>
        </div>
      </ImageHeader>
      <div class="course-details-content">
        <div class="container grid grid-cols-1 lg:grid-cols-2 gap-6">
          \
          <SubjectsCourseAttactments
            :description="courseDetails.desc"
            :goals="courseDetails.objectives"
            :enrichments="courseDetails.enriching"
            :attachments="courseDetails.attachments"
          />

          <!-- <CourseStaticInfoAndAttachments
            :description="courseDetails.desc"
            :goals="courseDetails.objectives"
            :enrichments="courseDetails.enriching"
            :attachments="
              routeName === 'course_details_of_teacher'
                ? courseDetails.dash_attachments
                : courseDetails.attachments
            "
          /> -->
          <div>
            <!-- <CourseDetailsAndActionsButtons
              :courseId="courseDetails.id"
              :subjectName="courseDetails?.subject_name?.subject_name"
              :subjectDescription="courseDetails.desc"
              :acadimicYear="courseDetails.academic_year"
              :duration="courseDetails.diff_of_time"
              :courseType="courseType"
              :routeName="routeName"
              :startDate="courseDetails.start_date"
              :courseRate="courseDetails.avg_rate"
              :coursePrice="courseDetails.price"
              :coursePriceAfterDiscount="courseDetails.price_after_discount"
              :courseCurrency="courseDetails.currency"
              :courseViewType="courseViewType"
              :courseIsFavorite="courseDetails.is_fav"
              :courseIsSubscribed="courseDetails.is_subscribe"
              :lessons="courseDetails"
            /> -->
            <SubjectsCourseLessons
              :viewType="courseViewType"
              :courseType="courseType"
              :routeName="routeName"
              :lessonsList="courseDetails"
              @getDetailsAfterEdit="getCourseDetails"
            />
            <!-- <CourseInstructor
              v-if="
                ['student_course_details', 'parent_course_details'].includes(
                  routeName
                )
              "
              :instructor="courseDetails.teacher"
            />
            <CourseRegisteredStudents
              v-if="routeName === 'teacher_my_course'"
              :courseRegisteredStudents="courseDetails.subscription_data"
            /> -->
          </div>
          <SetCourseRate v-if="routeName !== 'teacher_my_course'" />
        </div>
        <div class="container my-3">
          <SubjectsCourseRatings  :courseRates="courseRates" />

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
