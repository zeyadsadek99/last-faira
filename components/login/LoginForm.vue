<template>
  <div class="auth-wrapper flex flex-col items-center justify-center w-full">
    <!-- ✅ START:: FORM TITLE -->
    <div class="form-title-wrapper">
      <!-- ✅ LOGO -->
      <NuxtLink to="/" class="logo-wrapper">
        <img src="/logo.svg" alt="App Logo" class="w-36 h-28 mx-auto" />
      </NuxtLink>

      <!-- ✅ TITLES -->
      <h2 class="form-title text-3xl font-extrabold">
        {{ t("TITLES.login") }}
      </h2>
      <h3 class="form-subtitle text-lg">
        {{ t("TITLES.welcome_back") }}
      </h3>
    </div>
    <!-- ✅ END:: FORM TITLE -->

    <!-- ✅ START:: FORM -->
    <div class="form-wrapper w-full max-w-lg bg-white shadow-md rounded-lg p-6">
      <form @submit.prevent="validateLoginForm" class="space-y-6">
        <!-- ✅ Phone Input -->
        <div class="relative">
          <label class="text-gray-700 font-medium text-sm">
            {{ t("LABELS.phone_number") }}
          </label>
          <div class="input-wrapper">
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

        <!-- ✅ Password Input -->
        <div class="relative">
          <label class="text-gray-700 font-medium text-sm">
            {{ t("LABELS.password") }}
          </label>
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
        <NuxtLink to="/register" class="text-blue-500 font-semibold hover:underline">
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
  @apply overflow-x-hidden py-8 w-full ;
}

/* ✅ Hide Scrollbar */
.form-wrapper::-webkit-scrollbar {
  @apply w-0;
}

/* ✅ Input Styling */
.input-wrapper {
  @apply flex items-center bg-gray-100 px-4 py-2 rounded-lg w-full;
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
  @apply mt-5 block text-center no-underline;
}

.register-route span {
  @apply text-[22px] text-lightGray;
}

.register-route span:last-of-type {
  @apply text-mainTheme font-semibold;
}

/* ✅ Submit Button */
.btn-primary {
  @apply bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition;
}

.btn-primary .loader {
  @apply w-5 h-5 border-2 border-white rounded-full animate-spin ml-2;
  border-top: transparent;
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
