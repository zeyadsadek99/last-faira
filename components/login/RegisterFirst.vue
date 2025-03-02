<template>
  <div class="auth-wrapper flex flex-col items-center justify-center w-full">
    <div class="first_step_form_wrapper w-1/2">
      <!-- ✅ FORM TITLE -->
      <div class="form-title-wrapper">
        <NuxtLink to="/" class="logo-wrapper">
          <img src="/logo.svg" alt="App Logo" class="w-36 h-28 mx-auto" />
        </NuxtLink>
        <h2 class="form-title text-[32px] font-extrabold">
          {{ t("TITLES.register") }}
        </h2>
        <h3 class="form-subtitle text-3xl">
          {{ t("TITLES.register_welcome") }}
        </h3>
      </div>

      <!-- ✅ FORM -->
      <div class="form-wrapper h-auto overflow-visible overflow-x-hidden py-8">
        <VeeForm
          @submit="submitRegisterForm"
          :validation-schema="schema"
          class="space-y-6"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <!-- ✅ Username & Mobile -->
          <div class="grid grid-cols-2 gap-6">
            <InputsText
              id="username"
              name="username"
              :placeholder="t('PLACEHOLDERS.user_name')"
              class="w-full"
            />
            <InputsPhone
              id="mobile"
              name="mobile"
              :placeholder="t('PLACEHOLDERS.phone')"
              class="w-full"
            />
          </div>

          <!-- ✅ City Selection (Dropdown) -->
          <div class="relative w-10">
            <Combobox>
              <div class="relative">
                <Combobox.Button
                  class="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-mainTheme"
                >
                  <span class="block truncate">
                    {{ formData.city?.name || t("PLACEHOLDERS.city") }}
                  </span>
                  <ChevronDownIcon class="w-5 h-5 text-gray-500" />
                </Combobox.Button>

                <Transition
                  enter="transition ease-out duration-100"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <Combobox.Options
                    class="absolute mt-2 w-full max-h-60 overflow-auto bg-white shadow-lg rounded-md z-10"
                  >
                    <Combobox.Option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city"
                      v-slot="{ active, selected }"
                      as="template"
                    >
                      <li
                        :class="[
                          'cursor-pointer select-none relative px-4 py-2',
                          active ? 'bg-mainTheme text-white' : 'text-gray-900',
                          selected ? 'font-semibold' : 'font-normal',
                        ]"
                      >
                        {{ city.name }}
                      </li>
                    </Combobox.Option>
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
          <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="(person) => person.name"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredPeople.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="person in people"
              as="template"
              :key="person.id"
              :value="person"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
          <!-- <InputsBase
            id="city"
            name="city"
            :placeholder="$t('PLACEHOLDERS.city')"
            type="select"
            :options="cities"
          >
          </InputsBase> -->
          <!-- ✅ Password & Confirm Password -->
          <div class="grid grid-cols-2 gap-4">
            <InputsText
              id="password"
              name="password"
              type="password"
              :placeholder="$t('PLACEHOLDERS.password')"
              class="w-full"
            />
            <InputsText
              id="confirm_password"
              name="confirm_password"
              type="password"
              :placeholder="t('PLACEHOLDERS.confirm_password')"
              class="w-full"
            />
          </div>

          <!-- ✅ Gender Selection (Radio Buttons) -->
          <div class="flex items-center gap-8">
            <!-- Male Option -->
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                v-model="formData.gender"
                class="hidden"
              />
              <span
                class="size-6 rounded-full flex items-center justify-center transition-all"
                :class="
                  formData.gender === 'male'
                    ? 'border-mainTheme bg-mainTheme'
                    : 'bg-themeInputs'
                "
              ></span>
              <span class="text-2xl">{{ t("PLACEHOLDERS.male") }}</span>
            </label>

            <!-- Female Option -->
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                v-model="formData.gender"
                class="hidden"
              />
              <span
                class="size-6 rounded-full flex items-center justify-center transition-all"
                :class="
                  formData.gender === 'female'
                    ? 'border-mainTheme bg-mainTheme'
                    : 'bg-themeInputs'
                "
              ></span>
              <span class="text-2xl">{{ t("PLACEHOLDERS.female") }}</span>
            </label>
          </div>

          <!-- ✅ Submit Button -->
          <InputsButton
            :disabled="loading"
            type="submit"
            :name="t('BUTTONS.submit')"
            class="w-full relative px-[12px] py-[6px] border-1 !border-mainTheme rounded-[10px] text-[22px] font-semibold text-white no-underline ease-in-out duration-700 hover:text-mainTheme"
            style="
              background: linear-gradient(
                45deg,
                transparent 50%,
                var(--main_theme_clr) 50%
              );
              background-position: 100%;
              background-size: 400%;
            "
          />
        </VeeForm>
        <NuxtLink to="/login" class="register_route mt-0">
          <span>{{ $t("BUTTONS.have_account") }}</span>
          <span> {{ $t("BUTTONS.login") }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
//   import { ChevronDownIcon } from "@heroicons/vue/solid";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { useAuthenticationStore } from "~/stores/authentication"; //
const authStore = useAuthenticationStore();
const router = useRouter();
const axios = useNuxtApp().$axios;
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

// const people = [
//   { id: 1, name: 'Wade Cooper' },
//   { id: 2, name: 'Arlene Mccoy' },
//   { id: 3, name: 'Devon Webb' },
//   { id: 4, name: 'Tom Cook' },
//   { id: 5, name: 'Tanya Fox' },
//   { id: 6, name: 'Hellen Schmidt' },
// ]

let selected = ref(people[0])
let query = ref('')

// let filteredPeople = computed(() =>
//   query.value === ''
//     ? people
//     : people.filter((person) =>
//         person.name
//           .toLowerCase()
//           .replace(/\s+/g, '')
//           .includes(query.value.toLowerCase().replace(/\s+/g, ''))
//       )
// )
const { t } = useI18n();
const toast = useToast();

const loading = ref(false);

const formData = ref({
  username: "",
  mobile: "",
  city: null, // Ensure it's initialized
  password: "",
  confirm_password: "",
  gender: "",
});

const people = ref([
  { id: 1, name: "Riyadh" },
  { id: 2, name: "Jeddah" },
  { id: 3, name: "Dammam" },
]);

// const schema = yup.object({
//   username: yup
//     .string()
//     .required(t("ERRORS.isRequired", { name: t("LABELS.username") })),
//   mobile: yup
//     .string()
//     .matches(/^[0-9]{10}$/, t("ERRORS.invalidPhone"))
//     .required(t("ERRORS.isRequired", { name: t("LABELS.phone") })),
//   city: yup
//     .object()
//     .nullable()
//     .required(t("ERRORS.isRequired", { name: t("LABELS.city") })),
//   password: yup
//     .string()
//     .min(6, t("ERRORS.password_length"))
//     .required(t("ERRORS.isRequired", { name: t("LABELS.password") })),
//   confirm_password: yup
//     .string()
//     .oneOf([yup.ref("password"), null], t("ERRORS.passwords_must_match"))
//     .required(t("ERRORS.isRequired", { name: t("LABELS.confirm_password") })),
//   gender: yup
//     .string()
//     .required(t("ERRORS.isRequired", { name: t("LABELS.gender") })),
// });

const submitRegisterForm = async (values) => {
  console.log(values);
  loading.value = true;
  const theData = new FormData();
  // START:: APPEND STATIC DATA
  theData.append("type", "ios");
  theData.append("device_token", "static_device_token");
  // END:: APPEND STATIC DATA

  // START:: APPEND GENERAL DATA
  theData.append("fullname", values.userName);
  theData.append("country_id", values.phone_code);
  theData.append("phone", values.mobile);
  theData.append("city_id", values.city.id);
  theData.append("password", values.password);
  theData.append("password_confirmation", values.confirm_password);

  try {
    // ✅ Send Login Request
    const res = await axios.post("teacher/register", theData);

    loading.value = false;

    toast.success(t("VALIDATION.register_success"));

    authStore.profile = res?.data?.data;

    useCookie("elmo3lm_elmosa3d_user_token").value =
      res.data.data.token.access_token;
    useCookie("elmo3lm_elmosa3d_user_type").value = res.data.data.user_type;
    useCookie("elmo3lm_elmosa3d_user_id").value = res.data.data.id;
    useCookie("elmo3lm_elmosa3d_user_avatar").value =
      res.data.data.profile_image;

    router.push("/registerSecond");
    //  for Students
    // if (res.data.data?.user_type === "student") {
    //   useCookie(
    //     "elmo3lm_elmosa3d_student_parent_phone",
    //     res.data.data?.child_parent?.parent?.phone,
    //     { path: "/" }
    //   );
    //   useCookie(
    //     "elmo3lm_elmosa3d_student_parent_key",
    //     JSON.stringify(res.data.data?.child_parent?.parent?.country),
    //     { path: "/" }
    //   );
    // }

    // clearLoginFormData();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  } catch (err) {
    loading.value = false;
    console.error(err);

    // ✅ Show Error Message with Vue Toastification
    toast.error(err.response?.data?.message || t("VALIDATION.login_failed"));
  }
};
</script>

<style scoped>
/* ✅ Authentication Wrapper */
.auth-wrapper {
  @apply flex flex-col items-center justify-center w-full;
}
/* input,
textarea,
select {
  @apply border-none p-3 text-[20px] text-themeText bg-themeInputs rounded-xl;
} */
.policy_title {
  margin-bottom: 0;
  font-size: 20px;
  color: var(--theme_text_clr);
  text-align: center;
}
.policy_title span,
.policy_title button {
  font-size: 20px;
  color: var(--main_theme_clr);
  font-family: "ArbFONTS-Somar-SemiBold";
}
/* ✅ Focus Styling */
input:focus,
textarea:focus,
select:focus {
  @apply outline-none bg-themeInputs shadow-none;
}

/* ✅ Placeholder Styling */
input::placeholder,
textarea::placeholder,
select::placeholder {
  @apply text-lightGray;
}

/* ✅ Read-Only Styling */
input:read-only,
textarea:read-only,
select:read-only {
  @apply bg-themeInputs;
}

/* ✅ Textarea Scrollbar */
textarea::-webkit-scrollbar {
  @apply w-2.5;
}

textarea::-webkit-scrollbar-track {
  @apply bg-themeBg;
}

textarea::-webkit-scrollbar-thumb {
  @apply bg-mainTheme border-2 border-themeBg rounded-xl;
}

.btn {
  @apply relative cursor-pointer inline-block w-[150px] text-center text-[25px] text-white 
           border border-mainTheme rounded-lg px-5 py-2 mt-4 
            
           transition-all duration-[600ms] ease-in-out;
  background-image: linear-gradient(
    45deg,
    transparent 50%,
    var(--main_theme_clr) 50%
  );
  background-position: 100%;
  background-size: 400%;
}

/* ✅ Loader Inside Button */
.btn .btn-loader {
  @apply absolute left-4 top-1/3 w-5 h-5 p-0.5 
           border-[3px] border-dotted border-white 
              
           rounded-full inline-block animate-spin transition-all duration-[400ms] ease-in-out;
  border-left: dotted;
  border-bottom: dotted;
}

/* ✅ Hover Effects */
.btn:hover {
  @apply bg-left text-mainTheme;
}

.btn:hover .btn-loader {
  @apply border-mainTheme;
}

/* ✅ Disabled Button */
.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* ✅ Keyframes Animation */
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ✅ Form Title Wrapper */
.form-title-wrapper {
  @apply h-[45vh] flex flex-col items-center justify-center gap-2;
}

.form-title,
.form-subtitle {
  @apply text-center text-themeText m-0;
}

.form-title a,
.form-subtitle a {
  @apply text-mainTheme;
}

.form-title {
  @apply font-bold;
}

.form-subtitle {
  @apply opacity-60;
}

.form-subtitle.edit-phone-number {
  @apply opacity-100 text-mainTheme;
}

.form-subtitle.edit-phone-number a {
  @apply ms-4 text-mainTheme;
}

/* ✅ Form Wrapper */
.form-wrapper {
  @apply overflow-x-hidden py-8;
}

/* ✅ Hide Scrollbar */
.form-wrapper::-webkit-scrollbar {
  @apply w-0;
}

/* ✅ Input Styling */
.input-wrapper {
  @apply flex items-center bg-themeInputs px-4 py-2 rounded-lg w-full;
}

.input-wrapper input {
  @apply w-full bg-white outline-none;
}

/* ✅ Forget Password Link */
.forget-pass-route {
  @apply block text-center text-[22px] font-semibold text-midRed no-underline;
}

/* ✅ Register Route */
.register-route {
  @apply mt-5 text-[22px] block text-center no-underline;
}

.register-route span {
  @apply text-[22px] text-lightGray;
}

.register-route span:last-of-type {
  @apply text-mainTheme font-semibold;
}

/* ✅ Submit Button */
.btn-primary {
  @apply bg-mainTheme text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition;
}

.btn-primary .loader {
  @apply w-5 h-5 border-2 border-white rounded-full animate-spin ml-2;
  border-top: transparent;
}
.contact_us_section_wrapper .info_wrapper p {
  @apply flex items-center justify-start gap-6; /* Column gap: 25px */
}

.contact_us_section_wrapper .info_wrapper p span,
.contact_us_section_wrapper .info_wrapper p a {
  @apply text-[22px] text-themeText;
}

.contact_us_section_wrapper .info_wrapper p svg {
  @apply text-[22px] text-mainTheme;
}

.contact_us_section_wrapper .info_wrapper p span svg,
.contact_us_section_wrapper .info_wrapper p a svg {
  @apply text-mainTheme;
}

/* .contact_us_section_wrapper .info_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 15px;
  } */
.social-btn {
  @apply inline-flex w-10 h-10 items-center justify-center rounded-full
            
           transition-all duration-[600ms] ease-in-out;
  background-image: linear-gradient(
    45deg,
    transparent 50%,
    var(--main_theme_clr) 50%
  );
  background-position: 100%;
  background-size: 400%;
}

/* ✅ Social Media Icon */
.social-btn svg {
  @apply text-[23px] text-white transition-all duration-[600ms] ease-in-out;
}

/* ✅ Hover Effects */
.social-btn:hover {
  @apply bg-[0%];
}

.social-btn:hover svg {
  @apply text-mainTheme;
}

/* ✅ Responsive Adjustments */
@media (max-width: 767px) {
  .form-title-wrapper {
    @apply h-[31vh];
  }

  .form-wrapper {
    @apply h-[69vh];
  }
}
</style>
