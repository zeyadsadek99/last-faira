<template>
  <div class="store-item-modal-wrapper">
    <BaseModal
      :show="modalApperanceData"
      @controleModalApperance="controleModalApperance"
    >
      <template #modal>
        <div class="selected-store-item-wrapper">
          <!-- ✅ Item Image -->
          <div class="image-wrapper">
            <img
              :src="selectedItem.product_image"
              alt="Store Item"
              class="object-cover rounded-lg w-44 h-44"
            />
            <span v-if="selectedItem.amount === 0" class="product-status">{{
              $t("STATUS.out_of_stock")
            }}</span>
          </div>

          <!-- ✅ Item Name -->
          <div class="name-wrapper">
            <h2 class="text-[2rem] font-medium   text-themeText">
              {{ selectedItem.name }}
            </h2>
          </div>

          <!-- ✅ Item Description -->
          <div class="desc-wrapper">
            <p class="text-[22px] text-lightGray">{{ selectedItem.desc }}</p>
          </div>

          <!-- ✅ Quantity Controls -->
          <div class="cart-btns-wrapper">
            <button
              class="increment"
              @click="incrementCartQuantity"
              :disabled="quantityInCart >= selectedItem.amount"
            >
              +
            </button>
            <span class="quantity-in-cart">{{ quantityInCart }}</span>
            <button
              class="decrement"
              @click="decrementCartQuantity"
              :disabled="quantityInCart === 0"
            >
              -
            </button>
          </div>

          <!-- ✅ Add to Cart & Wishlist Buttons -->
          <div class="add-to-cart-and-wishlist-btns-wrapper">
            <button
              class="add-to-cart-btn"
              @click="handleAddToCart"
              :disabled="quantityInCart === 0"
              aria-label="Add to cart"
            >
              {{ $t("BUTTONS.add_to_cart") }}
            </button>

            <button
              class="add-to-wishlist-btn"
              @click="favClick(selectedItem.id)"
              aria-label="Add to wishlist"
            >
              <i
                :class="
                  selectedItem.is_fav
                    ? 'fa-solid fa-heart '
                    : 'fa-solid fa-heart '
                "
              ></i>
            </button>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStoreWishlist } from "@/stores/storeModule"; // ✅ Import Pinia store
import BaseModal from "../global/BaseModal.vue";

const props = defineProps({
  modalApperanceData: Boolean,
  selectedItem: Object,
});

const emit = defineEmits(["controleModalApperance"]);

const store = useStoreWishlist();
const quantityInCart = ref(0);

const controleModalApperance = () => {
  emit("controleModalApperance");
};

const incrementCartQuantity = () => {
  if (quantityInCart.value < props.selectedItem.amount) {
    quantityInCart.value++;
  }
};

const decrementCartQuantity = () => {
  if (quantityInCart.value > 0) {
    quantityInCart.value--;
  }
};

const handleAddToCart = async () => {
  try {
    await store.addToCart({
      id: props.selectedItem.id,
      count: quantityInCart.value,
    });
    controleModalApperance();
    quantityInCart.value = 0;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const favClick = async (id) => {
  try {
    await store.toggleFavorite(id);
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};
</script>

<style scoped>
.selected-store-item-wrapper {
  @apply flex flex-col items-center space-y-3;
}

.image-wrapper {
  @apply relative transition-all duration-500;
}

.image-wrapper .product-status {
  @apply absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded-md;
}

.desc-wrapper {
  @apply text-center text-lg text-gray-600 leading-relaxed;
}

.cart-btns-wrapper {
  @apply flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg w-full;
}

.cart-btns-wrapper button {
  @apply text-xl font-bold text-gray-800 bg-gray-300 px-3 py-1 rounded-lg;
}

.cart-btns-wrapper .quantity-in-cart {
  @apply text-2xl font-semibold text-gray-800;
}

.add-to-cart-and-wishlist-btns-wrapper {
  @apply flex items-center gap-2 w-full;
}
.add-to-cart-btn {
  @apply relative inline-block w-full text-center mt-0 px-[20px] py-[5px] text-[25px] text-white no-underline  rounded-[10px] transition-all duration-[900ms] ease-in-out;
  border: 1px solid var(--main_theme_clr);
  background-image: linear-gradient(
    45deg,
    transparent 50%,
    var(--main_theme_clr) 50%
  );
  background-position: 100%;
  background-size: 400%;
}
.add-to-cart-btn:hover {
  background-position: 0;
  @apply text-mainTheme ;
}
.add-to-cart-btn:disabled {
  @apply opacity-50
}
/* .add-to-cart-btn {
    @apply w-full bg-blue-600 text-white text-lg font-bold py-2 rounded-lg transition hover:bg-blue-700;
  } */

.add-to-wishlist-btn {
  @apply w-[15%] h-10 flex items-center justify-center bg-softRed text-mainTheme rounded-[10px] py-[25px] m-0 transition hover:bg-red-200;
}
</style>
