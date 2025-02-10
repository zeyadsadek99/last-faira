<script lang="ts" setup>
const axios = useNuxtApp().$axios;
const { locale, t } = useI18n();
const i18n: any = useI18n();
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

const {
  data: settings,
  status,

  refresh,
} = await useLazyAsyncData("home", () => getHomeData());

// watch(
//   () => settings.value,
//   (value) => {
//     if (value) {
//       useAppStore().settings = value;
//       if (import.meta.client) {
//         if (value.primary_color) {
//           document.documentElement.style.setProperty(
//             `--color-primary`,
//             value.primary_color
//           );
//           document.documentElement.style.setProperty(
//             `--color-main-opacity`,
//             value.primary_color + "1A"
//           );
//           document.documentElement.style.setProperty(
//             `--color-main-opacity4`,
//             value.primary_color + "0D"
//           );
//           document.documentElement.style.setProperty(
//             `--color-main-opacity30`,
//             value.primary_color + "4D"
//           );
//         }
//         if (value.primary_color) {
//           document.documentElement.style.setProperty(
//             `--color-secondary`,
//             value.secondary_color
//           );
//         }
//       }
//     }
//   },
//   {
//     immediate: true,
//     deep: true,
//   }
// );
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
      <div class="min-h-[100vh]">
        <Header />
        <div class="app_wrapper" id="app_wrapper">
          <slot />
        </div>
        <!-- <GlobalTopButton /> -->
        <!-- :settings="settings" -->
        <Footer />
      </div>
    </Body>
  </Html>
</template>

<style lang="scss" scoped></style>
