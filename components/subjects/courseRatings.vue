<template>
  <div class="course-ratings-column">
    <h3 class="title">
      {{ $t("TITLES.ratings") }}
    </h3>

    <!-- START:: EMPTY MESSAGE -->
    <MessagesCourseEmpty
      :imageSrc="image1"
      :message="$t('MESSAGES.empty_rates')"
      v-if="courseRates?.length === 0"
    />
    <!-- END:: EMPTY MESSAGE -->

    <!-- START:: RATING CARD -->
    <template v-else>
      <div v-for="comment in courseRates" :key="comment.id" class="rating-card">
        <div class="image-wrapper">
          <img
            :src="comment.user_Data.image"
            alt="Image"
            width="80"
            height="80"
            class="user-image"
          />
        </div>

        <div class="wrapper">
          <!-- START:: NAME AND RATINGS -->
          <h5 class="name-and-rate">
            <span class="name">{{ comment.user_Data.fullname }}</span>
            <span class="rate">
              <SubjectsRatingStars dir="ltr" :rate="comment.rate" />
            </span>
          </h5>
          <!-- END:: NAME AND RATINGS -->

          <!-- START:: POSITION -->
          <h5 class="position">
            <span v-if="comment.user_Data.user_type === 'teacher'">معلم</span>
            <span v-if="comment.user_Data.user_type === 'student'">طالب</span>
            <span v-if="comment.user_Data.user_type === 'parent'">ولي أمر</span>
          </h5>
          <!-- END:: POSITION -->

          <!-- START:: COMMENT -->
          <h5 class="comment">
            {{ comment.content }}
          </h5>
          <!-- END:: COMMENT -->
        </div>
      </div>
    </template>
    <!-- END:: RATING CARD -->
  </div>
</template>

<script setup>
import image1 from "/assets/media/empty_messages/empty _rate.png";

defineProps({
  courseRates: Array,
});
</script>

<style scoped>
.course-ratings-column {
  @apply p-[10px] border-2 border-secondary rounded-[15px];
}

.title {
  @apply text-themeText text-[30px] font-bold;
}

.rating-card {
  @apply flex items-center justify-start gap-[12px] my-[25px];
}

.image-wrapper img {
  @apply object-cover rounded-full;
}

.wrapper {
  @apply w-full;
}

.name-and-rate {
  @apply flex items-center justify-between m-0;
}

.name {
  @apply font-medium;
}

.position {
  @apply my-[2px] text-lightGray;
}

.comment {
  @apply m-0 font-medium;
}
</style>
