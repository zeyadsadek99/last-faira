import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";
import { useI18n } from "vue-i18n";
import { useNuxtApp } from "#app";

// const { t } = useI18n();

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
    // async toggleFavorite(id) {
    //   const { cookies } = useCookies();
    //   const { $axios } = useNuxtApp();

    //   try {
    //     const theData = new FormData();
    //     theData.append("fav_type", "product");
    //     theData.append("id", id);

    //     const response = await $axios.post("user/favourite", theData, {
    //       headers: {
    //         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDM5ODA3NywiZXhwIjoxNzcxOTM0MDc3LCJuYmYiOjE3NDAzOTgwNzcsImp0aSI6ImFNSlhHcTg4QVVINHJSWEUiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.7rURiqBXDYarUXPYrM7SPzA1mmg1YbuzBZMbDP2PaTU`,
    //         // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
    //         "Accept-language": "ar", // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
    //         "cache-control": "no-cache",
    //         Accept: "application/json",
    //       },
    //     });

    //     // ✅ Update the favorite status in the state
    //     const updatedFavStatus = response.data.data.is_fav;

    //     // // ✅ Update the product list in the store
    //     // this.favorites.products = this.favorites.products.map((product) =>
    //     //   product.id === id ? { ...product, is_fav: updatedFavStatus } : product
    //     // );

    //     // ✅ Fetch updated products & favorites
    //     // this.getProducts();
    //     // this.getStudentFavorites();
    //     return updatedFavStatus; // ✅ Return updated status
    //   } catch (error) {
    //     console.error("Error updating favorites:", error);
    //   }
    // },
    async getCart() {
      const { cookies } = useCookies();
      const { $axios } = useNuxtApp();

      try {
        const response = await $axios.get("user/cart", {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks`,
            // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": "ar",
            // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });
        console.log('zoz')
        shoppingCartItems = response.data;
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    async addToCart(payload) {
      const { cookies } = useCookies();
      const { $axios } = useNuxtApp(); // ✅ Use Nuxt's axios instance

      const theData = new FormData();
      theData.append("product_id", payload.id);
      theData.append("count", payload.count.toString());

      try {
        await $axios.post("user/cart", theData, {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks`,
            // Authorization: `Bearer ${cookies.get("elmo3lm_elmosa3d_user_token")}`,
            "Accept-language": "ar", // "Accept-language": cookies.get("elmo3lm_elmosa3d_app_lang"),
            "cache-control": "no-cache",
            Accept: "application/json",
          },
        });

        await this.getCart();
        alert("MESSAGES.added_to_cart"); // Replace iziToast with alternative
      } catch (error) {
        alert(error.response?.data?.message || "VALIDATION.error"); // Handle error gracefully
      }
    },

    async removeFromCart(productId) {
      const { cookies } = useCookies();
      const { t } = useI18n();
      const { $axios } = useNuxtApp();

      try {
        await $axios.delete(`user/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${cookies.get(
              "elmo3lm_elmosa3d_user_token"
            )}`,
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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2VneXB0LWFwaS5mYWllcmEuY29tL2FwaS9sb2dpbiIsImlhdCI6MTc0MDQ3NjMzOCwiZXhwIjoxNzcyMDEyMzM4LCJuYmYiOjE3NDA0NzYzMzgsImp0aSI6IjBMQTFHeVQxNmc4SE1TdlIiLCJzdWIiOiIxNjkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.N9EjlH9UAt2bMWfDJdy19G6HsKmnccA6mZIfvuImeks`,
            "Accept-language": "ar",
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

    
  },
});
