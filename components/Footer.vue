<template>
  <footer class="bg-mainTheme">
    <div class="container">
      <div class="footer_content py-6">
        <div class="flex justify-between">
          <div class="w-full lg:w-1/4 my-3">
            <!-- START:: FOOTER LOGO -->
            <div class="logo_wrapper pt-7">
              <NuxtLink to="/">
                <img
                  src="../assets/media/logo/logo.svg"
                  alt="Al-Moalem Al-Mosaed App Logo"
                  width="160"
                  height="145"
                  class="brightness-0 invert"
                />
              </NuxtLink>
            </div>
            <!-- END:: FOOTER LOGO -->
          </div>

          <div class="w-full lg:w-5/12 my-3">
            <!-- 5/12 = 41.67% width -->
            <div class="links_wrapper flex gap-10">
              <div class="wrapper px-4">
                <h4 class="text-white text-[27px] font-arb font-semibold">
                  {{ t("TITLES.futurezoon") }}
                </h4>
                <ul class="footer_links_wrapper list-none m-0 p-0">
                  <li class="footer_link">
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/"
                    >
                      {{ t("FOOTER.home") }}
                    </NuxtLink>
                  </li>

                  <li class="footer_link">
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/about-us"
                    >
                      {{ t("FOOTER.about_us") }}
                    </NuxtLink>
                  </li>

                  <li
                    class="footer_link"
                    v-if="authStore.userType === 'student'"
                  >
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/store"
                    >
                      {{ t("FOOTER.store") }}
                    </NuxtLink>
                  </li>

                  <li
                    class="footer_link"
                    v-if="authStore.userType === 'student'"
                  >
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/course-section/distance-learning-lessons"
                    >
                      {{ t("FOOTER.subjects") }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div class="wrapper px-4">
                <h4 class="text-white text-[27px] font-arb font-semibold">
                  {{ t("TITLES.help") }}
                </h4>
                <ul class="footer_links_wrapper list-none m-0 p-0">
                  <li class="footer_link">
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/privacy-policy"
                    >
                      {{ t("FOOTER.privacy") }}
                    </NuxtLink>
                  </li>

                  <li class="footer_link">
                    <NuxtLink
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      to="/terms"
                    >
                      {{ t("FOOTER.terms") }}
                    </NuxtLink>
                  </li>
                  <li class="footer_link">
                    <a
                      class="text-white font-arb text-[20px] opacity-80 no-underline"
                      @click="goToContact"
                    >
                      {{ t("FOOTER.contact_us") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/4 my-3">
            <!-- 3/12 = 1/4 = 25% width -->
            <div class="app_platforms">
              <div
                class="social_media_links_wrapper mt-7 flex items-center justify-around"
              >
                <NuxtLink
                  v-for="(link, index) in socialLinks"
                  :key="index"
                  :to="link.href"
                  target="_blank"
                  class="social-link"
                >
                  <i :class="link.icon"></i>
                </NuxtLink>
              </div>

              <h4 class="my-5 text-white text-[27px] !font-arb font-semibold">
                {{ t("TITLES.find_out_app") }}
              </h4>

              <div class="download_platforms flex items-start justify-between">
                <NuxtLink :to="homeData?.contacts?.link_ios" target="_blank">
                  <img
                    src="../assets/media/stores_logos/apple-store.svg"
                    alt="Play Store"
                    width="125"
                    height="90"
                  />
                </NuxtLink>

                <NuxtLink
                  :to="homeData?.contacts?.link_android"
                  target="_blank"
                >
                  <img
                    src="../assets/media/stores_logos/google-play.svg"
                    alt="Google Play"
                    width="125"
                    height="90"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copy_rights_wrapper border-t border-[#54c180] py-3 text-center">
      <p class="text-[26px] text-white mb-0 font-arb">
        {{ t("FOOTER.allRightsReserved") }}
        {{ t("TITLES.futurezoon") }} &copy;{{ currentYear }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/stores/authentication"; // Import Pinia store
import axios from "axios";
// import { useFetch } from "#app";
const { t } = useI18n();

// Access authentication store
const authStore = useAuthenticationStore();
const router = useRouter();

// Reactive state
const currentYear = ref(new Date().getFullYear());
const homeData = ref(null);
const isLoading = ref(false);

const socialLinks = computed(() => [
  { href: homeData?.contacts?.social?.instagram, icon: "fab fa-instagram" },
  { href: homeData?.contacts?.social?.twitter, icon: "fab fa-twitter" },
  { href: homeData?.contacts?.social?.facebook, icon: "fab fa-facebook-f" },
  { href: homeData?.contacts?.social?.snapchat, icon: "fab fa-snapchat" },
  { href: homeData?.contacts?.social?.youtube, icon: "fab fa-youtube" },
]);
// Function to fetch home data based on user type
const getHomeData = async () => {
  isLoading.value = true;
  const userType = localStorage.getItem("elmo3lm_elmosa3d_user_type");

  let endpoint = "visitor/home"; // Default for visitors
  if (userType === "teacher") endpoint = "teacher/home";
  else if (userType === "student") endpoint = "student/home";
  else if (userType === "parent") endpoint = "parent/home";

  try {
    const response = await axios.get(
      `https://egypt-api.faiera.com/api/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "elmo3lm_elmosa3d_user_token"
          )}`,
          "Accept-language": localStorage.getItem("elmo3lm_elmosa3d_app_lang"),
          "cache-control": "no-cache",
          Accept: "application/json",
        },
      }
    );
    homeData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Navigate to Contact section
const goToContact = () => {
  router.push({ path: "/", hash: "#contact" });
};

// Fetch home data when component is mounted
onMounted(() => {
  getHomeData();
});
</script>

<style>
/* footer .footer_content .logo_wrapper .text {
  margin-top: 15px;
  word-break: break-word;
  word-spacing: 2px;
  font-size: 22px;
  color: var(--light_gray_clr);
  line-height: 1.6;
  text-align: start;
  color: var(--white_clr);
  font-size: 22px;
  font-family: "ArbFONTS-Somar-SemiBold";
  line-height: 1.3;
} */

footer
  .footer_content
  .links_wrapper
  .wrapper
  .footer_links_wrapper
  .footer_link:not(:last-of-type) {
  @apply mb-2;
}

.social-link {
  @apply inline-flex w-[45px] h-[45px] border-2 border-white 
           rounded-full items-center justify-center 
           transition-all duration-[600ms] ease-in-out;

  background-image: linear-gradient(45deg, transparent 50%, white 50%);
  background-position: 100%;
  background-size: 400%;
}

.social-link:hover {
  background-position: 0;
}

.social-link svg {
  @apply text-[25px] text-mainTheme transition-all duration-[600ms] ease-in-out;
}

.social-link:hover svg {
  @apply text-white;
}
</style>
