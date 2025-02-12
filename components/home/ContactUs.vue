<template>
  <div class="contact_us_section_wrapper" id="contact" v-if="contactUsData">
    <div class="container">
      <!-- START:: HEADER WRAPPER -->
      <div class="section_title_wrapper mb-5">
        <h2 class="title">
          <img
            src="../../public/media/shapes/title_icon.svg"
            alt="Title Icon"
          />

          <span> {{ t("TITLES.contact_us") }} </span>
        </h2>
      </div>
      <!-- END:: HEADER WRAPPER -->

      <!-- START:: SECTION CONTENT -->
      <div class="row mt-5">
        <!-- START:: CONTACT US FORM -->
        <div class="col-lg-5 order-2 order-lg-1 my-3">
          <h3 class="form_title">{{ t("TITLES.send_us") }}</h3>
          <form @submit.prevent="validateContactFormInputs">
            <div class="row">
              <!-- Name Input -->
              <div class="col-lg-6 my-3">
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
              <div class="col-lg-6 my-3">
                <div class="input_wrapper">
                  <input
                    type="text"
                    class="form-control"
                    :placeholder="t('PLACEHOLDERS.suggestion_title')"
                    v-model.trim="contactFormData.suggestionTitle"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div class="col-lg-12 my-3">
                <div class="input_wrapper">
                  <input
                    type="number"
                    class="form-control"
                    :placeholder="t('PLACEHOLDERS.phone_number')"
                    v-model.trim="contactFormData.phoneNumber"
                  />
                </div>
              </div>

              <!-- Message -->
              <div class="col-lg-12 my-3">
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
        <div class="col-lg-7 order-1 order-lg-2">
          <div class="row">
            <!-- Contact Info -->
            <div class="col-lg-6 my-3 order-2 order-lg-1">
              <h3 class="contact_info_title mb-3">
                {{ t("TITLES.contact_info") }}
              </h3>
              <div class="info_wrapper">
                <p class="phone my-3">
                  <i class="fas fa-phone-alt"></i>
                  <span dir="ltr">{{ contactUsData.phone }}</span>
                </p>
                <p class="email my-3">
                  <i class="far fa-envelope"></i>
                  <a :href="`mailto:${contactUsData.email}`" dir="ltr">{{
                    contactUsData.email
                  }}</a>
                </p>
                <p class="fax my-3">
                  <i class="fas fa-fax"></i>
                  <span dir="ltr">{{ contactUsData.lan_number }}</span>
                </p>
                <p class="address my-3">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ contactUsData?.location?.desc }}</span>
                </p>
              </div>
              <div class="social_media_links_wrapper">
                <a
                  :href="`https://wa.me/${contactUsData.whatsapp}`"
                  target="_blank"
                  v-if="contactUsData.whatsapp"
                >
                  <i class="fab fa-whatsapp"></i>
                </a>
  
                <a
                  :href="contactUsData?.social?.youtube"
                  target="_blank"
                  v-if="contactUsData?.social?.youtube"
                >
                  <i class="fab fa-youtube"></i>
                </a>
  
                <a
                  :href="contactUsData?.social?.instagram"
                  target="_blank"
                  v-if="contactUsData?.social?.instagram"
                >
                  <i class="fab fa-instagram"></i>
                </a>
  
                <a
                  :href="contactUsData.social.twitter"
                  target="_blank"
                  v-if="contactUsData.social.twitter"
                >
                  <i class="fab fa-twitter"></i>
                </a>
  
                <a
                  :href="contactUsData.social.facebook"
                  target="_blank"
                  v-if="contactUsData.social.facebook"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
            <!-- END:: CONTACT INFO -->

            <!-- Google Maps -->
            <div class="col-lg-6 my-3 order-1 order-lg-2">
              <div class="map_wrapper">
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useRuntimeConfig } from "#imports";

const { t } = useI18n();
const toast = useToast();
const config = useRuntimeConfig();

// Props
defineProps({
  contactUsData: {
    type: Object,
    required: true,
  },
});
const isWaitingRequest = ref(false);

const contactFormData = ref({
  name: "",
  suggestionTitle: "",
  phoneNumber: "",
  message: "",
});

//   // Validation
//   const validateContactFormInputs = () => {
//     if (!contactFormData.value.name) return toast.error(t("VALIDATION.name"));
//     if (!contactFormData.value.suggestionTitle) return toast.error(t("VALIDATION.suggestion_title"));
//     if (!contactFormData.value.phoneNumber) return toast.error(t("VALIDATION.phone_number"));
//     if (!contactFormData.value.message) return toast.error(t("VALIDATION.complaint_details"));

//     submitContactForm();
//   };

// Submit Form
//   const submitContactForm = async () => {
//     isWaitingRequest.value = true;
//     try {
//       const { data } = await fetch(`${config.public.baseURL}/contact`, {
//         method: "POST",
//         body: JSON.stringify(contactFormData.value),
//         headers: { "Content-Type": "application/json" },
//       });

//       toast.success(t("MESSAGES.sent_successfully"));
//       contactFormData.value = { name: "", suggestionTitle: "", phoneNumber: "", message: "" };
//     } catch (error) {
//       toast.error(error.message || t("MESSAGES.error"));
//     } finally {
//       isWaitingRequest.value = false;
//     }
//   };
</script>
