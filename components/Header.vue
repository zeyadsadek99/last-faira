<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthenticationStore } from "@/stores/authentication";
import { useNotificationsStore } from "@/stores/notifications";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

// Stores
const authStore = useAuthenticationStore();
const notificationsStore = useNotificationsStore();
const { t } = useI18n();
const router = useRouter();

// Reactive State
const smallScreensNavbarIsOpen = ref(false);
const searchIsOpen = ref(false);
const profileMenuIsOpen = ref(false);
const notificationsMenuIsOpen = ref(false);

// Computed
const registeredUserType = computed(() => authStore.userType);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userData = computed(() => authStore.getAuthenticatedUserData);
const notificationsData = computed(() => notificationsStore.notificationsData);

// Navbar Links
const navbarLinks = reactive([
  { id: "home", url: "/", text: "NAVBAR.home", user_type: "all" },
  { id: "about", url: "/about-us", text: "NAVBAR.about_us", user_type: "all" },
  {
    id: "my_sons",
    url: "/my-sons",
    text: "NAVBAR.my_sons",
    user_type: "parent",
  },
  {
    id: "subjects",
    url: "/course-section/distance-learning-lessons",
    text: "NAVBAR.subjects",
    user_type: "student",
  },
  {
    id: "teachers",
    url: "/teachers",
    text: "NAVBAR.teachers",
    user_type: "student",
  },
  { id: "store", url: "/store", text: "NAVBAR.store", user_type: "student" },
  {
    id: "added_subjects",
    url: "/added-subjects",
    text: "NAVBAR.added_subjects",
    user_type: "teacher",
  },
]);

// Methods
const toggleSmallScreensNavBar = () => {
  smallScreensNavbarIsOpen.value = !smallScreensNavbarIsOpen.value;
  searchIsOpen.value = false;
  profileMenuIsOpen.value = false;
  notificationsMenuIsOpen.value = false;
};

const toggleSearch = () => {
  searchIsOpen.value = !searchIsOpen.value;
  smallScreensNavbarIsOpen.value = false;
  profileMenuIsOpen.value = false;
  notificationsMenuIsOpen.value = false;
};

const toggleProfileMenu = () => {
  profileMenuIsOpen.value = !profileMenuIsOpen.value;
  smallScreensNavbarIsOpen.value = false;
  searchIsOpen.value = false;
  notificationsMenuIsOpen.value = false;
};

const toggleNotificationsMenu = () => {
  notificationsMenuIsOpen.value = !notificationsMenuIsOpen.value;
  smallScreensNavbarIsOpen.value = false;
  searchIsOpen.value = false;
  profileMenuIsOpen.value = false;
  notificationsStore.getNotifications();
};

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};

// Sticky Navbar
const stickyNavbar = () => {
  setTimeout(() => {
    const theNavBar = document.querySelector("#navbar");
    const navBarHeight = theNavBar.clientHeight;
    window.addEventListener("scroll", () => {
      if (window.scrollY > navBarHeight + 5) {
        theNavBar.classList.add("sticky_navbar");
        document.querySelector("body").style.paddingTop = `${navBarHeight}px`;
      } else {
        theNavBar.classList.remove("sticky_navbar");
        document.querySelector("body").style.paddingTop = "0";
      }
    });
  }, 1000);
};

