<template>
  <!-- <div>
    <LoginForm />
  </div> -->

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
    <div class="form-wrapper w-[30%] bg-white shadow-md rounded-lg p-6">
      <VeeForm
        @submit="submitLoginForm"
        :validation-schema="schema"
        class="space-y-6"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <!-- ✅ Phone Input -->
        <div class="relative">
          <div class="input-wrapper flex justify-between" dir="ltr">
            <!-- <button
              @click="toggleCountryMenu"
              type="button"
              class="flex items-center text-gray-700"
            >
              <img :src="selectedCountry?.flag" alt="Flag" class="w-5 h-3" />
              <span class="ml-2">{{ selectedCountry?.key }}</span>
            </button> -->

            <InputsBase
              type="phone"
              id="mobile"
              name="mobile"
              size="60"
              :placeholder="t('PLACEHOLDERS.phone')"
              class="w-full"
            />
          </div>
        </div>
        <!-- ✅ Password Input -->
        <div class="relative">
          <div class="input-wrapper">
            <InputsPassword
              id="password"
              name="password"
              :placeholder="t('PLACEHOLDERS.password')"
              icon="key"
              class="w-full"
            />
          </div>
        </div>

        <!-- ✅ Forgot Password -->
        <NuxtLink to="/reset-password" class="forget-pass-route">
          {{ t("BUTTONS.forget_password") }}
        </NuxtLink>

        <!-- ✅ Submit Button -->

        <InputsButton
          :disabled="loading"
          type="submit"
          :name="t('BUTTONS.login')"
          class="w-full relative px-[12px] py-[6px] border-1 !border-mainTheme rounded-[10px] text-[22px] font-semibold text-white no-underline ease-in-out duration-700 hover:text-maintheme"
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

      <!-- ✅ Register Route -->
      <p class="register-route">
        {{ t("BUTTONS.dont_have_account") }}
        <NuxtLink
          to="/register"
          class="text-mainTheme font-semibold hover:underline"
        >
          {{ t("BUTTONS.register") }}
        </NuxtLink>
      </p>
    </div>
    <!-- ✅ END:: FORM -->

    <!-- <Teleport to="body">
        <global-success
          v-if="success"
          @close="success = false"
          :message="message"
        />
        <global-fail v-if="fail" @close="fail = false" :message="message" />
      </Teleport> -->
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { useToast } from "vue-toastification"; // ✅ Using Vue Toastification

const { $axios } = useNuxtApp();

const { t } = useI18n();

const toast = useToast(); // ✅ Initialize Toast

const loading = ref(false);
const schema = yup.object({
  mobile: yup
    .string()
    .required(t("ERRORS.isRequired", { name: t("LABELS.Phone") }))
    .matches(/^[0-9]{10}$/, t("ERRORS.invalidPhone")),
  password: yup
    .string()
    .min(6, t("ERRORS.password_length"))
    .required(t("ERRORS.isRequired", { name: t("LABELS.password") })),
});
const submitLoginForm = async (values) => {
  console.log(values);
  return;

  console.log("zoz");
  isWaitingRequest.value = true;

  const theData = new FormData();
  // ✅ Append Static Data
  theData.append("type", "ios");
  theData.append("device_token", "static_device_token");
  // ✅ Append User Login Data
  // theData.append("country_id", selectedCountry.value.id);
  theData.append("identifier", values.mobile.replace(/^[0.]+/, ""));
  theData.append("password", values?.password);

  $axios
    .post("login", theData)
    .then((res) => {
      useCookies("faira-token").value = res?.data?.data?.token?.access_token;
    })
    .catch((err) => {
      console.log(err);
    });
};

definePageMeta({
  layout: "auth",
});
</script>

<style scoped></style>
