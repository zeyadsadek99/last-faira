<script lang="ts" setup>
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

const axios = useNuxtApp().$axios;
const { locale, t } = useI18n();
const i18n: any = useI18n();
const userType = ref(process.client ? localStorage.getItem("elmo3lm_elmosa3d_user_type") : null);
const route = useRoute();
const isLoading = ref(false);
const homeData = ref(null);
const { $axios } = useNuxtApp();
const endpoint = computed(() => {
  if (userType.value === "teacher") return "teacher/home";
  if (userType.value === "student") return "student/home";
  if (userType.value === "parent") return "parent/home";
  return "visitor/home"; // Default for visitors
});
const getHomeData = async () => {
  isLoading.value = true;
  try {
    const response = await $axios.get(endpoint.value);
    homeData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
    isLoading.value = false;
  }
};
const {
  data: settings,
  status,

  refresh,
} = await useLazyAsyncData("home", () => getHomeData());
const scrollToSection = (sectionId: string ) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
onMounted(() => {
  getHomeData();
  if (route.hash === "#contact") {
    setTimeout(() => {
      scrollToSection("contact");
    }, 1000);
  }
  // documentDirection.value = document.documentElement.dir;
});
</script>

<template>
  <Html :lang="locale">
    <Head>
      <Title>{{ t("NAV.company_name") }}</Title>
      <Meta name="description" content="Home page" />
      <Meta name="og:description" content="Home page" />
      <Meta name="title" content="Home" />
      <Meta name="og:title" content="Home" />
      <Meta name="image" content="~/assets/icons/logo.svg" />
      <Meta name="og:image" content="~/assets/icons/logo.svg" />
      <Link rel="icon" type="image/x-icon" href="~/assets/icons/logo.svg" />
    </Head>

    <!-- <Head v-if="settings && status === 'success'">
      <Link
        v-if="settings.fav_icon"
        rel="icon"
        type="image/x-icon"
        :href="settings.fav_icon"
      />
      
      <template v-if="locale == 'ar'">
        <Title v-if="settings.website_title_ar">{{
          settings.website_title_ar
        }}</Title>
        <Meta
          v-if="settings.keywords_ar"
          name="keywords"
          :content="settings.keywords_ar"
        />
        <Meta
          v-if="settings.meta_desc_ar"
          name="description"
          :content="settings.meta_desc_ar"
        />
        <Meta
          v-if="settings.meta_desc_ar"
          name="og:description"
          :content="settings.meta_desc_ar"
        />

        <Meta
          v-if="settings.meta_title_ar"
          name="title"
          :content="settings.meta_title_ar"
        />
        <Meta
          v-if="settings.meta_title_ar"
          name="og:title"
          :content="settings.meta_title_ar"
        />
      </template>
      <template v-else>
        <Title v-if="settings.website_title_en">{{
          settings.website_title_en
        }}</Title>
        <Meta
          v-if="settings.keywords_en"
          name="keywords"
          :content="settings.keywords_en"
        />
        <Meta
          v-if="settings.meta_desc_en"
          name="description"
          :content="settings.meta_desc_en"
        />
        <Meta
          v-if="settings.meta_desc_en"
          name="og:description"
          :content="settings.meta_desc_en"
        />
        <Meta
          v-if="settings.meta_title_en"
          name="title"
          :content="settings.meta_title_en"
        />
        <Meta
          v-if="settings.meta_title_en"
          name="og:title"
          :content="settings.meta_title_en"
        />
      </template>
      <Meta name="image" content="~/assets/icons/logo.svg" />
      <Meta name="og:image" content="~/assets/icons/logo.svg" />
    </Head> -->
    <Body :dir="locale == 'ar' ? 'rtl' : 'ltr'">
      <div class="min-h-[100vh] relative">
        <!-- <Header /> -->
        <div class="app_wrapper" id="app_wrapper">
          <slot />
        </div>
        <!-- <GlobalTopButton /> -->
        <!-- :settings="settings" -->
        <!-- <Footer /> -->
       
      </div>
    </Body>
  </Html>
</template>

<style lang="scss" scoped>

</style>
