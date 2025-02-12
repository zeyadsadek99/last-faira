<template>
  <div
    class="about_us_section_wrapper pb-[50px] bg-veryLightTheme"
    v-if="aboutUsData"
  >
    <div class="container">
      <div class="flex">
        <!-- START:: SECTION TEXT -->
        <div class="w-full lg:w-8/12">
          <div class="section_title_wrapper pt-[50px]">
            <h2 class="title flex justify-start items-center gap-3">
              <img
                class="w-[60px]"
                src="../../assets/media/shapes/title_icon.svg"
                alt="Title Icon"
              />
              <span class="text-[2.3rem] font-bold text-themeText">
                {{ t("TITLES.about_us") }}
              </span>
            </h2>
          </div>

          <div class="section_subtitle_wrapper">
            <h3 class="subtitle my-[15px] text-[30px] font-bold text-themeText">
              {{ t("TITLES.futurezoon") }}
            </h3>
          </div>

          <div
            class="section_text max-h-36 overflow-hidden break-words text-[24px] text-themeSecondaryText leading-[1.4]"
            v-html="aboutUsData"
          ></div>

          <div class="section_route mt-5">
            <NuxtLink class="social-link1" to="/about-us">
              {{ t("BUTTONS.more") }}
            </NuxtLink>
          </div>
        </div>
        <!-- END:: SECTION TEXT -->

        <!-- START:: SECTION IMAGE -->
        <div class="w-full lg:w-4/12 p-0 hidden lg:block">
          <div class="border_wrapper h-[424px] w-[432px] p-2">
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
<style>
.social-link1 {
  @apply relative inline-block w-[120px] text-center mt-0 px-[20px] py-[5px] text-[25px] text-white no-underline border-1 border-mainTheme rounded-[10px] transition-all duration-[600ms] ease-in-out ;

  background-image: linear-gradient(45deg, transparent 50%, var(--main_theme_clr) 50%);
  background-position: 100%;
  background-size: 400%;
}
.social-link1:hover {
  background-position: 0;
  @apply text-mainTheme
}
.social-link1:disabled {
  @apply opacity-50
}


/* .about_us_section_wrapper .section_route a .btn_loader {
  position: absolute;
  left: 15px;
  top: 30%;
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 3px dotted var(--white_clr);
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  transition: all 0.4s ease-in-out;
  display: inline-block;
  animation: rotation 2s linear infinite;
} */

/* .about_us_section_wrapper .section_route a:hover .btn_loader {
  border: 3px dotted var(--main_theme_clr);
} */
/* .about_us_section_wrapper .section_route a:disabled {
  opacity: 0.5;
} */
@keyframes rotation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
/* .about_us_section_wrapper .border_wrapper {
  height: 424px;
  width: 432px;
  padding: 8px;
} */
.about_us_section_wrapper .border_wrapper .section_image_wrapper {
  @apply h-full bg-[0%] bg-cover bg-no-repeat flex items-center justify-center;
  background-image: url("../../assets/media/images/about_us.png");
  
}

.about_us_section_wrapper .border_wrapper .section_image_wrapper img {
  @apply filter brightness-0 invert;
}

</style>
