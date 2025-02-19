<template>
  <div class="auth-wrapper flex flex-col items-center justify-center w-full">
    <!-- ✅ START:: FORM TITLE -->
    <div class="form-title-wrapper">
      <!-- ✅ LOGO -->
      <NuxtLink to="/" class="logo-wrapper">
        <img src="/logo.svg" alt="App Logo" class="w-36 h-28 mx-auto" />
      </NuxtLink>

      <!-- ✅ TITLES -->
      <h2 class="form-title text-[32px] font-extrabold">
        {{ t("TITLES.login") }}
      </h2>
      <h3 class="form-subtitle text-3xl">
        {{ t("TITLES.welcome_back") }}
      </h3>
    </div>
    <!-- ✅ END:: FORM TITLE -->

    <!-- ✅ START:: FORM -->
    <div class="form-wrapper w-[30%]  bg-white shadow-md rounded-lg p-6">
      <form @submit.prevent="validateLoginForm" class="space-y-6">
        <!-- ✅ Phone Input -->
        <div class="relative">
          
          <div class="input-wrapper flex justify-between" dir="ltr">
            <button @click="toggleCountryMenu" type="button" class="flex items-center text-gray-700">
              <img :src="selectedCountry?.flag" alt="Flag" class="w-5 h-3" />
              <span class="ml-2">{{ selectedCountry?.key }}</span>
            </button>
            <input
              type="number"
              v-model="loginData.phone"
              class="flex-1 bg-transparent outline-none p-2 text-gray-700 text-sm"
              :placeholder="t('PLACEHOLDERS.phone')"
            />
          </div>
        </div>
        
        <!-- <div class="mt-5 custom_input">
          <base-password
            id="password"
            name="password"
            :placeholder="$t('LABELS.Enter', { name: $t('LABELS.password') })"
            icon="key"
          />
        </div> -->
        <!-- ✅ Password Input -->
        <div class="relative">
         
          <div class="input-wrapper">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="loginData.password"
              class="flex-1 bg-transparent outline-none p-2 text-gray-700 text-sm"
              :placeholder="t('PLACEHOLDERS.password')"
            />
            <button type="button" @click="togglePasswordVisibility">
              <i :class="isPasswordVisible ? 'fa fa-eye-slash text-gray-500' : 'fa fa-eye text-gray-500'"></i>
            </button>
          </div>
        </div>

        <!-- ✅ Forgot Password -->
        <NuxtLink to="/reset-password" class="forget-pass-route">
          {{ t("BUTTONS.forget_password") }}
        </NuxtLink>

        <!-- ✅ Submit Button -->
        <button type="submit" class="btn-primary w-full">
          {{ t("BUTTONS.login") }}
          <span v-if="isLoading" class="loader"></span>
        </button>
      </form>

      <!-- ✅ Register Route -->
      <p class="register-route">
        {{ t("BUTTONS.dont_have_account") }}
        <NuxtLink to="/register" class="text-mainTheme font-semibold hover:underline">
          {{ t("BUTTONS.register") }}
        </NuxtLink>
      </p>
    </div>
    <!-- ✅ END:: FORM -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useApiStore } from "@/stores/apiStores";

const { t } = useI18n();
const apiStore = useApiStore();

const isLoading = ref(false);
const isPasswordVisible = ref(false);
const isCountryMenuOpen = ref(false);
const loginData = ref({ phone: "", password: "" });

const countries = computed(() => apiStore.countries);
const selectedCountry = computed(() => apiStore.selectedCountryKey);

onMounted(async () => {
  await apiStore.getCountries();
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const toggleCountryMenu = () => {
  isCountryMenuOpen.value = !isCountryMenuOpen.value;
};

const validateLoginForm = async () => {
  if (!loginData.value.phone) {
    alert(t("VALIDATION.phone_number"));
    return;
  } else if (!loginData.value.password) {
    alert(t("VALIDATION.password"));
    return;
  } else if (loginData.value.password.length < 6) {
    alert(t("VALIDATION.password_length"));
    return;
  }

  await submitLoginForm();
};

const submitLoginForm = async () => {
  isLoading.value = true;
  const payload = {
    country_id: selectedCountry.value.id,
    identifier: loginData.value.phone.replace(/^[0.]+/, ""),
    password: loginData.value.password,
  };

  try {
    const response = await apiStore.login(payload);
    alert(t("VALIDATION.login_success"));
    localStorage.setItem("user_token", response.token);
    location.reload();
  } catch (error) {
    alert(error.message || t("VALIDATION.login_failed"));
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* ✅ Authentication Wrapper */
.auth-wrapper {
  @apply flex flex-col items-center justify-center w-full;
}
input,
textarea,
select {
  @apply border-none p-3 text-[20px] text-themeText bg-themeInputs rounded-xl;
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
  @apply overflow-x-hidden py-8  ;
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
