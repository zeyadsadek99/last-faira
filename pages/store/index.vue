<template>
  <div class="store-wrapper">
    <!-- ✅ Breadcrumb -->
    <GlobalBreadCrumbs>
      <template #page_title>{{ $t("TITLES.store") }}</template>
      <template #breadcrumb_current_page>{{ $t("TITLES.store") }}</template>
    </GlobalBreadCrumbs>

    <!-- ✅ Main Loader -->
    <Loader1 v-if="isLoading" />

    <!-- ✅ Store Content -->
    <div v-else class="store-items-wrapper fadeIn">
      <div class="container mx-auto">
        <EmptyStoreMessage v-if="storeItems.length === 0" />
        <div v-else class="flex flex-wrap justify-center items-center gap-8">
          <!-- ✅ Store Item Card -->
          <div
            v-for="item in storeItems"
            :key="item.id"
            class="flex justify-center"
          >
            <button
              @click="toggleStoreItemModal(item)"
              class="store-item-card w-full max-w-[300px]"
            >
              <!-- ✅ Item Image -->
              <div class="item-image-wrapper">
                <img
                  :src="item?.product_image"
                  alt="Store Item"
                  class="w-full h-40 object-contain rounded-lg"
                />
              </div>

              <!-- ✅ Item Name -->
              <div class="item-name">
                <h3>{{ item.name }}</h3>
              </div>

              <!-- ✅ Item Price -->
              <div class="item-price">
                <h3>{{ item.price }} {{ item.currency }}</h3>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- ✅ Pagination -->
      <GlobalPagination
        :last_page="lastPage"
        :current_page="currentPage"
        @pagenationClick="pagenationClick"
      />
    </div>
    <!-- ✅ Store Item Modal -->
    <StoreItemModal
      :modalApperanceData="storeItemModalIsOpen"
      :selectedItem="selectedStoreItem"
      @controleModalApperance="toggleStoreItemModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStoreWishlist } from "@/stores/storeModule";
import StoreItemModal from "~/components/store/StoreItemModal.vue";

const store = useStoreWishlist();
const isLoading = ref(true);
const storeItemModalIsOpen = ref(false);
const selectedStoreItem = ref(null);
const currentPage = ref(1);

const storeItems = computed(() => store.getStoreItems.setStoreItems);
const lastPage = computed(() => store.lastPage);

const toggleStoreItemModal = (item = null) => {
  storeItemModalIsOpen.value = !storeItemModalIsOpen.value;

  if (!storeItemModalIsOpen.value) {
    // ✅ Reset selectedItem when modal closes
    selectedStoreItem.value = null;
  } else {
    selectedStoreItem.value = item;
  }
};


const pagenationClick = (pageNum) => {
  currentPage.value = pageNum;
  store.getProducts(currentPage.value);
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    store.getProducts(currentPage.value);
  }, 1000);
});
</script>

<style scoped>
/* ✅ Store Wrapper */
.store-wrapper {
  @apply py-8;
}

/* ✅ Store Items Wrapper */
.store-items-wrapper {
  @apply py-8;
}

/* ✅ Store Item Card */
.store-item-card {
  @apply p-6 border border-gray-300 rounded-lg shadow-md transition hover:shadow-lg;
}

/* ✅ Item Image Wrapper */
.store-item-card .item-image-wrapper {
  @apply w-60 h-60 mx-auto transform transition-transform hover:scale-105; /* Increased width & height */
}

/* ✅ Item Name */
.store-item-card .item-name h3 {
  @apply mt-4 text-center text-[25px] font-bold text-gray-900; /* Increased font size */
}

/* ✅ Item Price */
.store-item-card .item-price h3 {
  @apply text-center text-2xl font-extrabold text-mainTheme; /* Increased font size & weight */
}
</style>
