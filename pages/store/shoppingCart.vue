<template>
    <div class="shopping-cart-wrapper">
      <!-- ✅ Breadcrumb -->
      <GlobalBreadCrumbs>
        <template #page_title>{{ $t("TITLES.cart") }}</template>
        <template #breadcrumb_current_page>{{ $t("TITLES.cart") }}</template>
      </GlobalBreadCrumbs>
  
      <!-- ✅ Loader -->
      <Loader1 v-if="isLoading" />
  
      <!-- ✅ Cart Content -->
      <div v-else class="fadeIn">
        <!-- ✅ Empty Cart Message -->
        <EmptyCartMessage v-if="shoppingCartItems.length === 0" />
  
        <!-- ✅ Cart Items & Financial Details -->
        <div v-else class="cart-content-wrapper">
          <div class="shopping-cart-content container mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- ✅ Cart Item -->
              <div v-for="item in shoppingCartItems" :key="item.id" class="cart-item-card">
                <div class="item-details">
                  <!-- ✅ Item Image -->
                  <div class="image-wrapper">
                    <img :src="item.product.product_image" :alt="item.product.name" class="rounded-lg" />
                  </div>
  
                  <div class="item-info">
                    <!-- ✅ Item Name & Quantity -->
                    <h3 class="name-and-quantity">
                      <span class="name">{{ item.product.name }}</span>
                      <span class="quantity">x{{ item.count }}</span>
                    </h3>
  
                    <!-- ✅ Item Price -->
                    <h3 class="price">{{ item.total }} {{ item.product.currency }}</h3>
                  </div>
                </div>
  
                <!-- ✅ Remove Button -->
                <button class="remove-item-btn" @click="removeFromCart(item.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
  
          <!-- ✅ Financial Summary -->
          <div class="shopping-cart-finance">
            <div class="container mx-auto">
              <div class="finance-summary">
                <div class="finance-line">
                  <h3>
                    <span class="title">{{ $t("TITLES.products_total") }}</span>
                    <span class="price">{{ cartPrice.main_total }} جنيه مصري</span>
                  </h3>
                </div>
  
                <div class="finance-line">
                  <h3>
                    <span class="title">{{ $t("TITLES.added_tax") }}</span>
                    <span class="price">{{ cartPrice.vat_value }}%</span>
                  </h3>
                </div>
  
                <div class="finance-line">
                  <h3>
                    <span class="title">{{ $t("TITLES.total") }}</span>
                    <span class="price">{{ cartPrice.total_with_vat }} جنيه مصري</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
  
          <!-- ✅ Checkout Button -->
          <div class="checkout-wrapper">
            <NuxtLink to="/checkout" class="checkout-btn">
              {{ $t("BUTTONS.next") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStoreWishlist } from "@/stores/storeModule";
  
  const store = useStoreWishlist();
  const isLoading = ref(true);
  
  const shoppingCartItems1 = computed(() => store.getShoppingCartItems?.data || []);
  const shoppingCartItems = computed(() => store.getCart?.data || []);
  const cartPrice = computed(() => store.getShoppingCartItems?.price || {});
  
  const removeFromCart = (id) => {
    store.removeFromCart(id);
  };
  
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  });
  </script>
  
  <style scoped>
  /* ✅ Cart Content Wrapper */
  .shopping-cart-wrapper {
    @apply py-8;
  }
  
  /* ✅ Cart Items */
  .shopping-cart-content {
    @apply py-8;
  }
  
  .cart-item-card {
    @apply p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg;
  }
  
  .item-details {
    @apply flex items-center gap-4;
  }
  
  .image-wrapper img {
    @apply w-24 h-24 object-cover rounded-lg;
  }
  
  .item-info .name-and-quantity {
    @apply flex items-center gap-3 text-lg font-semibold text-gray-900;
  }
  
  .item-info .price {
    @apply text-mainTheme font-bold text-xl;
  }
  
  /* ✅ Remove Button */
  .remove-item-btn {
    @apply w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full transition hover:bg-red-200;
  }
  
  .remove-item-btn i {
    @apply text-xl;
  }
  
  /* ✅ Financial Summary */
  .shopping-cart-finance {
    @apply py-6;
  }
  
  .finance-summary {
    @apply space-y-4;
  }
  
  .finance-line h3 {
    @apply flex justify-between text-lg font-semibold;
  }
  
  .finance-line .title {
    @apply text-gray-700;
  }
  
  .finance-line .price {
    @apply text-mainTheme text-xl font-bold;
  }
  
  /* ✅ Checkout Button */
  .checkout-wrapper {
    @apply flex justify-center py-6;
  }
  
  .checkout-btn {
    @apply text-white bg-blue-600 px-6 py-3 rounded-lg text-lg font-bold transition hover:bg-blue-700;
  }
  </style>
  