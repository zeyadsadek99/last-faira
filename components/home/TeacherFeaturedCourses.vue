<template>
    <div class="featured_courses_wrapper">
        <div class="container">
            <!-- START:: HEADER WRAPPER -->
            <div class="section_title_wrapper">
                <h2 class="title">
                    <img
                        src="../../assets/media/shapes/title_icon.svg"
                        alt="Title Icon"
                    />
                    <span> {{ $t("TITLES.added_by_you") }} </span>
                </h2>

                <div class="route_wrapper">
                    <router-link to="/added-subjects">
                        {{ $t("BUTTONS.show_all") }}
                    </router-link>
                </div>
            </div>
            <!-- END:: HEADER WRAPPER -->

            <!-- START:: FEATURED COURSES SLIDER -->
            <div class="featured_courses_slider_wrapper mt-5">
                <carousel
                    dir="rtl"
                    :nav="false"
                    :dots="true"
                    :items="4"
                    :margin="15"
                    :loop="false"
                    :autoplay="true"
                    :autoplayTimeout="6000"
                    :dragEndSpeed="2000"
                    :smartSpeed="2000"
                    :responsive="{
                        0: {
                            items: 1,
                        },
                        750: {
                            items: 2,
                        },
                        900: {
                            items: 4,
                        },
                    }"
                >
                    <div
                        :dir="getAppLocale == 'ar' ? 'rtl' : 'ltr'"
                        class="slider_image_wrapper"
                        v-for="course in Items"
                        :key="course.id"
                    >
                        <router-link
                            :to="`/teacher/my-course/online/${course.id}`"
                            v-if="course.price != 0"
                        >
                            <ImagedCard>
                                <template v-slot:card_image>
                                    <img
                                        :src="course.image"
                                        alt="Course Category Image"
                                    />
                                </template>

                                <template v-slot:card_text>
                                    <div class="wrapper">
                                        <p class="course_name">
                                            {{
                                                course.subject_name.subject_name
                                            }}
                                        </p>
                                        <p class="students_count">
                                            {{ course.academic_year.name }}
                                        </p>
                                        <p class="students_count">
                                            {{ course.number_of_subscription }}
                                            طالب مسجل
                                        </p>
                                    </div>

                                    <div class="wrapper">
                                        <p class="price">
                                            {{ course.price }}
                                            {{ course.currency }}
                                        </p>
                                    </div>
                                </template>
                            </ImagedCard>
                        </router-link>
                        <router-link
                            :to="`/teacher/my-course/record/${course.id}`"
                            v-if="course.price == 0"
                        >
                            <ImagedCard>
                                <template v-slot:card_image>
                                    <img
                                        :src="course.image"
                                        alt="Course Category Image"
                                    />
                                </template>

                                <template v-slot:card_text>
                                    <div class="wrapper">
                                        <p class="course_name">
                                            {{
                                                course.subject_name.subject_name
                                            }}
                                        </p>
                                        <p class="students_count">
                                            {{ course.number_of_subscription }}
                                            طالب مسجل
                                        </p>
                                    </div>
                                </template>
                            </ImagedCard>
                        </router-link>
                    </div>
                </carousel>
            </div>
            <!-- END:: FEATURED COURSES SLIDER -->
        </div>
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// START:: IMPORTING VUEX HELPERS

// START:: IMPORTING OWL CAROUSEL
import carousel from "vue-owl-carousel";
// END:: IMPORTING OWL CAROUSEL

// START:: IMPORTING SOLID CARD COMPONENT
import ImagedCard from "../ui/ImagedCard.vue";
// END:: IMPORTING SOLID CARD COMPONENT

export default {
    name: "TeacherFeaturedCourses",

    components: {
        carousel,
        ImagedCard,
    },
    props: ["Items"],
    computed: {
        // START:: VUEX GET APP THEME
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP THEME
    },

    data() {
        return {
            // START:: FEATURED COURSES DATA
            // END:: FEATURED COURSES DATA
        };
    },
};
</script>
