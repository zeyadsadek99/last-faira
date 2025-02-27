<template :key="$route.path">
    <div class="chats_wrapper">
      <!-- ✅ START:: BREADCRUMB -->
      <GlobalBreadCrumbs>
        <template v-slot:page_title>{{ t("TITLES.messages") }}</template>
        <template v-slot:breadcrumb_current_page>{{ t("TITLES.messages") }}</template>
      </GlobalBreadCrumbs>
      <!-- ✅ END:: BREADCRUMB -->
  
      <div class="chats_content_wrapper container">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/3" v-if="showChatsList">
            <ChatsList @openChat="handleOpenChat" />
          </div>
  
          <div class="md:w-2/3" v-if="showChatContent">
            <ChatContent @back="handleBackToList" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

//   import Breadcrumb from "../components/structure/TheBreadcrumb.vue";
//   import ChatList from "../components/chat/ChatList.vue";
//   import ChatContent from "../components/chat/ChatContent.vue";
//   import { useI18n } from "vue-i18n";
  
  const { t } = useI18n();
  const route = useRoute();
  const showChatsList = ref(true);
  const showChatContent = ref(false);
  
  // ✅ Detects if the route contains a specific chat ID
  const isChatOpen = computed(() => !!route.params.id);
  
  watch(isChatOpen, (newValue) => {
    showChatsList.value = !newValue;
    showChatContent.value = newValue;
  });
  
  onMounted(() => {
    handleMediaQueries();
  });
  
  // ✅ Handles media queries for mobile screens
  const handleMediaQueries = () => {
    if (window.innerWidth <= 767) {
      showChatsList.value = !isChatOpen.value;
      showChatContent.value = isChatOpen.value;
    }
  };
  
  // ✅ Show chat content when a chat is opened
  const handleOpenChat = () => {
    if (window.innerWidth <= 767) {
      showChatsList.value = false;
      showChatContent.value = true;
    }
  };
  
  // ✅ Show chat list when back is clicked
  const handleBackToList = () => {
    if (window.innerWidth <= 767) {
      showChatsList.value = true;
      showChatContent.value = false;
    }
  };
  </script>
  