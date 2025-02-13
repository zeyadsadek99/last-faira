<template>
  <div
    class="contact_us_section_wrapper pb-12 bg-veryLightTheme"
    id="contact"
    v-if="contactUsData"
  >
    <div class="container">
      <!-- START:: HEADER WRAPPER -->
      <div class="section_title_wrapper pt-12 mb-5">
        <h2 class="title flex items-center justify-center gap-3">
          <img
            src="../../assets/media/shapes/title_icon.svg"
            alt="Title Icon"
            class="w-16"
          />

          <span class="text-[2.3rem] font-bold text-themeText">
            {{ t("TITLES.contact_us") }}
          </span>
        </h2>
      </div>
      <!-- END:: HEADER WRAPPER -->

      <!-- START:: SECTION CONTENT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-5">
        <!-- START:: CONTACT US FORM -->
        <div
          v-if="true"
          class="lg:col-span-5 order-2 lg:order-1 my-3 space-y-5"
        >
          <h3 class="form_title text-3xl text-themeText font-semibold">
            {{ t("TITLES.send_us") }}
          </h3>
          <VeeForm
            class="space-y-5 flex flex-col "
            @submit="onSubmit"
            :validation-schema="schema"
          >
            <!-- ✅ Two Inputs Side by Side -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <inputs-base
                id="full_name"
                name="full_name"
                :placeholder="t('PLACEHOLDERS.name')"
              />
              <inputs-base
                id="title"
                name="title"
                :placeholder="t('PLACEHOLDERS.suggestion_title')"
              />
            </div>

            <!-- ✅ Another Full-Width Input -->
            <inputs-base
              id="phone"
              name="phone"
              :placeholder="t('PLACEHOLDERS.phone_number')"
            />

            <!-- ✅ Full-Width Textarea (Rows 3) -->
            <inputs-base
              rows="3"
              type="textarea"
              id="subject"
              name="subject"
              :placeholder="t('PLACEHOLDERS.complaint_details')"
            />

            <!-- ✅ Submit Button -->
            <div class="btn mx-auto">
              <Button class="" :text="$t('BUTTONS.send')" type="submit">
                <span class="btn-loader" v-if="isWaitingRequest"></span>
              </Button>
            </div>
          </VeeForm>
        </div>
        <div v-if="false" class="lg:col-span-5 order-2 order-lg-1 my-3">
          <h3 class="form_title text-themeText font-semibold">
            {{ t("TITLES.send_us") }}
          </h3>
          <form @submit.prevent="validateContactFormInputs">
            <div class="flex flex-col">
              <!-- Name Input -->
              <div class="flex gap-10">
                <div class="my-3">
                  <div class="input_wrapper">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="t('PLACEHOLDERS.name')"
                      v-model.trim="contactFormData.name"
                    />
                  </div>
                </div>

                <!-- Suggestion Title -->
                <div class="my-3">
                  <div class="input_wrapper">
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="t('PLACEHOLDERS.suggestion_title')"
                      v-model.trim="contactFormData.suggestionTitle"
                    />
                  </div>
                </div>
              </div>

              <!-- Phone -->
              <div class="my-3">
                <div class="input_wrapper w-[80%]">
                  <input
                    type="number"
                    class="form-control"
                    :placeholder="t('PLACEHOLDERS.phone_number')"
                    v-model.trim="contactFormData.phoneNumber"
                  />
                </div>
              </div>

              <!-- Message -->
              <div class="my-3">
                <div class="input_wrapper">
                  <textarea
                    class="form-control"
                    :placeholder="t('PLACEHOLDERS.complaint_details')"
                    v-model.trim="contactFormData.message"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="btn_wrapper">
                <button :disabled="isWaitingRequest">
                  {{ t("BUTTONS.send") }}
                  <span class="btn_loader" v-if="isWaitingRequest"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <!-- END:: CONTACT US FORM -->

        <!-- START:: CONTACT US DATA -->
        <div class="lg:col-span-7 order-1 order-lg-2">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <!-- Contact Info -->
            <div class="col-span-6 my-3 order-2 order-lg-1">
              <h3
                class="contact_info_title text-3xl text-themeText font-semibold mb-3"
              >
                {{ t("TITLES.contact_info") }}
              </h3>
              <div
                class="info_wrapper flex flex-col items-start justify-center gap-4"
              >
                <p
                  v-for="(item, index) in contactDetails"
                  :key="index"
                  class="flex items-center gap-3 my-3"
                >
                  <i :class="item.icon"></i>

                  <!-- ✅ Conditional Link Handling -->
                  <a
                    v-if="item.link"
                    :href="item.link"
                    dir="ltr"
                    class="text-blue-600 hover:underline"
                  >
                    {{ item.value }}
                  </a>

                  <!-- ✅ Plain Text for Non-Link Items -->
                  <span v-else dir="ltr">{{ item.value }}</span>
                </p>
              </div>
              <div
                class="social_media_links_wrapper mt-8 flex items-center gap-4"
              >
                <template v-for="(link, key) in socialMediaLinks" :key="key">
                  <!-- ✅ Internal Links (NuxtLink) -->
                  <NuxtLink target="_blank" :to="link.url" class="social-btn">
                    <i :class="link.icon"></i>
                  </NuxtLink>
                </template>
              </div>
            </div>
            <!-- END:: CONTACT INFO -->

            <!-- Google Maps -->
            <div class="col-span-6 my-3 order-1 order-lg-2">
              <div class="map_wrapper rounded-2xl overflow-hidden">
                <GMapMap
                  :center="{
                    lat: parseFloat(contactUsData?.location?.lat),
                    lng: parseFloat(contactUsData?.location?.lng),
                  }"
                  :zoom="12"
                  map-type-id="terrain"
                  style="width: 100%; height: 400px"
                >
                  <GMapMarker
                    :position="{
                      lat: parseFloat(contactUsData?.location?.lat),
                      lng: parseFloat(contactUsData?.location?.lng),
                    }"
                  />
                </GMapMap>
              </div>
            </div>
          </div>
        </div>
        <!-- END:: CONTACT US DATA -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useRuntimeConfig } from "#imports";
