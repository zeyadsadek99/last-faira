<template>
    <div class="chat-content-wrapper">
      <!-- ✅ MESSAGES BOX -->
      <div class="messages-box" v-chat-scroll="{ always: true, smooth: true }">
        <p class="start-of-chat">{{ t("TITLES.start_of_the_chat") }}</p>
  
        <!-- ✅ CHAT MESSAGES -->
        <div
          v-for="message in [...singleChatData.data].reverse()"
          :key="message.id"
          class="message-wrapper"
          :class="message.message_position === 'current' ? 'sender' : 'receiver'"
        >
          <p class="text-message-content" v-if="message.message_type === 'text'">
            {{ message.message }}
          </p>
  
          <div class="image-message-content" v-else-if="message.message_type === 'image'">
            <img :src="message.message" alt="Image Message" class="rounded-md shadow-md" />
          </div>
  
          <div class="file-message-content" v-else>
            <a :href="message.message" target="_blank" class="flex items-center gap-2">
              <i class="fal fa-file-alt text-lg text-mainTheme"></i>
              <span>{{ message.message.substring(0, 25) + "..." }}</span>
            </a>
          </div>
        </div>
      </div>
  
      <!-- ✅ CHAT INPUT -->
      <form @submit.prevent="sendChatMessage" class="chat-input-wrapper">
        <!-- ✅ SELECTED FILE PREVIEW -->
        <transition mode="fadeIn">
          <div class="selected-file-preview" v-if="filePreviewIsOpen">
            <p>{{ selectedMediaFile.name }}</p>
            <button type="button" class="close-file-preview" @click.stop="closeFilePreview">
              <i class="fal fa-times"></i>
            </button>
          </div>
        </transition>
  
        <!-- ✅ INPUT FIELD -->
        <div class="input-wrapper">
          <input
            type="text"
            class="form-control"
            :placeholder="t('PLACEHOLDERS.write_here')"
            v-model.trim="textMessageContent"
            :disabled="selectedMediaFile.file"
          />
  
          <!-- ✅ MEDIA BUTTONS -->
          <div class="media-buttons-wrapper">
            <div class="wrapper">
              <label for="select-media">
                <i class="fal fa-paperclip"></i>
              </label>
              <input
                id="select-media"
                type="file"
                accept=".jpg, .jpeg, .png, .doc, .docx, .pdf, .txt"
                @change="selectMediaFile"
              />
            </div>
  
            <!-- ✅ EMOJI BUTTON -->
            <button type="button" class="select-emoji">
              <EmojiPicker @emoji="append" />
            </button>
          </div>
        </div>
  
        <!-- ✅ SEND BUTTON -->
        <div class="send-btn">
          <button type="submit" class="send-message-btn">
            <i class="fal fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";
  import EmojiPicker from "vue-emoji-picker";
  import { useChatStore } from "@/stores/chat"; // Use Pinia Chat Store
  
  const { t } = useI18n();
  const route = useRoute();
  const chatStore = useChatStore();
  
  const receiverId = computed(() => route.params.id);
  const senderId = computed(() => useCookie("elmo3lm_elmosa3d_user_id").value);
  const singleChatData = computed(() => chatStore.singleChatData);
  
  const filePreviewIsOpen = ref(false);
  const textMessageContent = ref("");
  const selectedMediaFile = ref({ file: null, name: null, path: null, type: null });
  
  const closeFilePreview = () => {
    filePreviewIsOpen.value = false;
    selectedMediaFile.value = { file: null, name: null, path: null, type: null };
  };
  
  const selectMediaFile = (e) => {
    const file = e.target.files[0];
    selectedMediaFile.value = {
      file,
      name: file.name,
      path: URL.createObjectURL(file),
      type: file.type,
    };
    filePreviewIsOpen.value = true;
  };
  
  const sendChatMessage = async () => {
    const messageDetails = new FormData();
    messageDetails.append("sender_id", senderId.value);
    messageDetails.append("receiver_id", receiverId.value);
  
    if (textMessageContent.value && !selectedMediaFile.value.file) {
      messageDetails.append("message_type", "text");
      messageDetails.append("message", textMessageContent.value);
    } else if (selectedMediaFile.value.file) {
      messageDetails.append("message", selectedMediaFile.value.file);
      messageDetails.append("message_type", selectedMediaFile.value.type.includes("image") ? "image" : "file");
    }
  
    await chatStore.sendMessage({ messageDetails, id: receiverId.value });
    textMessageContent.value = "";
    closeFilePreview();
  };
  
  onMounted(() => {
    chatStore.getChatContent(receiverId.value);
  });
  </script>
  
  <style scoped>
  /* ✅ Tailwind Apply Styles */
  .chat-content-wrapper {
    @apply relative min-h-[80vh] max-h-[80vh] overflow-y-auto;
  }
  
  .start-of-chat {
    @apply my-2 text-center text-lg font-medium text-lightGray;
  }
  
  .messages-box {
    @apply min-h-[68vh] max-h-[68vh] overflow-y-auto;
  }
  
  .message-wrapper {
    @apply py-2 w-full flex items-center justify-start;
  }
  
  .sender .text-message-content {
    @apply max-w-[70%] relative p-3 text-lg bg-secondaryTheme rounded-2xl;
  }
  
  .receiver .text-message-content {
    @apply max-w-[70%] relative p-3 text-lg text-white bg-mainTheme rounded-2xl;
  }
  
  .chat-input-wrapper {
    @apply absolute bottom-4 w-full flex items-center justify-between gap-2;
  }
  
  .input-wrapper {
    @apply w-full bg-secondaryTheme rounded-2xl flex items-center justify-between;
  }
  
  .input-wrapper input {
    @apply bg-transparent border-0 p-3 text-lg text-themeText;
  }
  
  .media-buttons-wrapper {
    @apply flex items-center justify-center gap-4 px-4;
  }
  
  .media-buttons-wrapper i {
    @apply text-lg text-lightGray cursor-pointer;
  }
  
  .send-btn {
    @apply w-[10%];
  }
  
  .send-message-btn {
    @apply relative w-12 h-12 flex items-center justify-center rounded-full bg-mainTheme text-white;
  }
  </style>
  