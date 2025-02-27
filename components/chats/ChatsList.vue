<template>
  <div class="chats-list-wrapper">
    <!-- START:: EMPTY CHATS LIST MESSAGE -->
    <MessagesCourseEmpty
      v-if="chatsListData.length === 0"
      :imageSrc="image1"
      :message="$t('TITLES.empty_chats')"
    />
    <!-- END:: EMPTY CHATS LIST MESSAGE -->

    <!-- START:: CHAT ROUTE -->
    <template v-else>
      <div v-for="chat in chatsListData" :key="chat.id">
        <!-- START:: CHAT SKELETON LOADER -->
        <ChatCardSkeletonLoader v-if="isLoading" />
        <!-- END:: CHAT SKELETON LOADER -->

        <!-- START:: CHAT CARD -->
        <NuxtLink :to="`/chat/${chat.user_data.id}`" class="chat-route">
          <!-- START:: AVATAR -->
          <div class="avatar-wrapper">
            <img :src="chat.user_data.image" class="avatar-img" />
          </div>
          <!-- END:: AVATAR -->

          <!-- START:: MESSAGE DETAILS -->
          <div class="message-details">
            <!-- START:: NAME AND DATE -->
            <h3 class="name-and-date">
              <span class="name">{{ chat.user_data.fullname }}</span>
              <span class="date">{{ chat.ago_time }}</span>
            </h3>
            <!-- END:: NAME AND DATE -->

            <!-- START:: LAST MESSAGE -->
            <div class="last-message">{{ chat.last_message }}</div>
            <!-- END:: LAST MESSAGE -->
          </div>
          <!-- END:: MESSAGE DETAILS -->
        </NuxtLink>
        <!-- END:: CHAT CARD -->
      </div>
    </template>
    <!-- END:: CHAT ROUTE -->
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/chat"; // ✅ Using Pinia
import image1 from "/assets/media/empty_messages/select_message.png";

const axios = useNuxtApp().$axios;

// ✅ Pinia Store
const chatStore = useChatStore();

// ✅ State
const isLoading = ref(true);
const chatsListData = computed(() => chatStore.getChatsList);

// ✅ Fetch Chats on Component Mount
// onMounted(async () => {
//   await chatStore.getChatsList();
//   isLoading.value = false;
// });
</script>

<style scoped>
/* ✅ Chats List Wrapper */
.chats-list-wrapper {
  @apply min-h-[80vh] max-h-[80vh] overflow-y-scroll px-4 border-r border-secondaryTheme;
}
.chats-list-wrapper::-webkit-scrollbar {
  @apply w-0;
}

/* ✅ Chat Route */
.chat-route {
  @apply flex items-center gap-3 p-3 my-3 rounded-lg transition-all duration-300;
}
.chat-route:hover,
.chat-route.router-link-exact-active {
  @apply bg-secondaryTheme;
}

/* ✅ Avatar */
.avatar-wrapper img {
  @apply w-20 h-20 object-cover rounded-full;
}

/* ✅ Message Details */
.message-details {
  @apply flex flex-col justify-start w-full whitespace-nowrap overflow-hidden text-ellipsis;
}

/* ✅ Name & Date */
.name-and-date {
  @apply flex items-center justify-between mb-1 gap-4 flex-wrap;
}
.name-and-date .name {
  @apply text-themeText text-xl font-semibold;
}
.name-and-date .date {
  @apply text-lightGray text-lg;
}

/* ✅ Last Message */
.last-message {
  @apply text-lightGray text-lg whitespace-nowrap overflow-hidden text-ellipsis;
}

/* ✅ Mobile Adjustments */
@media (max-width: 767px) {
  .chats-list-wrapper {
    @apply border-none;
  }
}
</style>
