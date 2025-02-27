import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

export const useStoreWishlist = defineStore("storeWishlist", () => {
  const { t } = useI18n();
  const axios = useNuxtApp().$axios;

  // ✅ Define cookies for authentication
  const token = useCookie("elmo3lm_elmosa3d_user_token");
  const userLang = useCookie("elmo3lm_elmosa3d_app_lang");

  // ✅ State (reactive variables)
  const storeItems = ref([]);
  const lastPage = ref(null);
  const shoppingCartItems = ref([]);
  const showCash = ref(false);
  const favorites = ref({
    registeredSubjects: [],
    onlineSubjects: [],
    teacherSubjects: [],
    products: [],
  });

  // ✅ Getters
  const getStoreItems = computed(() => ({
    setStoreItems: storeItems.value,
    lastPage: lastPage.value,
  }));

  const getShoppingCartItems = computed(() => shoppingCartItems.value);
  const getWishlistItems = computed(() => favorites.value);
  const getShowCash = computed(() => showCash.value);

  // ✅ Actions
  const getCart = async () => {
    try {
      const response = await axios.get("user/cart", {
        // headers: {
        //   Authorization: token.value ? `Bearer ${token.value}` : "",
        //   "Accept-language": userLang.value || "ar",
        //   "cache-control": "no-cache",
        //   Accept: "application/json",
        // },
      });

      shoppingCartItems.value = response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (payload) => {
    try {
      const theData = new FormData();
      theData.append("product_id", payload.id);
      theData.append("count", payload.count.toString());

      await axios.post("user/cart", theData, {
        // headers: {
        //   Authorization: token.value ? `Bearer ${token.value}` : "",
        //   "Accept-language": userLang.value || "ar",
        //   "cache-control": "no-cache",
        //   Accept: "application/json",
        // },
      });

      await getCart(); // ✅ Refresh cart after adding an item
      alert(t("MESSAGES.added_to_cart"));
    } catch (error) {
      alert(error.response?.data?.message || t("VALIDATION.error"));
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`user/cart/${productId}`, {
        // headers: {
        //   Authorization: token.value ? `Bearer ${token.value}` : "",
        //   "Accept-language": userLang.value || "ar",
        //   "cache-control": "no-cache",
        //   Accept: "application/json",
        // },
      });

      alert(t("MESSAGES.deleted_successfully"));
      await getCart(); // ✅ Refresh cart after removing an item
    } catch (error) {
      alert(error.response?.data?.message || t("VALIDATION.error"));
    }
  };

  const getProducts = async (page) => {
    try {
      const response = await axios.get(`user/product?page=${page}`, {
        // headers: {
        //   Authorization: token.value ? `Bearer ${token.value}` : "",
        //   "Accept-language": userLang.value || "ar",
        //   "cache-control": "no-cache",
        //   Accept: "application/json",
        // },
      });

      storeItems.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return {
    storeItems,
    lastPage,
    shoppingCartItems,
    showCash,
    favorites,
    getStoreItems,
    getShoppingCartItems,
    getWishlistItems,
    getShowCash,
    getCart,
    addToCart,
    removeFromCart,
    getProducts,
  };
});
