<template>
  <nav id="navbar">
    <!-- START:: SEARCH -->
    <Search v-if="searchIsOpen" @closeSearch="toggleSearch" />
    <!-- END:: SEARCH -->

    <div class="container">
      <div class="navbar_wrapper">
        <div class="logo_and_links_wrapper">
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
          <ul class="navbar_links_wrapper">
            <li
              class="navbar_link"
              v-for="link in navbarLinks"
              :key="link.id"
              v-if="
                link?.user_type == 'all' ||
                link?.user_type == registeredUserType
              "
            >
              <!-- {{ link.user_type == 'all' }} -->

              <NuxtLink :to="link.url">
                {{ t(link.text) }}
              </NuxtLink>
            </li>
          </ul>
          <!-- END:: NAVBAR LINKS -->
        </div>

        <!-- START:: NAVBAR BUTTONS -->
        <div class="navbar_btns_wrapper">
          <!-- START:: LOGIN ROUTE -->
          <NuxtLink
            to="/login"
            class="login_route"
            v-if="!authStore.isAuthenticated"
          >
            {{ t("NAVBAR.login") }}
          </NuxtLink>
          <!-- END:: LOGIN ROUTE -->

          <!-- START:: REGISTER ROUTE -->
          <NuxtLink
            to="/select-register-type"
            class="register_route"
            v-if="!authStore.isAuthenticated"
          >
            {{ t("NAVBAR.register") }}
          </NuxtLink>
          <!-- END:: REGISTER ROUTE -->

          <!-- START:: ADD SUBJECT ROUTE -->
          <NuxtLink
            to="/add-subject"
            class="add_subject_route"
            v-if="authStore.isTeacher"
          >
            <span> <i class="fal fa-plus"></i> </span>
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
    <div
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
    </div>
    <!-- END:: SMALL SCREENS NAVBAR -->
  </nav>
</template>

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
