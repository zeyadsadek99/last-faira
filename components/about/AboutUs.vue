<template>
  <div class="about_us_section_wrapper" v-if="aboutUsData">
    <div class="container">
      <div class="row">
        <!-- START:: SECTION TEXT -->
        <div class="col-lg-8">
          <div class="section_title_wrapper">
            <h2 class="title">
                
              <img src="../../public/media/shapes/title_icon.svg" alt="Title Icon" />
              <span> {{ t("TITLES.about_us") }} </span>
            </h2>
          </div>

          <div class="section_subtitle_wrapper">
            <h3 class="subtitle">{{ t("TITLES.futurezoon") }}</h3>
          </div>

          <div class="section_text" v-html="aboutUsData"></div>

          <div class="section_route">
            <NuxtLink to="/about-us">
              {{ t("BUTTONS.more") }}
            </NuxtLink>
          </div>
        </div>
        <!-- END:: SECTION TEXT -->

        <!-- START:: SECTION IMAGE -->
        <div class="col-lg-4 p-0 d-none d-lg-block">
          <div class="border_wrapper">
            <div class="section_image_wrapper"></div>
          </div>
        </div>
        <!-- END:: SECTION IMAGE -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

// Import i18n translations
const { t } = useI18n();

// Define props
defineProps({
  aboutUsData: String,
});
</script>
