<template>
  <VeeField as="div" :name="name" v-slot="{ field, meta }">
    <label
      v-if="label"
      :for="id"
      class="mb-2 block"
      :class="meta.touched && !meta.valid ? 'text-red-500' : 'text-text'"
      >{{ label }}</label
    >
    <div class="relative">
      <PhoneCode :disabled="disabled" />
      <input
        v-bind="field"
        :disabled="disabled"
        :placeholder="placeholder"
        class="block h-[50px] w-full rounded-[8px] px-6 text-sm"
        :class="
          meta.touched && !meta.valid
            ? 'border-red-500 text-red-500 placeholder:text-red-200 bg-card_color'
            : 'bg-card_color placeholder:text-text_dark'
        "
      />
    </div>
    <VeeErrorMessage
      v-if="meta.touched && !meta.valid"
      :name="name"
      as="p"
      class="mt-2 px-3 text-sm text-red-500"
    />
  </VeeField>
</template>
<script setup>
import PhoneCode from "./PhoneCode.vue";
defineProps({
  id: {
    type: String,
    required: true,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: true,
    default: null,
  },
  name: {
    type: String,
    required: true,
    default: null,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
