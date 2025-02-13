<template>
    <div class="phone_verification_form_wrapper col-lg-4">
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <!-- START:: LOGO -->
            <router-link to="/" class="logo_wrapper">
                <img
                    src="../../assets/media/logo/logo.svg"
                    alt="Al-Moalem Al-Mosaed App Logo"
                    width="150"
                    height="120"
                />
            </router-link>
            <!-- END:: LOGO -->

            <!-- START:: TITLES -->
            <h2
                class="form_title"
                v-if="verificationType == 'activate-account'"
            >
                {{ $t("TITLES.activate_account") }}
            </h2>
            <h2 class="form_title" v-if="verificationType == 'reset-password'">
                {{ $t("TITLES.forget_password") }}
            </h2>
            <h3 class="form_subtitle">{{ $t("TITLES.enter_sent_code") }}</h3>
            <h3 class="form_subtitle">
                في حالة عدم استلام رمز OTP، يرجى إرسال كلمة "OTP" على واتساب إلى
                الرقم
                <a
                    href="https://api.whatsapp.com/send?phone=2001024992511"
                    target="_blank"
                    >01024992511</a
                >
                لطلب إعادة الإرسال.
            </h3>
            <h4 class="form_subtitle edit_phone_number">
                <span dir="ltr"> {{ phoneNumberAndKey }} </span>
                <router-link to="/chang-phone-number">
                    {{ $t("TITLES.edit_number") }}
                </router-link>
            </h4>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form
                dir="ltr"
                @submit.prevent="validatePhoneVerificationFormInputs"
            >
                <!-- START:: VERIFICATION INPUTS -->
                <div class="input_wrapper verification_inputs_wrapper">
                    <input
                        ref="first_input"
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        @keyup="toggleFocus"
                        v-model.trim="firstNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        @keyup="toggleFocus"
                        v-model.trim="secondNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        @keyup="toggleFocus"
                        v-model.trim="thirdNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        @keyup="toggleFocus"
                        v-model.trim="fourthNumber"
                    />
                </div>
                <!-- END:: VERIFICATION INPUTS -->

                <!-- START:: SUBMIT BUTTON -->
                <div class="btn_wrapper">
                    <button class="w-100">
                        {{ $t("BUTTONS.confirm") }}
                        <span class="btn_loader" v-if="isWaitingRequest"></span>
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON -->

                <!-- START:: COUNTDOWN TIMER -->
                <div class="timer_wrapper">
                    <h3>{{ "0 : " + timerCount }}</h3>
                    <div class="resend_btn_wrapper">
                        <button
                            id="resend_btn"
                            type="button"
                            v-if="timerCount > 0"
                            class="disabled"
                            disabled="disabled"
                        >
                            {{ $t("BUTTONS.resend_code") }}
                        </button>

                        <button
                            id="resend_btn"
                            type="button"
                            v-else
                            @click="resendVerificationCode"
                            :class="timerCount"
                        >
                            {{ $t("BUTTONS.resend_code") }}
                        </button>
                    </div>
                </div>
                <!-- END:: COUNTDOWN TIMER -->
            </form>
        </div>
        <!-- END:: FORM -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "PhoneVerification",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: VERIFICATION TYPE DATA
            verificationType: this.$route.params.verification_type,
            // END:: VERIFICATION TYPE DATA

            // START:: REGISTERED USER DATA
            selectedCountry: localStorage.getItem(
                "elmo3lm_elmosa3d_registered_user_country_id"
            ),
            phoneNumber: localStorage.getItem(
                "elmo3lm_elmosa3d_registered_user_phone"
            ),
            phoneNumberAndKey: localStorage.getItem(
                "elmo3lm_elmosa3d_registered_user_phone_and_key"
            ),
            verificationCode: localStorage.getItem(
                "elmo3lm_elmosa3d_verification_code"
            ),
            // END:: REGISTERED USER DATA

            // START:: VERIFICATION INPUTS DATA
            firstNumber: null,
            secondNumber: null,
            thirdNumber: null,
            fourthNumber: null,
            // END:: VERIFICATION INPUTS DATA

            // START:: TIMER DATA
            timerCount: 60,
            // END:: TIMER DATA
        };
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: TOGGLE INPUTS FOCUS
        toggleFocus(e) {
            if (e.currentTarget.value.length == 1) {
                if (e.currentTarget.nextSibling) {
                    e.currentTarget.blur();
                    e.currentTarget.nextSibling.focus();
                }
            } else if (e.currentTarget.value.length == 0) {
                if (e.currentTarget.previousSibling) {
                    e.currentTarget.blur();
                    e.currentTarget.previousSibling.focus();
                }
            }
        },
        // END:: TOGGLE INPUTS FOCUS

        // START:: COUNTDOWN TIMER
        countDown() {
            if (this.timerCount > 0) {
                setTimeout(() => {
                    this.timerCount -= 1;
                    this.countDown();
                }, 1000);
            }
        },
        // END:: COUNTDOWN TIMER

        // START:: RESEND VERIFICATION CODE
        resendVerificationCode() {
            const theData = new FormData();

            // START:: APPEND GENERAL DATA
            theData.append("phone", this.phoneNumber);
            theData.append("country_id", this.selectedCountry);
            // END:: APPEND GENERAL DATA

            // START:: SEND REQUEST
            this.$axios
                .post("send_code", theData, {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("elmo3lm_elmosa3d_user_token"),
                        "Accept-language": localStorage.getItem(
                            "elmo3lm_elmosa3d_app_lang"
                        ),
                        "cache-control": "no-cache",
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });

                    // START:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE
                    localStorage.setItem(
                        "elmo3lm_elmosa3d_verification_code",
                        res.data.data.code
                    );
                    // END:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE

                    this.timerCount = 60;
                    this.countDown();
                    this.clearPhoneVerificationFormInputs();
                    return;
                })
                .catch((err) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: err.response.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    return;
                });
        },
        // END:: RESEND VERIFICATION CODE

        // START:: VALIDATE PHONE VERIFICATION FORM INPUTS
        validatePhoneVerificationFormInputs() {
            this.isWaitingRequest = true;

            if (
                !this.firstNumber ||
                !this.secondNumber ||
                !this.thirdNumber ||
                !this.fourthNumber
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone_verification_inputs"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitPhoneVerificationForm();
            }
        },
        // END:: VALIDATE PHONE FORM INPUTS

        // START:: SUBMIT PHONE VERIFICATION FORM
        submitPhoneVerificationForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            // END:: APPEND STATIC DATA

            // START:: APPEND GENERAL DATA
            theData.append("phone", this.phoneNumber);
            theData.append("country_id", this.selectedCountry);
            theData.append(
                "code",
                this.firstNumber +
                    this.secondNumber +
                    this.thirdNumber +
                    this.fourthNumber
            );
            // END:: APPEND GENERAL DATA

            if (this.verificationType == "reset-password") {
                // START:: SEND REQUEST
                this.$axios
                    .post("check_reset_code", theData, {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "elmo3lm_elmosa3d_user_token"
                                ),
                            "Accept-language": localStorage.getItem(
                                "elmo3lm_elmosa3d_app_lang"
                            ),
                            "cache-control": "no-cache",
                            Accept: "application/json",
                        },
                    })
                    .then(() => {
                        this.isWaitingRequest = false;

                        this.$iziToast.success({
                            timeout: 2000,
                            message: this.$t("VALIDATION.verification_success"),
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });

                        // START:: LOCAL STORAGE DELETE PREVIOUS STEP DATA
                        localStorage.removeItem(
                            "elmo3lm_elmosa3d_registered_user_phone_and_key"
                        );
                        // END:: LOCAL STORAGE DELETE PREVIOUS STEP DATA

                        this.clearPhoneVerificationFormInputs();
                        this.$router.replace("/reset-password");
                        return;
                    })
                    .catch(() => {
                        this.isWaitingRequest = false;

                        this.$iziToast.error({
                            timeout: 2000,
                            message: this.$t("VALIDATION.verification_failed"),
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        return;
                    });
                // END:: SEND REQUEST
            } else if (this.verificationType == "activate-account") {
                // START:: SEND REQUEST
                this.$axios
                    .post("verify", theData, {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "elmo3lm_elmosa3d_user_token"
                                ),
                            "Accept-language": localStorage.getItem(
                                "elmo3lm_elmosa3d_app_lang"
                            ),
                            "cache-control": "no-cache",
                            Accept: "application/json",
                        },
                    })
                    .then((res) => {
                        this.isWaitingRequest = false;

                        this.$iziToast.success({
                            timeout: 2000,
                            message: this.$t("VALIDATION.verification_success"),
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });

                        // START:: LOCAL STORAGE SET REGISTERED USER DATA
                        this.setAuthenticatedUserData({
                            type: res.data.data.user_type,
                            // token: res.data.data.token.access_token,
                        });
                        // END:: LOCAL STORAGE SET REGISTERED USER DATA

                        // START:: LOCAL STORAGE DELETE PREVIOUS STEP DATA
                        localStorage.removeItem(
                            "elmo3lm_elmosa3d_registered_user_country_id"
                        );
                        localStorage.removeItem(
                            "elmo3lm_elmosa3d_registered_user_phone"
                        );
                        localStorage.removeItem(
                            "elmo3lm_elmosa3d_registered_user_phone_and_key"
                        );
                        localStorage.removeItem("elmo3lm_elmosa3d_user_type");
                        localStorage.removeItem("elmo3lm_elmosa3d_user_token");
                        localStorage.removeItem(
                            "elmo3lm_elmosa3d_verification_code"
                        );
                        // END:: LOCAL STORAGE DELETE PREVIOUS STEP DATA

                        this.clearPhoneVerificationFormInputs();
                        this.$router.replace("/login");

                        return;
                    })
                    .catch(() => {
                        this.isWaitingRequest = false;

                        this.$iziToast.error({
                            timeout: 2000,
                            message: this.$t("VALIDATION.verification_failed"),
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        return;
                    });
                // END:: SEND REQUEST
            }
        },
        // END:: SUBMIT PHONE VERIFICATION FORM

        // START:: CLEAR FORM INPUTS DATA
        clearPhoneVerificationFormInputs() {
            this.firstNumber = null;
            this.secondNumber = null;
            this.thirdNumber = null;
            this.fourthNumber = null;
        },
        // END:: CLEAR FORM INPUTS DATA
    },

    created() {
        // START:: COUNTDOWN TIMER
        this.countDown();
        // END:: COUNTDOWN TIMER
    },

    mounted() {
        this.$refs.first_input.focus();
    },
};
</script>
