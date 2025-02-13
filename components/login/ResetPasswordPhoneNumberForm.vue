<template>
    <div class="reset_password_phone_num_form_wrapper col-lg-6">
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
            <h2 class="form_title">{{ $t("TITLES.forget_password") }}</h2>
            <h3 class="form_subtitle">{{ $t("TITLES.enter_phone_number") }}</h3>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form
                class="mt-4"
                @submit.prevent="validateResetPassPhoneNumberFormInputs"
            >
                <div class="row justify-content-center">
                    <!-- START:: PHONE INPUT GROUP -->
                    <div class="col-lg-12 my-3">
                        <div
                            class="input_wrapper phone_input_wrapper"
                            dir="ltr"
                        >
                            <div
                                class="selected_key_wrapper"
                                @click="toggleCountryKeysMenu"
                                v-if="countriesData.selectedCountry"
                            >
                                <div class="flag_wrapper">
                                    <img
                                        :src="
                                            countriesData.selectedCountry.flag
                                        "
                                        :alt="
                                            countriesData.selectedCountry.name
                                        "
                                        width="30"
                                        height="20"
                                    />
                                </div>
                                <div class="key_wrapper" dir="ltr">
                                    {{ countriesData.selectedCountry.key }}
                                </div>

                                <transition name="fadeInUp" mode="out-in">
                                    <div
                                        class="country_keys_menu_wrapper"
                                        v-if="countryKiesMenuIsOpen"
                                    >
                                        <ul
                                            class="country_keys_menu"
                                            v-if="countriesData"
                                        >
                                            <li
                                                class="menu_item"
                                                v-for="countryKey in countriesData.allCountries"
                                                :key="countryKey.id"
                                                @click="
                                                    changeSelectedPhoneCode(
                                                        countryKey
                                                    )
                                                "
                                            >
                                                <div class="flag_wrapper">
                                                    <img
                                                        :src="countryKey.flag"
                                                        :alt="countryKey.name"
                                                        width="30"
                                                        height="20"
                                                    />
                                                </div>
                                                <div
                                                    class="key_wrapper"
                                                    dir="ltr"
                                                >
                                                    {{ countryKey.key }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </div>

                            <input
                                type="number"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.phone')"
                                v-model="resetPassPhoneNumData.phone"
                                @focus="countryKiesMenuIsOpen = false"
                            />
                        </div>
                    </div>
                    <!-- END:: PHONE INPUT GROUP -->

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <div class="col-lg-12 my-3">
                        <div class="btn_wrapper">
                            <button class="w-100 mt-0">
                                {{ $t("BUTTONS.confirm") }}
                                <span
                                    class="btn_loader"
                                    v-if="isWaitingRequest"
                                ></span>
                            </button>
                        </div>
                    </div>
                    <!-- END:: SUBMIT BUTTON WRAPPER -->
                </div>
            </form>

            <!-- START:: LOGIN ROUTE WRAPPER -->
            <router-link to="/login" class="register_route">
                <span>{{ $t("BUTTONS.have_account") }}</span>
                <span> {{ $t("BUTTONS.login") }}</span>
            </router-link>
            <!-- END:: LOGIN ROUTE WRAPPER -->
        </div>
        <!-- END:: FORM -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "ResetPasswordPhoneNumberForm",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: COUNTRIES KEYS MENU HANDLING DATA
            countryKiesMenuIsOpen: false,
            // END:: COUNTRIES KEYS MENU HANDLING DATA

            // START:: LOGIN DATA
            resetPassPhoneNumData: {
                phone: null,
            },
            // END:: LOGIN DATA
        };
    },

    computed: {
        // START:: VUEX GET API GETS DATA
        ...mapGetters("ApiGetsModule", ["countriesData"]),
        // END:: VUEX GET API GETS DATA
    },

    methods: {
        // START:: VUEX API GETS ACTIONS
        ...mapActions("ApiGetsModule", [
            "getCountries",
            "changeSelectedPhoneCode",
        ]),
        // END:: VUEX API GETS ACTIONS

        // START:: TOGGLE COUNTRIES KEYS MENU
        toggleCountryKeysMenu() {
            this.countryKiesMenuIsOpen = !this.countryKiesMenuIsOpen;
        },
        // END:: TOGGLE COUNTRIES KEYS MENU

        // START:: VALIDATE PHONE FORM INPUTS
        validateResetPassPhoneNumberFormInputs() {
            this.isWaitingRequest = true;

            if (!this.resetPassPhoneNumData.phone) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone_number"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitResetPassPhoneNumberForm();
            }
        },
        // END:: VALIDATE PHONE FORM INPUTS

        // START:: SUBMIT PHONE FORM
        submitResetPassPhoneNumberForm() {
            this.isWaitingRequest = false;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append(
                "phone",
                this.resetPassPhoneNumData.phone.replace(/^[0.]+/, "")
            );
            theData.append("country_id", this.countriesData.selectedCountry.id);

            // END:: APPEND TEACHER DATA

            // START:: SEND REQUEST
            this.$axios
                .post("forgot_password", theData, {
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
                        "elmo3lm_elmosa3d_registered_user_country_id",
                        this.countriesData.selectedCountry.id
                    );
                    localStorage.setItem(
                        "elmo3lm_elmosa3d_registered_user_phone",
                        this.resetPassPhoneNumData.phone
                    );
                    localStorage.setItem(
                        "elmo3lm_elmosa3d_registered_user_phone_and_key",
                        this.countriesData.selectedCountry.key +
                            this.resetPassPhoneNumData.phone
                    );
                    localStorage.setItem(
                        "elmo3lm_elmosa3d_verification_code",
                        res.data.data.code
                    );
                    // END:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE

                    this.clearResetPassPhoneNumberFormData();
                    this.$router.replace("/phone-verification/reset-password");
                })
                .catch((err) => {
                    this.isWaitingRequest = false;

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
        // END:: SUBMIT PHONE FORM

        // START:: CLEAR PHONE FORM DATA
        clearResetPassPhoneNumberFormData() {
            this.resetPassPhoneNumData.phone = null;
            this.resetPassPhoneNumData.password = null;
        },
        // END:: CLEAR PHONE FORM DATA
    },
    mounted() {
        this.getCountries();
    },
};
</script>
