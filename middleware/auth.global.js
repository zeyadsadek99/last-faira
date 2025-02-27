import { useAuthenticationStore } from "~/stores/authentication";
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthenticationStore();
  // ✅ Redirect to login if token is missing

  if (useCookie("elmo3lm_elmosa3d_user_token").value && !authStore.profile) {
    console.log("zkz");
    authStore.getProfile();
  }
});