// Lifecycle Hooks
onMounted(() => {
  stickyNavbar();
  if (isAuthenticated.value) {
    notificationsStore.getNotifications();
  }
});
</script>
<template>
  <nav id="navbar" class="relative py-6 bg-themeBg">
    <!-- START:: SEARCH -->
    <Search v-if="searchIsOpen" @closeSearch="toggleSearch" />
    <!-- END:: SEARCH -->

    <div class="container">
      <div class="flex items-center justify-between gap-6;">
        <div class="flex items-center gap-9">
          <!-- START:: LOGO -->
          <NuxtLink class="logo_wrapper" to="/">
            <img
              src="../assets/media/logo/logo.svg"
              alt="Al-Moalem Al-Mosaed App Logo"
              width="81"
              height="67"
            />
          </NuxtLink>
          <!-- END:: LOGO -->

          <!-- START:: NAVBAR LINKS -->
          <ul
            class="hidden md:flex md:items-center md:justify-between m-0 p-0 gap-12 list-none"
          >
            <li
              v-for="link in navbarLinks"
              :key="link.id"
              class="navbar_link"
            >
              <!-- {{ link.user_type == 'all' }} -->

              <NuxtLink
              v-if="
                link?.user_type === registeredUserType ||
                link?.user_type === 'all'
              "
                class="text-[22px] font-semibold text-themeText transition-all duration-100 ease-in-out hover:text-mainTheme"
                :to="link.url"
              >
                {{ t(link.text) }}
              </NuxtLink>
            </li>
          </ul>
          <!-- END:: NAVBAR LINKS -->
        </div>

        <!-- START:: NAVBAR BUTTONS -->
        <div class="flex items-center justify-center gap-[10px]">
          <!-- START:: LOGIN ROUTE -->
          <NuxtLink
            to="/login"
            class="relative text-[22px] font-arb font-semibold text-mainTheme px-[10px] py-[4px] no-underline"
            v-if="!authStore.isAuthenticated"
          >
            {{ t("NAVBAR.login") }}
          </NuxtLink>
          <!-- END:: LOGIN ROUTE -->

          <!-- START:: REGISTER ROUTE -->
          <NuxtLink
            to="/select-register-type"
            class="relative px-[12px] py-[6px] border-1 !border-mainTheme  rounded-[10px] text-[22px] font-arb font-semibold text-mainTheme no-underline  ease-in-out duration-700 hover:text-white"
            style="
              background: linear-gradient(45deg, #34bf6c 50%, transparent 50%);
              background-size: 400%;
              background-position: 100%;
              transition: background-position 0.6s all ease-in-out;
            "
            @mouseover="
              (e) => (e.currentTarget.style.backgroundPosition = '0%')
            "
            @mouseleave="
              (e) => (e.currentTarget.style.backgroundPosition = '100%')
            "
            v-if="!authStore.isAuthenticated"
          >
            {{ t("NAVBAR.register") }}
          </NuxtLink>

          <!-- END:: REGISTER ROUTE -->

          <!-- START:: ADD SUBJECT ROUTE -->
          <NuxtLink
            to="/add-subject"
            class="flex items-center justify-center gap-[4px] relative px-[12px] py-[6px] bg-gradient-to-r from-mainTheme via-transparent to-transparent bg-[400%] border border-mainTheme transition-all duration-[600ms] ease-in-out rounded-[10px] text-[22px] font-arb font-semibold text-themeText no-underline hover:bg-left hover:text-white"
            v-if="authStore.isTeacher"
          >
            <span class="flex items-center justify-center">
              <i class="fal fa-plus"></i>
            </span>
            {{ t("NAVBAR.add_subject") }}
          </NuxtLink>
          <!-- END:: ADD SUBJECT ROUTE -->

          <!-- START:: NOTIFICATION BUTTON -->
          <div class="user_notification_content_wrapper">
            <button
              class="notification_btn"
              @click.stop="toggleNotificationsMenu"
              v-if="authStore.isAuthenticated"
            >
              <i class="fal fa-bell"></i>
              <span
                class="badge"
                v-show="notificationsStore.unreadNotifications !== 0"
              >
                {{ notificationsStore.unreadNotifications }}
              </span>
              <span class="toolTip">
                {{ t("TOOLTIPS.notifications") }}
              </span>
            </button>

            <transition name="fadeInUp">
              <ul class="notifications_menu" v-if="notificationsMenuIsOpen">
                <li
                  class="empty_image"
                  v-if="notificationsStore.notificationsList.length === 0"
                >
                  <img
                    src="../assets/media/empty_messages/empty_notifications.png"
                    alt="Empty Notifications"
                    width="180"
                    height="90"
                  />
                </li>
                <li
                  v-for="notification in notificationsStore.notificationsList"
                  :key="notification.id"
                  class="notifications_menu_item"
                >
                  <div class="icon_wrapper">
                    <span class="notification_icon_wrapper">
                      <i class="fal fa-bell"></i>
                    </span>
                  </div>
                  <div class="notification_body_wrapper">
                    <p class="notification_body">{{ notification.body }}</p>
                    <p class="notification_date">
                      {{ notification.created_at }}
                    </p>
                  </div>
                  <div class="delete_btn_wrapper">
                    <button
                      class="delete_notification_btn"
                      @click.stop="deleteNotification(notification.id)"
                    >
                      <i class="fal fa-trash-alt"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </transition>
          </div>
          <!-- END:: NOTIFICATION BUTTON -->

          <!-- START:: USER PROFILE BUTTON -->
          <div
            class="user_profile_menu_wrapper"
            v-if="authStore.isAuthenticated"
          >
            <button
              class="user_profile_menu_btn"
              @click.stop="toggleProfileMenu"
            >
              <div class="avatar_wrapper">
                <img :src="authStore.userAvatar" width="45" height="45" />
              </div>
            </button>

            <transition name="fadeInUp">
              <ul class="user_profile_menu" v-if="profileMenuIsOpen">
                <li
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/user-account">{{
                    t("NAVBAR.my_account")
                  }}</NuxtLink>
                </li>
                <li
                  class="user_profile_menu_item"
                  v-if="authStore.isTeacher"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/my-courses">{{
                    t("NAVBAR.my_tutorials")
                  }}</NuxtLink>
                </li>
                <li class="user_profile_menu_item">
                  <button @click="logout">
                    {{ t("BUTTONS.logout") }}
                  </button>
                </li>
              </ul>
            </transition>
          </div>
          <!-- END:: USER PROFILE BUTTON -->

          <!-- START:: SMALL SCREENS NAVBAR MENU BUTTON -->
          <button
            class="small_screens_navbar_toggeler"
            @click="toggleSmallScreensNavBar"
          >
            <i class="fal fa-bars"></i>
          </button>
          <!-- END:: SMALL SCREENS NAVBAR MENU BUTTON -->
        </div>
        <!-- END:: NAVBAR BUTTONS -->
      </div>
    </div>

    <!-- START:: SMALL SCREENS NAVBAR -->
    <!-- <div
      class="small_screens_navbar_wrapper"
      :class="{ active: smallScreensNavbarIsOpen }"
    >
      <button class="close_btn" @click="toggleSmallScreensNavBar">
        <i class="fal fa-times"></i>
      </button>

      <ul class="small_screens_links">
        <li
          v-for="link in navbarLinks"
          :key="link.id"
          @click="toggleSmallScreensNavBar"
        >
          <NuxtLink
            v-if="
              link.user_type === registeredUserType || link.user_type === 'all'
            "
            :to="link.url"
          >
            {{ t(link.text) }}
          </NuxtLink>
        </li>
      </ul>
    </div> -->
    <!-- END:: SMALL SCREENS NAVBAR -->
  </nav>
