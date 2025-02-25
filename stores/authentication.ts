import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useNuxtApp } from "#app";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => ({
    userType: "student" as string, // ✅ Default to "guest"
    userToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks" as string,     // ✅ Default to empty string
    userAvatar: "https://egypt-api.faiera.com/dashboardAssets/images/backgrounds/avatar.jpg" as string, // ✅ Default avatar
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

      this.userType = cookies.get("elmo3lm_elmosa3d_user_type") ;
      this.userToken = cookies.get("elmo3lm_elmosa3d_user_token") ;
      this.userAvatar = cookies.get("elmo3lm_elmosa3d_user_avatar") ;
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

      this.userType = '';
      this.userToken = '';
      this.userAvatar = '';

      // Refresh to clear store state & redirect
      location.reload();
      router.replace("/");
    },
  },
});
