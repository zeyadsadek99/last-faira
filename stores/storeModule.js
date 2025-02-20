import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useI18n } from "vue-i18n";
import { useNuxtApp } from "#app";

export const useStoreWishlist = defineStore("storeWishlist", {
  state: () => ({
    storeItems: [],
    lastPage: null,
    shoppingCartItems: [],
    showCash: false,
    favorites: {
      registeredSubjects: [],
      onlineSubjects: [],
      teacherSubjects: [],
      products: [],
    },
  }),

  getters: {
    getStoreItems: (state) => ({
      setStoreItems: state.storeItems,
      lastPage: state.lastPage,
    }),
    getShoppingCartItems: (state) => state.shoppingCartItems,
    getWishlistItems: (state) => state.favorites,
    getShowCash: (state) => state.showCash,
  },

  actions: {
    async addToCart(payload) {
      const { cookies } = useCookies();
      const { t } = useI18n();
      const { $axios } = useNuxtApp(); // ✅ Use Nuxt's axios instance

      const theData = new FormData();
      theData.append("product_id", payload.id);
      theData.append("count", payload.count.toString());

      try {
        await $axios.post("user/cart", theData, {
          headers: {
            Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        alert(t("MESSAGES.added_to_cart")); // Replace iziToast with alternative
        this.getCart();
      } catch (error) {
        alert(error.response?.data?.message || t("VALIDATION.error")); // Handle error gracefully
      }
    },

    async removeFromCart(productId) {
      const { cookies } = useCookies();
      const { t } = useI18n();
      const { $axios } = useNuxtApp();

      try {
        await $axios.delete(`user/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        alert(t("MESSAGES.deleted_successfully"));
        this.getCart();
      } catch (error) {
        alert(error.response?.data?.message || t("VALIDATION.error"));
      }
    },

    async getProducts(page) {
      const { cookies } = useCookies();
      const { $axios } = useNuxtApp();

      try {
        const response = await $axios.get(`user/product?page=${page}`, {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDA0MDI2NywiZXhwIjoxNzcxNTc2MjY3LCJuYmYiOjE3NDAwNDAyNjcsImp0aSI6IkpkRzl3SkJBcnBkeUx1b0ciLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.68MNuHuBFynQCc04POA1WxdSt8I74tdWLxr8hbQi2SA`,
            "Accept-language": 'ar',
            // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        this.storeItems = response.data.data;
        this.lastPage = response.data.meta.last_page;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    async getCart() {
      const { cookies } = useCookies();
      const { $axios } = useNuxtApp();

      try {
        const response = await $axios.get("user/cart", {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDA0MDI2NywiZXhwIjoxNzcxNTc2MjY3LCJuYmYiOjE3NDAwNDAyNjcsImp0aSI6IkpkRzl3SkJBcnBkeUx1b0ciLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.68MNuHuBFynQCc04POA1WxdSt8I74tdWLxr8hbQi2SA`,
            // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": 'ar',
            // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        this.shoppingCartItems = response.data;
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
  },
});
