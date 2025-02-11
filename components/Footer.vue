<template>
  <footer>
    <div class="container">
      <div class="footer_content">
        <div class="row justify-content-between">
          <div class="col-lg-3 my-3">
            <!-- START:: FOOTER LOGO -->
            <div class="logo_wrapper">
              <NuxtLink to="/">
                <img
                  src="../assets/media/logo/logo.svg"
                  alt="Al-Moalem Al-Mosaed App Logo"
                  width="160"
                  height="145"
                />
              </NuxtLink>
            </div>
            <!-- END:: FOOTER LOGO -->
          </div>

          <div class="col-lg-5 my-3">
            <div class="links_wrapper">
              <div class="wrapper">
                <h4>{{ t("TITLES.futurezoon") }}</h4>
                <ul class="footer_links_wrapper">
                  <li class="footer_link">
                    <NuxtLink to="/">
                      {{ t("FOOTER.home") }}
                    </NuxtLink>
                  </li>

                  <li class="footer_link">
                    <NuxtLink to="/about-us">
                      {{ t("FOOTER.about_us") }}
                    </NuxtLink>
                  </li>

                  <li
                    class="footer_link"
                    v-if="authStore.userType === 'student'"
                  >
                    <NuxtLink to="/store">
                      {{ t("FOOTER.store") }}
                    </NuxtLink>
                  </li>

                  <li
                    class="footer_link"
                    v-if="authStore.userType === 'student'"
                  >
                    <NuxtLink to="/course-section/distance-learning-lessons">
                      {{ t("FOOTER.subjects") }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div class="wrapper">
                <h4>{{ t("TITLES.help") }}</h4>
                <ul class="footer_links_wrapper">
                  <li class="footer_link">
                    <NuxtLink to="/privacy-policy">
                      {{ t("FOOTER.privacy") }}
                    </NuxtLink>
                  </li>

                  <li class="footer_link">
                    <NuxtLink to="/terms">
                      {{ t("FOOTER.terms") }}
                    </NuxtLink>
                  </li>
                  <li class="footer_link">
                    <a @click="goToContact">
                      {{ t("FOOTER.contact_us") }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-lg-3 my-3">
            <div class="app_platforms">
              <div class="social_media_links_wrapper">
                <a
                  :href="homeData?.contacts?.social?.instagram"
                  target="_blank"
                >
                  <i class="fab fa-instagram"></i>
                </a>

                <a :href="homeData?.contacts?.social?.twitter" target="_blank">
                  <i class="fab fa-twitter"></i>
                </a>

                <a :href="homeData?.contacts?.social?.facebook" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a :href="homeData?.contacts?.social?.snapchat" target="_blank">
                  <i class="fab fa-snapchat"></i>
                </a>
                <a :href="homeData?.contacts?.social?.youtube" target="_blank">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>

              <h4>{{ t("TITLES.find_out_app") }}</h4>

              <div class="download_platforms">
                <a :href="homeData?.contacts?.link_ios" target="_blank">
                  <img
                    src="../assets/media/stores_logos/apple-store.svg"
                    alt="Play Store"
                    width="125"
                    height="90"
                  />
                </a>

                <a :href="homeData?.contacts?.link_android" target="_blank">
                  <img
                    src="../assets/media/stores_logos/google-play.svg"
                    alt="Google Play"
                    width="125"
                    height="90"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copy_rights_wrapper">
      <p>
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