import Button from "../global/Button.vue";
import * as yup from "yup";

const { t } = useI18n();
const toast = useToast();
const config = useRuntimeConfig();

// ✅ Props
const props = defineProps({
  contactUsData: {
    type: Object,
    required: true,
  },
});

const isWaitingRequest = ref(false);

// const schema = yup.object({
//   full_name: yup.string().required(i18n.t("FORMS.Validation.name")),
//   title: yup.string().required(i18n.t("FORMS.Validation.messageTitle")),
//   // email: yup
//   //   .string()
//   //   .required(i18n.t("FORMS.Validation.email"))
//   //   .test("email", i18n.t("FORMS.Validation.validEmail"), (value) => {
//   //     return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\.[a-z])*$/.test(
//   //       value
//   //     );
//   //   }),
//   phone: yup.string().required(i18n.t("FORMS.Validation.phone")),
//   // phone_code: yup.object().required(i18n.t("FORMS.Validation.phone_code")),

//   subject: yup.string().required(i18n.t("FORMS.Validation.subject")),
// });
const onSubmit = (values, actions) => {
  const frmdata = new FormData();
  frmdata.append("full_name", values.full_name);
  frmdata.append("email", values.email);
  frmdata.append("content", values.subject);
  frmdata.append("title", values.title);
  frmdata.append("phone", values.phone);
  frmdata.append("phone_code", values.phone_code.phone_code);

  $fetch("contact-us", {
    method: "POST",
    body: frmdata,
    baseURL: baseURL,
  })
    .then((res) => {
      toast.success(res.message);
      actions.resetForm();
    })
    .catch((err) => {
      toast.error(err.response._data.message);
    });
};


// ✅ Phone Options
const phoneOptions = [
  { name: "egypt", phone_code: "20" },
  { name: "saudi arabia", phone_code: "966" },
];

// ✅ Fix: Use `computed()` to Ensure Data is Available Before Using It
const contactDetails = computed(() => {
  if (!props.contactUsData) return [];

  return [
    {
      icon: "fa-solid fa-phone",
      value: props.contactUsData.phone,
      link: `tel:${props.contactUsData.phone}`,
    },
    {
      icon: "far fa-envelope",
      value: props.contactUsData.email,
      link: `mailto:${props.contactUsData.email}`,
    },
    { icon: "fas fa-fax", value: props.contactUsData.lan_number },
    {
      icon: "fas fa-map-marker-alt",
      value: props.contactUsData?.location?.desc,
    },
  ];
});
const socialMediaLinks = computed(() => {
  if (!props.contactUsData || !props.contactUsData.social) return [];

  return [
    {
      icon: "fab fa-whatsapp",
      url: `https://wa.me/${props.contactUsData.whatsapp}`,
    },
    {
      icon: "fab fa-youtube",
      url: props.contactUsData?.social?.youtube,
    },
    {
      icon: "fab fa-instagram",
      url: props.contactUsData?.social?.instagram,
    },
    {
      icon: "fab fa-twitter",
      url: props.contactUsData?.social?.twitter,
    },
    {
      icon: "fab fa-facebook-f",
      url: props.contactUsData?.social?.facebook,
    },
    // Example Internal Link: Change this if you have internal social links
  ].filter((link) => link.url); // ✅ Filters out empty/null links
});
</script>

<style>

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
</style>
