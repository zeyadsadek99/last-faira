<template>
  <div
    class="select_registeration_type_wrapper w-full flex flex-col items-center py-10"
  >
    <!-- START:: FORM TITLE -->
    <div class="form_title_wrapper">
      <!-- START:: LOGO -->
      <div class="flex justify-center ">
        <NuxtLink to="/" class="logo_wrapper mb-4">
          <img src="/logo.svg" alt="App Logo" class="w-[150px] h-[120px]" />
        </NuxtLink>
      </div>
      <!-- END:: LOGO -->

      <!-- START:: TITLES -->
      <h2 class="form_title font-bold mb-8">
        {{ t("TITLES.select_user_type") }}
      </h2>
      <!-- END:: TITLES -->
    </div>
    <!-- END:: FORM TITLE -->

    <div class="routes_wrapper w-full max-w-3xl mt-10 mx-auto">
      <div class="container px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- START:: REGISTER TYPE ROUTE -->
          <div class="register_type_wrapper">
            <NuxtLink
              to="/register-first-step/teacher"
              class="register_type_route block p-6  shadow-lg hover:shadow-xl transition-shadow duration-300 text-center bg-[var(--soft_main_theme_clr)]"
            >
              <h3 class=" font-semibold mb-4">
                {{ t("TITLES.teacher") }}
              </h3>
              <img
                src="/assets/media/persons_vectors/teacher.png"
                alt="Teacher Illustration"
                class="w-[200px] h-[180px] mx-auto"
              />
            </NuxtLink>
          </div>
          <!-- END:: REGISTER TYPE ROUTE -->

          <!-- START:: REGISTER TYPE ROUTE -->
          <div class="register_type_wrapper">
            <NuxtLink
              to="/register-first-step/student"
              class="register_type_route block  rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center bg-softMainTheme"
            >
              <h3 class="text-xl font-semibold mb-4">
                {{ t("TITLES.student") }}
              </h3>
              <img
                src="/assets/media/persons_vectors/student.png"
                alt="Student Illustration"
                class="w-[160px] h-[180px] mx-auto"
              />
            </NuxtLink>
          </div>
          <!-- END:: REGISTER TYPE ROUTE -->

          <!-- START:: REGISTER TYPE ROUTE -->
          <div class="register_type_wrapper">
            <NuxtLink
              to="/register-first-step/parent"
              class="register_type_route block p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center bg-[var(--soft_main_theme_clr)]"
            >
              <h3 class="text-xl font-semibold mb-4">
                {{ t("TITLES.parent") }}
              </h3>
              <img
                src="/assets/media/persons_vectors/parent.png"
                alt="Parent Illustration"
                class="w-[160px] h-[180px] mx-auto"
              />
            </NuxtLink>
          </div>
          <!-- END:: REGISTER TYPE ROUTE -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
/* Register Type Route */
.form-title-wrapper {
  @apply h-[45vh] flex flex-col items-center justify-center;
}
.register_type_route {
  @apply relative flex items-center justify-between px-6 h-[160px] bg-softMainTheme rounded-[15px] no-underline;
}

.register_type_route img {
  @apply absolute left-0 bottom-0 transition-all duration-300 ease-in-out;
}

.register_type_route h3 {
  @apply text-[2.5rem] font-semibold text-mainTheme;
}
</style>
