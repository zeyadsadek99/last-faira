<template>
  <VeeField
    name="phone_code"
    v-slot="{ field, meta }"
    v-if="allCountries && allCountries.length"
  >
    <div class="absolute top-[0.5px] end-0">
      <Listbox
        v-slot="{ open }"
        v-model="selected"
        :disabled="countriesLoading || disabled"
      >
        <div :class="countriesLoading && 'opacity-60'">
          <ListboxButton
            class="relative h-[50px] overflow-hidden rounded-[15px]"
          >
            <div class="flex items-center border-s border-[#101624]">
              <span
                class="block truncate !pe-[10px] ps-5 text-start text-sm font-semibold"
                :class="selected ? 'text-text' : 'text-title'"
                :title="selected ? selected.key : ''"
                >{{
                  selected ? selected.key : $t("FORMS.Placeholders.phoneCode")
                }}
                +
              </span>
              <img
                v-if="selected"
                :src="selected.flag"
                class="h-[20px] w-[50px] object-contain"
                :alt="`${selected.name}-image`"
                @error="handleImageError"
              />
            </div>
          </ListboxButton>

          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-[1010] max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              v-bind="field"
            >
              <ListboxOption
                as="template"
                v-slot="{ active, selected }"
                v-for="country in allCountries"
                :key="country.id"
                :value="country"
              >
                <li
                  class="cursor relative cursor-pointer select-none border-b border-border px-4 py-2 duration-300 last-of-type:border-none"
                  :class="{
                    'bg-teal-600 text-primary': active,
                    'text-text': !active,
                  }"
                >
                  <div class="flex items-center gap-2">
                    <span class="block text-sm font-medium"
                      >{{ country.key }}+</span
                    >
                    <img
                      :src="country.flag"
                      class="h-[20px] w-[50px] object-contain"
                      :alt="`${country.name}-image`"
                      @error="handleImageError"
                    />
                  </div>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center"
                    :class="{ 'text-primary': active, 'text-text': !active }"
                  />
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>
  </VeeField>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
import { useField } from "vee-validate";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import axios from "axios";
const phoneCodeField = useField("phone_code");
const config = useRuntimeConfig();
/* Start of the function that get all countries */
const allCountries = ref([]);
const selected = ref(null);
const countriesLoading = ref(false);
async function getAllCountries() {
  countriesLoading.value = true;
  await axios
    .get(`${config.public.general}countries`)
    .then((res) => {
      allCountries.value = res.data.data;
      if (allCountries.value) {
        selected.value = res.data.data[0];

        phoneCodeField.setValue(selected.value.id);

      }
    })
    .catch((e) => console.error(e))
    
    .finally(() => (countriesLoading.value = false));
}
/* End of the function that get all countries */
onMounted(() => {
  getAllCountries();
});
</script>