</template>
<style>
.navbar_link a.router-link-exact-active {
  @apply text-mainTheme;
}

nav.sticky_navbar {
  z-index: 2;
  animation: fixedAnimation 0.5s forwards;
}

/* 
nav .navbar_wrapper .navbar_btns_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  -moz-column-gap: 10px;
  column-gap: 10px;
}
nav .navbar_wrapper .navbar_btns_wrapper a {
  position: relative;
  text-decoration: none;
  font-size: 22px;
  font-family: "ArbFONTS-Somar-SemiBold";
  color: var(--theme_text_clr);
  padding: 4px 10px;
} */
nav .navbar_wrapper .navbar_btns_wrapper a .badge {
  padding: 0;
  position: absolute;
  top: -8px;
  right: 2px;
  display: block;
  min-width: 17px;
  height: 17px;
  font-size: 12px;
  color: var(--white_clr);
  background-color: var(--main_theme_clr);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .navbar_wrapper .navbar_btns_wrapper a .toolTip {
  position: absolute;
  bottom: -35px;
  left: 0;
  right: 0;
  width: -moz-max-content;
  width: max-content;
  padding: 0 8px;
  font-size: 18px;
  font-family: "ArbFONTS-Somar-Medium";
  background-color: var(--theme_bg_clr);
  color: var(--theme_text_clr);
  box-shadow: 0 0 10px 2px var(--simple_shadow_clr);
  border-radius: 8px;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  transform-origin: top;
  transform: scale(0);
  opacity: 0;
}
nav .navbar_wrapper .navbar_btns_wrapper a:hover .toolTip {
  transform: scale(1);
  opacity: 1;
}

nav .navbar_wrapper .navbar_btns_wrapper a.add_subject_route {
  padding: 6px 12px;
  color: var(--main_theme_clr);
  background-image: linear-gradient(
    45deg,
    var(--main_theme_clr) 50%,
    transparent 50%
  );
  background-position: 100%;
  background-size: 400%;
  border: 1px solid var(--main_theme_clr);
  transition: all 0.6s ease-in-out;
  border-radius: 10px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  -moz-column-gap: 4px;
  column-gap: 4px;
}
nav .navbar_wrapper .navbar_btns_wrapper a.add_subject_route:hover {
  background-position: 0;
  color: var(--white_clr);
}
nav .navbar_wrapper .navbar_btns_wrapper a.add_subject_route span {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .navbar_wrapper .navbar_btns_wrapper a.chats_route,
nav .navbar_wrapper .navbar_btns_wrapper a.strengthening_requests,
nav .navbar_wrapper .navbar_btns_wrapper a.shopping_cart_btn,
nav .navbar_wrapper .navbar_btns_wrapper a.my_courses_route {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--soft_main_theme_clr);
  color: var(--main_theme_clr);
  border-radius: 10px;
}
nav .navbar_wrapper .navbar_btns_wrapper a.chats_route i,
nav .navbar_wrapper .navbar_btns_wrapper a.chats_route svg,
nav .navbar_wrapper .navbar_btns_wrapper a.strengthening_requests i,
nav .navbar_wrapper .navbar_btns_wrapper a.strengthening_requests svg,
nav .navbar_wrapper .navbar_btns_wrapper a.shopping_cart_btn i,
nav .navbar_wrapper .navbar_btns_wrapper a.shopping_cart_btn svg,
nav .navbar_wrapper .navbar_btns_wrapper a.my_courses_route i,
nav .navbar_wrapper .navbar_btns_wrapper a.my_courses_route svg {
  font-size: 20px;
}
nav .navbar_wrapper .navbar_btns_wrapper button .badge {
  padding: 0;
  position: absolute;
  top: -8px;
  right: 2px;
  display: block;
  min-width: 17px;
  height: 17px;
  font-size: 12px;
  color: var(--white_clr);
  background-color: var(--main_theme_clr);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .navbar_wrapper .navbar_btns_wrapper button .toolTip {
  position: absolute;
  bottom: -35px;
  left: 0;
  right: 0;
  width: -moz-max-content;
  width: max-content;
  padding: 0 8px;
  font-size: 18px;
  font-family: "ArbFONTS-Somar-Medium";
  background-color: var(--theme_bg_clr);
  color: var(--theme_text_clr);
  box-shadow: 0 0 10px 2px var(--simple_shadow_clr);
  border-radius: 8px;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  transform-origin: top;
  transform: scale(0);
  opacity: 0;
}
nav .navbar_wrapper .navbar_btns_wrapper button:hover .toolTip {
  transform: scale(1);
  opacity: 1;
}
nav .navbar_wrapper .navbar_btns_wrapper button.search_btn,
nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer,
nav .navbar_wrapper .navbar_btns_wrapper button.notification_btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--soft_main_theme_clr);
  color: var(--main_theme_clr);
  border-radius: 10px;
}
nav .navbar_wrapper .navbar_btns_wrapper button.search_btn i,
nav .navbar_wrapper .navbar_btns_wrapper button.search_btn svg,
nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer i,
nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer svg,
nav .navbar_wrapper .navbar_btns_wrapper button.notification_btn i,
nav .navbar_wrapper .navbar_btns_wrapper button.notification_btn svg {
  font-size: 20px;
}
nav .navbar_wrapper .navbar_btns_wrapper button.small_screens_navbar_toggeler {
  display: none;
}
nav .navbar_wrapper .navbar_btns_wrapper .user_notification_content_wrapper {
  position: relative;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu {
  position: absolute;
  top: 130%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 280px;
  max-width: -moz-max-content;
  max-width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--theme_bg_clr);
  border-radius: 10px;
  box-shadow: 0 0 10px 2px var(--simple_shadow_clr);
  z-index: 2;
  overflow: hidden;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .empty_image {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  -moz-column-gap: 8px;
  column-gap: 8px;
  transition: all 0.4s ease-in-out;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item:hover {
  background-color: var(--soft_main_theme_clr);
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item:not(:last-of-type) {
  margin-bottom: 8px;
  border-bottom: 1px solid var(--very_light_theme_clr);
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .icon_wrapper {
  width: 20%;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--main_theme_clr);
  border-radius: 10px;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper
  svg,
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper
  i {
  color: var(--white_clr);
  font-size: 18px;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .notification_body_wrapper {
  width: 64%;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .notification_body_wrapper
  .notification_body {
  margin: 0;
  line-height: 1.4;
  color: var(--theme_text_clr);
  font-size: 18px;
  font-family: "ArbFONTS-Somar-Medium";
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .notification_body_wrapper
  .notification_date {
  color: var(--light_gray_clr);
  font-size: 16px;
  font-family: "ArbFONTS-Somar-Medium";
  margin: 0;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper {
  width: 15%;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary_theme_clr);
  color: var(--main_theme_clr);
  border-radius: 10px;
  border-radius: 50%;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  i,
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  svg {
  font-size: 20px;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  svg,
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_notification_content_wrapper
  .notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  i {
  color: var(--mid_red_clr);
}
nav .navbar_wrapper .navbar_btns_wrapper .user_profile_menu_wrapper {
  position: relative;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu_btn
  .avatar_wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu_btn
  .avatar_wrapper
  img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu {
  position: absolute;
  top: 130%;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  width: -moz-max-content;
  width: max-content;
  background-color: var(--theme_bg_clr);
  border-radius: 10px;
  box-shadow: 0 0 10px 2px var(--simple_shadow_clr);
  z-index: 31;
  overflow: hidden;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu
  .user_profile_menu_item {
  transition: all 0.4s ease-in-out;
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu
  .user_profile_menu_item:hover {
  background-color: var(--soft_main_theme_clr);
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu
  .user_profile_menu_item:not(:last-of-type) {
  border-bottom: 1px solid var(--very_light_theme_clr);
}
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu
  .user_profile_menu_item
  a,
nav
  .navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu
  .user_profile_menu_item
  button {
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
  padding: 6px 25px;
  color: var(--theme_text_clr);
  font-size: 22px;
  font-family: "ArbFONTS-Somar-Medium";
}
nav .small_screens_navbar_wrapper {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
}
nav .small_screens_navbar_wrapper.active {
  left: 0;
}
nav .small_screens_navbar_wrapper .close_btn {
  position: absolute;
  top: 25px;
  left: 25px;
}
nav .small_screens_navbar_wrapper .close_btn svg,
nav .small_screens_navbar_wrapper .close_btn i {
  color: var(--white_clr);
  font-size: 25px;
  transition: all 0.4s ease-in-out;
}
nav .small_screens_navbar_wrapper .close_btn:hover svg,
nav .small_screens_navbar_wrapper .close_btn:hover i {
  color: var(--mid_red_clr);
  transform: rotate(90deg) scale(1.1);
}
nav .small_screens_navbar_wrapper .small_screens_links {
  list-style: none;
  padding: 0;
  margin-top: 50px;
}
nav .small_screens_navbar_wrapper .small_screens_links li {
  text-align: center;
  padding-block: 8px;
}
nav .small_screens_navbar_wrapper .small_screens_links li a {
  text-decoration: none;
  font-size: 25px;
  font-family: "ArbFONTS-Somar-Medium";
  color: var(--white_clr);
  transition: all 0.4s ease-in-out;
}
nav .small_screens_navbar_wrapper .small_screens_links li a:hover,
nav
  .small_screens_navbar_wrapper
  .small_screens_links
  li
  a.router-link-exact-active {
  color: var(--main_theme_clr);
}
@media (max-width: 767px) {
  nav .navbar_wrapper .logo_and_links_wrapper .logo_wrapper img {
    width: 71px;
    height: 57px;
  }
  nav .navbar_wrapper .logo_and_links_wrapper .navbar_links_wrapper {
    display: none;
  }
  nav .navbar_wrapper .navbar_btns_wrapper a.login_route,
  nav .navbar_wrapper .navbar_btns_wrapper a.register_route,
  nav .navbar_wrapper .navbar_btns_wrapper a.chats_route,
  nav .navbar_wrapper .navbar_btns_wrapper a.strengthening_requests,
  nav .navbar_wrapper .navbar_btns_wrapper a.my_courses_route,
  nav .navbar_wrapper .navbar_btns_wrapper a.add_subject_route {
    display: none;
  }
  nav .navbar_wrapper .navbar_btns_wrapper button.search_btn,
  nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer {
    width: 40px;
    height: 40px;
  }
  nav .navbar_wrapper .navbar_btns_wrapper button.search_btn svg,
  nav .navbar_wrapper .navbar_btns_wrapper button.search_btn i,
  nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer svg,
  nav .navbar_wrapper .navbar_btns_wrapper button.theme_changer i {
    font-size: 18px;
  }
  nav
    .navbar_wrapper
    .navbar_btns_wrapper
    button.small_screens_navbar_toggeler {
    font-size: 22px;
    color: var(--main_theme_clr);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@keyframes fixedAnimation {
  0% {
    position: fixed;
    top: -100%;
    width: 100%;
  }
  100% {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 2px solid var(--soft_main_theme_clr);
  }
}
</style>
