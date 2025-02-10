<template>
  <div class="search_content_wrapper">
    <!-- START:: OVERLAY -->
    <div class="search_overlay" @click="closeSearch"></div>
    <!-- END:: OVERLAY -->

    <!-- START:: SEARCH CONTENT -->
    <div class="container">
      <!-- START:: SEARCH FORM -->
      <form @submit.prevent="validateSearchForm">
        <div class="row justify-content-center fadeIn">
          <!-- START:: SEARCH TEXT INPUT -->
          <div class="col-8 col-md-10 my-3">
            <div class="input_wrapper">
              <input
                @keyup.enter="validateSearchForm"
                type="text"
                class="form-control"
                :placeholder="t('PLACEHOLDERS.write_here')"
                v-model="searchData.text"
              />
            </div>
          </div>
          <!-- END:: SEARCH TEXT INPUT -->

          <!-- START:: SEARCH TYPE INPUT -->
          <div class="col-4 col-md-2 my-3">
            <div class="input_wrapper select_wrapper">
              <Multiselect
                @keyup.enter="validateSearchForm"
                v-model="searchData.type"
                track-by="value"
                label="type"
                :placeholder="t('PLACEHOLDERS.search_type')"
                :options="searchTypes"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
              />
            </div>
          </div>
          <!-- END:: SEARCH TYPE INPUT -->
        </div>
      </form>
      <!-- END:: SEARCH FORM -->
    </div>
    <!-- END:: SEARCH CONTENT -->
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Multiselect from "@vueform/multiselect";

// ✅ Define Emits
const emit = defineEmits(["closeSearch"]);

// ✅ i18n Setup
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// ✅ Search Data
const searchData = ref({
  text: null,
  type: null,
});

// ✅ Search Types
const searchTypes = computed(() => [
  { id: 1, type: t("PLACEHOLDERS.teacher"), value: "teacher" },
  { id: 2, type: t("PLACEHOLDERS.subject"), value: "subject_name" },
]);

// ✅ Close Search Overlay
const closeSearch = () => {
  emit("closeSearch");
};

// ✅ Validate Search Form
const validateSearchForm = () => {
  if (!searchData.value.text) {
    showToast("VALIDATION.textSearch");
    return;
  }
  if (!searchData.value.type) {
    showToast("VALIDATION.typeSearch");
    return;
  }
  submitSearchForm();
};

// ✅ Show Error Toast
const showToast = (messageKey) => {
  useNuxtApp().$iziToast.error({
    timeout: 2000,
    message: t(messageKey),
    messageSize: "22",
    position: t("iziToastConfigs.position"),
    rtl: t("iziToastConfigs.dir"),
  });
};

// ✅ Submit Search Form
const submitSearchForm = () => {
  const type = searchData.value.type.value;
  const text = searchData.value.text;

  router.push(`/search-result/${type}/${text}`);

  if (
    route.name === "search_result_subject_name" ||
    route.name === "search_result_teacher"
  ) {
    location.reload();
  }

  closeSearch();
};
</script>

<style scoped>
/* Add your styles here */
</style>
