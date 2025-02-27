import { defineStore } from "pinia";
import axios from "axios";
export const useAuthenticationStore = defineStore("authentication", () => {
  const type = useCookie("elmo3lm_elmosa3d_user_type");
  const token = useCookie("elmo3lm_elmosa3d_user_token");
  const avatar = useCookie("elmo3lm_elmosa3d_user_avatar");
  const config = useRuntimeConfig();
  const getAuthenticatedUserData = () => ({
    type: type.value || "",
    token: token.value ? `Bearer ${token.value}` : "",
    avatar: avatar.value || "",
  });
  console.log(getAuthenticatedUserData())

  const isAuthenticated = () => !!token.value;
  const isTeacher = () => type.value === "teacher";

  const initializeAuth = () => {
    type.value = useCookie("elmo3lm_elmosa3d_user_type").value;
    token.value = useCookie("elmo3lm_elmosa3d_user_token").value;
    avatar.value = useCookie("elmo3lm_elmosa3d_user_avatar").value;
  };

  const setAuthenticatedUserData = (payload: {
    type: string;
    token: string;
    avatar: string;
  }) => {
    type.value = payload.type;
    token.value = payload.token;
    avatar.value = payload.avatar;

    console.log("✅ Cookies Set Successfully!");
  };

  // Start
  const profile = ref(null);
  // const headers = computed(() => ({
  //   Authorization: `Bearer ${token.value}`, // ✅ Token from Cookie
  //   "Accept-language": "ar",
  //   "cache-control": "no-cache",
  //   Accept: "application/json",
  // }));

  const getProfile = async () => {
    axios(`${config.public.baseURL}${type.value}/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": useNuxtApp().$i18n.locale.value,
        Authorization: `Bearer ${
          token.value || useCookie("elmo3lm_elmosa3d_user_token").value
        }`,
      },
    })
      .then((res) => {
        profile.value = res?.data?.data;
        console.log("user", res?.data?.data?.user);
        // getAllNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    const router = useRouter();

    type.value = null;
    token.value = null;
    avatar.value = null;

    console.log("✅ User Logged Out, Cookies Cleared!");

    router.replace("/");
    window.location.reload();
  };

  return {
    type,
    token,
    avatar,
    getAuthenticatedUserData,
    isAuthenticated,
    isTeacher,
    initializeAuth,
    setAuthenticatedUserData,
    profile,
    getProfile,
    logout,
  };
});
