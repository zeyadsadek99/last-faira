<template>
  <VeeField as="div" :name="name" v-slot="{ field, meta }">
    <label
      v-if="label"
      :for="id"
      class="mb-2 block"
      :class="meta.touched && !meta.valid ? 'text-red-500' : 'text-text'"
      >{{ label }}</label
    >
    <div class="relative flex items-center justify-between">
      <input
        :type="inputType"
        v-bind="field"
        :placeholder="placeholder"
        :autocomplete="name"
        :disabled="disabled"
        class="block h-[50px] w-full rounded-[8px] px-6 text-sm"
        :class="[
          meta.touched && !meta.valid
            ? 'border-red-500 text-red-500 placeholder:text-red-200 bg-card_color'
            : ' bg-card_color placeholder:text-text_dark',
          type === 'password' && '!pe-[50px]',
        ]"
      />
      {{ icon }}
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute end-[20px]"
        @click="inputType = inputType === 'text' ? 'password' : 'text'"
      >
        <!-- <nuxt-icon
            class="me-2 ms-2 text-xl md:text-xl"
            name="password"
            filled
          /> -->
        <ClientOnly>
          
          <font-awesome-icon
            :icon="['far', inputType === 'password' ? 'eye' : 'eye-slash']"
            :class="meta.touched && !meta.valid ? '!text-error' : 'text-text'"
            class="w-4"
          />
        </ClientOnly>
      </button>
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
const props = defineProps({
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
  type: {
    type: String,
    required: false,
    default: "text",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const inputType = ref(props.type || "text");
</script>
