import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

import { useNuxtApp } from "#app";
const { cookies } = useCookies();

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    userType: cookies.get("elmo3lm_elmosa3d_user_type"),
    userToken: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
    userAvatar: cookies.get("elmo3lm_elmosa3d_user_avatar"),
  }),

  getters: {
    getAuthenticatedUserData(state) {
      return {
        type: state.userType,
        token: state.userToken,
        avatar: state.userAvatar,
      };
    },

    isAuthenticated: (state) => !!state.userToken, // Boolean check
    isTeacher: (state) => state.userType === "teacher",
  },

  actions: {
    initializeAuth() {
      const { cookies } = useCookies();

      this.userType = cookies.get("elmo3lm_elmosa3d_user_type");
      this.userToken = cookies.get("elmo3lm_elmosa3d_user_token");
      this.userAvatar = cookies.get("elmo3lm_elmosa3d_user_avatar");
    },

    setAuthenticatedUserData(payload: {
      type: string;
      token: string;
      avatar: string;
    }) {
      const { cookies } = useCookies();

      // ✅ Set cookies with explicit expiration
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // 7 days
      // , {
      //       expires: expiryDate,
      //       path: "/",
      //     }
      // , {
      //       expires: expiryDate,
      //       path: "/",
      //     }
      // , {
      //       expires: expiryDate,
      //       path: "/",
      //     }
      cookies.set("elmo3lm_elmosa3d_user_type", payload.type);
      cookies.set("elmo3lm_elmosa3d_user_token", payload.token);
      cookies.set("elmo3lm_elmosa3d_user_avatar", payload.avatar);

      console.log("Cookies Set Successfully!");
    },

    logout() {
      const { cookies } = useCookies();
      const router = useRouter();

      // Remove auth cookies
      cookies.remove("elmo3lm_elmosa3d_user_type");
      cookies.remove("elmo3lm_elmosa3d_user_token");
      cookies.remove("elmo3lm_elmosa3d_user_avatar");

      this.userType = "";
      this.userToken = "";
      this.userAvatar = "";

      // Refresh to clear store state & redirect
      location.reload();
      router.replace("/");
    },
  },
});
