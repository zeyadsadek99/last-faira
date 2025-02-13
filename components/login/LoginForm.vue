<template>
    <div class="login-form-wrapper lg:col-span-6">
      <!-- ✅ START:: FORM TITLE -->
      <div class="form-title-wrapper text-center">
        <!-- ✅ LOGO -->
        <NuxtLink to="/" class="logo-wrapper">
          <img src="/logo.svg" alt="Al-Moalem Al-Mosaed App Logo" class="w-36 h-28" />
        </NuxtLink>
  
        <!-- ✅ TITLES -->
        <h2 class="form-title text-2xl font-bold">{{ t("TITLES.login") }}</h2>
        <h3 class="form-subtitle text-lg text-gray-600">{{ t("TITLES.welcome_back") }}</h3>
      </div>
      <!-- ✅ END:: FORM TITLE -->
  
      <!-- ✅ START:: FORM -->
      <div class="form-wrapper">
        <form class="mt-6" @submit.prevent="validateLoginForm">
          <div class="flex flex-col items-center space-y-4">
            <!-- ✅ Phone Input -->
            <div class="relative w-3/4">
              <div class="input-wrapper flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
                <button @click="toggleCountryMenu" type="button" class="flex items-center">
                  <img :src="selectedCountry?.flag" alt="Country Flag" class="w-6 h-4" />
                  <span class="ml-2">{{ selectedCountry?.key }}</span>
                </button>
                <input
                  type="number"
                  class="flex-1 bg-transparent outline-none"
                  :placeholder="t('PLACEHOLDERS.phone')"
                  v-model="loginData.phone"
                  @focus="isCountryMenuOpen = false"
                />
              </div>
  
              <!-- ✅ Country Selection Dropdown -->
              <ul v-if="isCountryMenuOpen" class="absolute left-0 top-12 bg-white shadow-lg rounded-lg w-full z-10">
                <li
                  v-for="country in countries"
                  :key="country.id"
                  @click="selectCountry(country)"
                  class="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                >
                  <img :src="country.flag" alt="Flag" class="w-6 h-4" />
                  <span>{{ country.key }}</span>
                </li>
              </ul>
            </div>
  
            <!-- ✅ Password Input -->
            <div class="relative w-3/4">
              <div class="input-wrapper flex items-center bg-gray-100 p-3 rounded-lg">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="flex-1 bg-transparent outline-none"
                  :placeholder="t('PLACEHOLDERS.password')"
                  v-model="loginData.password"
                />
                <button type="button" @click="togglePasswordVisibility">
                  <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </button>
              </div>
            </div>
  
            <!-- ✅ Forgot Password -->
            <NuxtLink to="/reset-password" class="text-blue-500 text-sm">{{ t("BUTTONS.forget_password") }}</NuxtLink>
  
            <!-- ✅ Submit Button -->
            <button type="submit" class="btn-primary w-3/4">
              {{ t("BUTTONS.login") }}
              <span v-if="isLoading" class="loader"></span>
            </button>
          </div>
        </form>
  
        <!-- ✅ Register Route -->
        <NuxtLink to="/register" class="text-center block mt-4 text-gray-600">
          <span>{{ t("BUTTONS.dont_have_account") }}</span>
          <span class="text-blue-500"> {{ t("BUTTONS.register") }} </span>
        </NuxtLink>
      </div>
      <!-- ✅ END:: FORM -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  // import { useAuthStore } from "@/stores/authStore"; // Pinia Store
  // import { useCountriesStore } from "@/stores/countriesStore"; // Pinia Store
  
  const { t } = useI18n();
  // const authStore = useAuthStore();
  // const countriesStore = useCountriesStore();
  
  const isLoading = ref(false);
  const isPasswordVisible = ref(false);
  const isCountryMenuOpen = ref(false);
  const loginData = ref({ phone: "", password: "" });
  
  // const countries = computed(() => countriesStore.countries);
  // const selectedCountry = computed(() => countriesStore.selectedCountry);
  
  // ✅ Toggle Password Visibility
  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };
  
  // ✅ Toggle Country Menu
  const toggleCountryMenu = () => {
    isCountryMenuOpen.value = !isCountryMenuOpen.value;
  };
  
  // ✅ Select Country
  const selectCountry = (country) => {
    countriesStore.setSelectedCountry(country);
    isCountryMenuOpen.value = false;
  };
  
  // ✅ Validate & Submit Login
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
  
  // ✅ Submit Login Form
  const submitLoginForm = async () => {
    isLoading.value = true;
    const payload = {
      country_id: selectedCountry.value.id,
      identifier: loginData.value.phone.replace(/^[0.]+/, ""),
      password: loginData.value.password,
    };
  
    try {
      const response = await authStore.login(payload);
      alert(t("VALIDATION.login_success"));
      localStorage.setItem("user_token", response.token);
      location.reload();
    } catch (error) {
      alert(error.message || t("VALIDATION.login_failed"));
    } finally {
      isLoading.value = false;
    }
  };
  
  // ✅ Fetch Countries on Mount
  onMounted(() => {
    // countriesStore.fetchCountries();
  });
  </script>
  
  <style scoped>
  /* ✅ Button */
  .btn-primary {
    @apply bg-blue-100 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center;
  }
  
  .btn-primary .loader {
    @apply w-5 h-5 border-2 border-white  rounded-full animate-spin ml-2;
    border-top: transparent
  }
  
  /* ✅ Input Styling */
  .input-wrapper {
    @apply flex items-center bg-gray-100 px-4 py-2 rounded-lg w-full;
  }
  
  .input-wrapper input {
    @apply w-full bg-white outline-none;
  }


/* ✅ Authentication Wrapper */
/* {
  @apply flex flex-col items-center justify-center;
} */

/* ✅ Form Title Wrapper */
.form-title-wrapper {
  @apply h-[45vh] flex flex-col items-center justify-center gap-2;
}

/* ✅ Form Titles */
.form-title,
.form-subtitle {
  @apply text-center text-themeText m-0;
}

/* ✅ Links Inside Titles */
.form-title a,
.form-subtitle a {
  @apply text-mainTheme;
}

/* ✅ Bold Font for Form Title */
.form-title {
  @apply font-bold;
}

/* ✅ Form Subtitle */
.form-subtitle {
  @apply opacity-60;
}

/* ✅ Edit Phone Number Styling */
.form-subtitle.edit-phone-number {
  @apply opacity-100 text-mainTheme;
}

.form-subtitle.edit-phone-number a {
  @apply ms-4 text-mainTheme;
}

/* ✅ Form Wrapper */
.form-wrapper {
  @apply overflow-x-hidden pb-8 pt-8;
}

/* ✅ Hide Scrollbar */
.form-wrapper::-webkit-scrollbar {
  @apply w-0;
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

/* ✅ Policy Title */
.policy-title {
  @apply mb-0 text-[20px] text-center text-themeText;
}

.policy-title span,
.policy-title button {
  @apply text-[20px] text-mainTheme font-semibold;
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
  