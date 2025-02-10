import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    userType: null as string | null,
    userToken: null as string | null,
    userAvatar: null as string | null,
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
      if (process.client) {
        this.userType = localStorage.getItem("elmo3lm_elmosa3d_user_type") || null;
        this.userToken = localStorage.getItem("elmo3lm_elmosa3d_user_token") || null;
        this.userAvatar = localStorage.getItem("elmo3lm_elmosa3d_user_avatar") || null;
      }
    },

    setAuthenticatedUserData(payload: { type: string; token: string; avatar: string }) {
      this.userType = payload.type;
      this.userToken = payload.token;
      this.userAvatar = payload.avatar;

      if (process.client) {
        localStorage.setItem("elmo3lm_elmosa3d_user_type", payload.type);
        localStorage.setItem("elmo3lm_elmosa3d_user_token", payload.token);
        localStorage.setItem("elmo3lm_elmosa3d_user_avatar", payload.avatar);
      }
    },

    logout() {
      const router = useRouter();
      if (process.client) {
        localStorage.removeItem("elmo3lm_elmosa3d_user_type");
        localStorage.removeItem("elmo3lm_elmosa3d_user_token");
        localStorage.removeItem("elmo3lm_elmosa3d_user_avatar");
        location.reload(); // Refresh page to clear store state
      }
      router.replace("/");
    },
  },
});
