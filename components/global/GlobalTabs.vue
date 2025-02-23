<template>
    <div class="tabs-wrapper">
      <!-- ✅ Tabs Header -->
      <v-card flat class="tabs-card">
        <v-tabs v-model="activeTab" class="tabs-header" bg-color="themeBg">
          <v-tab
            v-for="item in tabsContent"
            :key="item.key_name"
            :value="item.key_name"
            @click="changeTab(item.key_name)"
            class="tab-button"
            :class="{ 'active-tab': activeTab === item.key_name }"
          >
            {{ item.tab }}
          </v-tab>
        </v-tabs>
  
        <!-- ✅ Tab Content -->
        <v-window v-model="activeTab">
          <v-window-item
            v-for="item in tabsContent"
            :key="item.key_name"
            :value="item.key_name"
          >
            <div class="tab-content">
              <slot :name="item.key_name"></slot>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  // Props
  const props = defineProps({
    tabsContent: {
      type: Array,
      required: true,
    },
  });
  
  // Emits
  const emit = defineEmits(["getItems"]);
  
  // Reactive Variables
  const activeTab = ref(null);
  
  // Change Active Tab
  const changeTab = (tab) => {
    activeTab.value = tab;
    emit("getItems", tab);
  };
  
  // Set Default Active Tab when `tabsContent` updates
  watch(
    () => props.tabsContent,
    (newTabs) => {
      if (newTabs?.length > 0 && !activeTab.value) {
        activeTab.value = newTabs[0].key_name;
        emit("getItems", newTabs[0].key_name); // Emit first tab by default
      }
    },
    { immediate: true, deep: true }
  );
  </script>
  
  <style scoped>
  /* ✅ Wrapper */
  .tabs-wrapper {
    @apply w-full bg-themeBg;
  }
  
  /* ✅ Vuetify Card Wrapper */
  .tabs-card {
    @apply bg-themeBg rounded-lg shadow-md border  border-secondaryTheme;
  }
  
  /* ✅ Tabs Header */
  .tabs-header {
    @apply  border-secondaryTheme justify-center bg-themeBg;
  }
  
  /* ✅ Tab Button */
  .tab-button {
    @apply text-themeSecondaryText text-lg font-semibold pb-2 border-b-2 border-transparent transition-all duration-300 cursor-pointer;
  }
  
  /* ✅ Tab Button - Active */
  .active-tab {
    @apply border-mainTheme text-mainTheme font-bold;
  }
  
  /* ✅ Tab Content */
  .tab-content {
    @apply py-6;
  }
  </style>
  