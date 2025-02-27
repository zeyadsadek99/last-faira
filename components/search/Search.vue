<template>
  <div class="search_content_wrapper">
    <!-- ✅ START:: OVERLAY -->
    <div class="search_overlay" @click="closeSearch"></div>
    <!-- ✅ END:: OVERLAY -->

    <!-- ✅ START:: SEARCH CONTENT -->
    <div class="container ">
      <form @submit.prevent="validateSearchForm">
        <div
          class="flex flex-col md:flex-row items-center justify-center  fadeIn"
        >
          <!-- ✅ SEARCH TEXT INPUT -->
          <div class="w-full my-3 md:w-5/6">
            <div class="input_wrapper">
              <input
                type="text"
                class="w-full p-3 border-none text-lg text-themeText bg-themeInputs  rounded-2xl focus:outline-none focus:ring-2 focus:ring-mainTheme"
                :placeholder="t('PLACEHOLDERS.write_here')"
                v-model="searchData.text"
                @keyup.enter="validateSearchForm"
              />
            </div>
          </div>

          <!-- ✅ SEARCH TYPE INPUT -->
          <div class="w-full my-3 md:w-1/6">
            <div class="input_wrapper select_wrapper">
              <Multiselect
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
        </div>
      </form>
    </div>
    <!-- ✅ END:: SEARCH CONTENT -->
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();
const emit = defineEmits(["closeSearch"]);

const searchTypes = ref([
  { id: 1, type: t("PLACEHOLDERS.teacher"), value: "teacher" },
  { id: 2, type: t("PLACEHOLDERS.subject"), value: "subject_name" },
]);

const searchData = ref({
  text: "",
  type: null,
});

// ✅ Close Search Overlay
const closeSearch = () => {
  emit("closeSearch");
};

// ✅ Validate Search Inputs
const validateSearchForm = () => {
  if (!searchData.value.text) {
    toast.error(t("VALIDATION.textSearch"));
    return;
  }
  if (!searchData.value.type) {
    toast.error(t("VALIDATION.typeSearch"));
    return;
  }
  submitSearchForm();
};

// ✅ Handle Search Submission
const submitSearchForm = () => {
  const searchType = searchData.value.type.value;
  const searchText = searchData.value.text;

  router.push(`/search-result/${searchType}/${searchText}`);

  if (router.currentRoute.value.name.includes("search_result")) {
    location.reload();
  }
  closeSearch();
};
</script>

<style scoped>
/* ✅ Search Content Wrapper inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50 */
.search_content_wrapper {
  @apply relative;
}

/* ✅ Overlay */
.search_overlay {
  @apply fixed inset-0;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
}

/* ✅ Input Wrapper */
.input_wrapper {
  @apply relative;
}

/* ✅ Search Form */
form {
  @apply w-[90%]  left-1/2 absolute top-0  -translate-x-1/2	 z-[11];

}
</style>
