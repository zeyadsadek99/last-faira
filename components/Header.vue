<script setup>
import { useAuthenticationStore } from "@/stores/authentication";
import { useNotificationsStore } from "@/stores/notifications";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

// Stores
const authStore = useAuthenticationStore();
const notificationsStore = useNotificationsStore();
const { t } = useI18n();
const router = useRouter();

const { profile,token } = storeToRefs(useAuthenticationStore());

// Reactive State
const smallScreensNavbarIsOpen = ref(false);
const searchIsOpen = ref(false);
const profileMenuIsOpen = ref(false);
const notificationsMenuIsOpen = ref(false);

// Computed
const registeredUserType = computed(() => authStore.type);
const userData = computed(() => authStore.getAuthenticatedUserData());
const notificationsData = computed(() => notificationsStore.getNotifications);
console.log(userData);
// Navbar Links
const navbarLinks = reactive([
  { id: "home", url: "/", text: "NAVBAR.home", user_type: "all" },
  { id: "about", url: "/about", text: "NAVBAR.about_us", user_type: "all" },
  {
    id: "my_sons",
    url: "/mySons",
    text: "NAVBAR.my_sons",
    user_type: "oarent",
  },
  {
    id: "subjects",
    url: "/courses",
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
// ✅ Function to close menus when clicking outside
const closeMenus = () => {
  profileMenuIsOpen.value = false;
  notificationsMenuIsOpen.value = false;
};

// ✅ Add event listener when component mounts
onMounted(() => {
  window.addEventListener("click", closeMenus);
});

// ✅ Remove event listener when component unmounts
onUnmounted(() => {
  window.removeEventListener("click", closeMenus);
});

// const logout = async () => {
//   await authStore.logout();
//   router.push("/login");
// };

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
  // stickyNavbar();
  if (useCookie("elmo3lm_elmosa3d_user_token").value) {
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
          <!-- {{ userData.value }} -->
          <!-- START:: NAVBAR LINKS -->
          <ul
            class="hidden md:flex md:items-center md:justify-between m-0 p-0 gap-12 list-none"
          >
            <li v-for="link in navbarLinks" :key="link.id" class="navbar_link">
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
        <div
          class="navbar_btns_wrapper flex items-center justify-center gap-[10px]"
        >
          <!-- START:: LOGIN ROUTE -->
          <NuxtLink
            v-if="!userData.token"
            to="/login"
            class="relative text-[22px] font-semibold text-mainTheme px-[10px] py-2 no-underline"
          >
            {{ t("NAVBAR.login") }}
          </NuxtLink>
          <!-- END:: LOGIN ROUTE -->

          <!-- START:: REGISTER ROUTE -->
          <NuxtLink
            v-if="!userData.token"
            to="/login/selectRegisterType"
            class="relative px-[10px] py-2 border-1 !border-mainTheme rounded-[10px] text-[22px] font-semibold text-mainTheme no-underline ease-in-out duration-700 hover:text-white"
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
          >
            {{ t("NAVBAR.register") }}
          </NuxtLink>

          <!-- END:: REGISTER ROUTE -->

          <!-- START:: ADD SUBJECT ROUTE -->
          <NuxtLink
            v-if="!userData.token && registeredUserType == 'teacher'"
            to="/add-subject"
            class="add_subject_route"
          >
            <span class="flex items-center justify-center">
              <i class="fa-solid fa-plus"></i>
            </span>
            {{ t("NAVBAR.add_subject") }}
          </NuxtLink>
          <!-- END:: ADD SUBJECT ROUTE -->

          <!-- START:: NOTIFICATION BUTTON -->
          <div class="user_notification_content_wrapper">
            <button
              class="notification_btn"
              @click.stop="toggleNotificationsMenu"
              v-if="userData.token"
            >
              <i class="fa-regular fa-bell"></i>

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

            <transition name="fadeInUp" mode="out-in">
              <ul class="notifications_menu" v-if="notificationsMenuIsOpen">
                <li
                  class="empty_image"
                  v-if="notificationsStore.notifications.length == 0"
                >
                  <img
                    src="../assets/media/empty_messages/empty_notifications.png"
                    alt="Empty Notifications"
                    width="180"
                    height="90"
                  />
                </li>
                <li
                  v-for="notification in notificationsStore.notifications"
                  :key="notification.id"
                  class="notifications_menu_item"
                >
                  <div class="icon_wrapper">
                    <span class="notification_icon_wrapper">
                      <i class="fa-solid fa-bell"></i>
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
                      @click.stop="
                        notificationsStore.deleteNotification(notification.id)
                      "
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </transition>
          </div>
          <!-- END:: NOTIFICATION BUTTON -->

          <!-- START:: CHATS ROUTE -->
          <NuxtLink v-if="userData.token" to="/chats" class="chats_route">
            <i class="fa-regular fa-comment"></i>
            <span class="toolTip">{{ t("TOOLTIPS.chats") }}</span>
          </NuxtLink>
          <!-- END:: CHATS ROUTE -->
          <!-- ✅ STRENGTHENING REQUESTS ROUTE -->
          <NuxtLink
            v-if="
              userData.token &&
              (registeredUserType == 'parent' ||
                registeredUserType == 'teacher')
            "
            to="/strengthening-requests"
            class="strengthening_requests"
          >
            <i class="fa-solid fa-book"></i>
            <!-- <i class="fa-regular fa-book"></i> -->
            <span class="toolTip">{{
              t("TOOLTIPS.strengthening_requests")
            }}</span>
          </NuxtLink>

          <!-- ✅ MY COURSES ROUTE -->
          <NuxtLink
            v-if="userData.token && registeredUserType == 'student'"
            to="/my-courses"
            class="my_courses_route"
          >
            <!-- <svg width="79px" height="79px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracurrentColorerCarrier" stroke-linecurrentcap="round" stroke-linejoin="round"></g><g id="SVGRepo_icurrentColoronCarrier"> <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="currentColor" stroke-width="2" stroke-linecurrentcap="round" stroke-linejoin="round"></path> </g></svg> -->
            <i class="fa-solid fa-book"></i>
            <span class="toolTip">{{ t("TOOLTIPS.my_courses") }}</span>
          </NuxtLink>

          <!-- ✅ CART ROUTE -->
          <NuxtLink
            v-if="userData.token && registeredUserType == 'student'"
            to="/shopping-cart"
            class="shopping_cart_btn relative"
          >
            <i class="fa-solid fa-shopping-cart"></i>
            <span v-if="cartItemCount > 0" class="badge">{{
              cartItemCount
            }}</span>
            <span class="toolTip">{{ t("TOOLTIPS.shopping_cart") }}</span>
          </NuxtLink>

          <!-- ✅ SEARCH BUTTON -->
          <button
            class="search_btn"
            @click="toggleSearch"
            v-if="userData.token && registeredUserType === 'student'"
          >
            <i class="fa-solid fa-search"></i>
            <span class="toolTip">{{ t("TOOLTIPS.search") }}</span>
          </button>

          <!-- START:: USER PROFILE BUTTON -->
          <div class="relative user_profile_menu_wrapper" v-if="profile">
            <button
              class="user_profile_menu_btn"
              @click.stop="toggleProfileMenu"
            >
              <div class="avatar_wrapper">
                <img :src="profile.profile_image" width="45" height="45" />
              </div>
            </button>

            <transition name="fadeInUp" mode="out-in">
              <ul v-if="profileMenuIsOpen" class="user_profile_menu">
                <li
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/user-account">
                    {{ t("NAVBAR.my_account") }}
                  </NuxtLink>
                </li>

                <li
                  v-if="userType === 'teacher'"
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/my-courses">
                    {{ t("NAVBAR.my_tutorials") }}
                  </NuxtLink>
                </li>

                <li
                  v-if="userType === 'teacher'"
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/my-balance">
                    {{ t("NAVBAR.my_cash") }}
                  </NuxtLink>
                </li>

                <li
                  v-if="userType === 'student' || userType === 'teacher'"
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/favorites">
                    {{ t("NAVBAR.favorites") }}
                  </NuxtLink>
                </li>

                <li
                  v-if="userType === 'student'"
                  class="user_profile_menu_item"
                  @click.stop="toggleProfileMenu"
                >
                  <NuxtLink to="/my-orders">
                    {{ t("NAVBAR.my_orders") }}
                  </NuxtLink>
                </li>

                <li class="user_profile_menu_item">
                  <button @click="authStore.logout()">
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
} 

/* ✅ Badge Styling */
.navbar_btns_wrapper a .badge,
.navbar_btns_wrapper button .badge {
  @apply absolute top-[-8px] right-[2px] flex items-center justify-center 
    min-w-[17px] h-[17px] text-[12px] rounded-[50%] 
    text-white bg-mainTheme;
}

/* ✅ Add Subject Route Button */
.navbar_btns_wrapper a.add_subject_route {
  @apply flex items-center justify-center text-[22px] font-semibold px-[10px] py-1 gap-1 rounded-[10px] 
    text-mainTheme border border-mainTheme transition-all ease-in-out duration-[600ms];
  background-image: linear-gradient(
    45deg,
    var(--main_theme_clr) 50%,
    transparent 50%
  );

  background-position: 100%;
  background-size: 400%;
}
.navbar_btns_wrapper a.add_subject_route:hover {
  @apply bg-[0px] text-white;
}

/* ✅ Icon Wrapper for Add Subject Route */
.navbar_btns_wrapper a.add_subject_route span {
  @apply flex items-center justify-center;
}
.navbar_btns_wrapper a {
  @apply relative text-[22px] font-semibold text-mainTheme no-underline px-[10px] py-1;
}
/* ✅ Chat, Strengthening Requests, Shopping Cart, My Courses Buttons */
.navbar_btns_wrapper a.chats_route,
.navbar_btns_wrapper a.strengthening_requests,
.navbar_btns_wrapper a.shopping_cart_btn,
.navbar_btns_wrapper a.my_courses_route {
  @apply relative size-10 flex items-center justify-center 
    bg-softMainTheme text-mainTheme rounded-lg;
}

/* ✅ Icons inside Buttons */
.navbar_btns_wrapper a.chats_route i,
.navbar_btns_wrapper a.chats_route svg,
.navbar_btns_wrapper a.strengthening_requests i,
.navbar_btns_wrapper a.strengthening_requests svg,
.navbar_btns_wrapper a.shopping_cart_btn i,
.navbar_btns_wrapper a.shopping_cart_btn svg,
.navbar_btns_wrapper a.my_courses_route i,
.navbar_btns_wrapper a.my_courses_route svg {
  @apply text-[20px];
}

/* ✅ Buttons: Search, Theme Changer, Notification */
.navbar_btns_wrapper button.search_btn,
.navbar_btns_wrapper button.theme_changer,
.navbar_btns_wrapper button.notification_btn {
  @apply relative w-10 h-10 flex items-center justify-center 
    bg-softMainTheme text-mainTheme rounded-lg;
}

/* ✅ Icons inside Buttons */
.navbar_btns_wrapper button.search_btn i,
.navbar_btns_wrapper button.search_btn svg,
.navbar_btns_wrapper button.theme_changer i,
.navbar_btns_wrapper button.theme_changer svg,
.navbar_btns_wrapper button.notification_btn i,
.navbar_btns_wrapper button.notification_btn svg {
  @apply text-[20px];
}

/* ✅ Hide Small Screens Navbar Toggle Button */
.navbar_btns_wrapper button.small_screens_navbar_toggeler {
  @apply hidden;
}

/* ✅ User Notification Wrapper */
.user_notification_content_wrapper {
  @apply relative;
}

/* ✅ Notifications Menu  max-w-max*/
.notifications_menu {
  @apply absolute top-[130%] left-1/2 transform -translate-x-1/2 
    m-0 p-0 list-none min-w-[280px] w-fit  flex flex-col items-center 
    justify-center bg-themeBg rounded-[10px] shadow-[0_0_10px_2px_var(--simple_shadow_clr)] z-10 overflow-hidden;
}

/* ✅ Empty Notifications */
.notifications_menu .empty_image {
  @apply p-4 flex items-center justify-center;
}

/* ✅ Notification Item */
.notifications_menu .notifications_menu_item {
  @apply w-full p-3 flex items-center justify-start gap-2 
    transition-all duration-[400ms] border-b last:border-b-0 last:mb-2 border-veryLightTheme;
}

/* ✅ Hover Effect */
.notifications_menu .notifications_menu_item:hover {
  @apply bg-softMainTheme;
}

/* ✅ Icon Wrapper */
.notifications_menu .notifications_menu_item .icon_wrapper {
  @apply w-1/5;
}

/* ✅ Notification Icon */
.notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper {
  @apply flex items-center justify-center w-10 h-10 bg-mainTheme 
    text-white rounded-lg;
}

/* ✅ Notification Icon Size */
.notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper
  i,
.notifications_menu
  .notifications_menu_item
  .icon_wrapper
  .notification_icon_wrapper
  svg {
  @apply text-white text-lg;
}

/* ✅ Notification Body */
.notifications_menu .notifications_menu_item .notification_body_wrapper {
  @apply w-3/5;
}

/* ✅ Notification Text */
.notifications_menu
  .notifications_menu_item
  .notification_body_wrapper
  .notification_body {
  @apply m-0 text-themeText text-lg font-medium leading-relaxed;
}

/* ✅ Notification Date */
.notifications_menu
  .notifications_menu_item
  .notification_body_wrapper
  .notification_date {
  @apply text-lightGray text-sm font-medium m-0;
}

/* ✅ Delete Button Wrapper */
.notifications_menu .notifications_menu_item .delete_btn_wrapper {
  @apply w-1/5 flex items-center justify-center;
}

/* ✅ Delete Notification Button */
.notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn {
  @apply flex items-center justify-center w-10 h-10 bg-secondaryTheme 
    text-midRed rounded-full transition hover:bg-red-200;
}

/* ✅ Delete Icon */
.notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  i,
.notifications_menu
  .notifications_menu_item
  .delete_btn_wrapper
  .delete_notification_btn
  svg {
  @apply text-lg text-midRed;
}
/* ✅ Tooltip Styling */
.navbar_btns_wrapper .toolTip {
  @apply absolute bottom-[-35px] left-0 right-0 
    w-max px-2 text-lg font-medium text-themeText 
    bg-themeBg shadow-lg rounded-lg 
    z-10 transition-all duration-300 
    transform scale-0 opacity-0 origin-top;
}

/* ✅ Tooltip Hover Effect */
.navbar_btns_wrapper :hover .toolTip {
  @apply scale-100 opacity-100;
}

.navbar_wrapper .navbar_btns_wrapper .user_profile_menu_wrapper {
  @apply relative;
}

.avatar_wrapper {
  @apply size-10 rounded-[10px] overflow-hidden;
}

.navbar_wrapper
  .navbar_btns_wrapper
  .user_profile_menu_wrapper
  .user_profile_menu_btn
  .avatar_wrapper
  img {
  @apply w-full h-full object-cover;
}

.user_profile_menu {
  @apply absolute top-[130%] left-0 m-0 p-0 list-none bg-themeBg rounded-[10px] shadow-[0_0_10px_2px_var(--simple_shadow_clr)] z-[31] overflow-hidden w-max;
}

.user_profile_menu_item {
  @apply transition-all duration-[400ms] ease-in-out;
}

.user_profile_menu_item:hover {
  @apply bg-softMainTheme;
}

.user_profile_menu_item a,
.user_profile_menu_item button {
  @apply block w-full text-center py-1.5 px-6 text-themeText text-[22px] font-medium no-underline;
}
.user_profile_menu_item a {
  @apply relative;
}

/* ✅ PROFILE MENU ITEMS */

.user_profile_menu_item:not(:last-of-type) {
  @apply border-b !border-veryLightTheme;
}

/* ✅ FADE-IN TRANSITION */
.fadeInUp-enter-active,
.fadeInUp-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fadeInUp-enter-from,
.fadeInUp-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
