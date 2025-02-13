<template>
    <div class="reset_password_form_wrapper col-lg-6">
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
            <h3 class="form_subtitle">{{ $t("TITLES.enter_new_password") }}</h3>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-4" @submit.prevent="validateResetPasswordInputs">
                <div class="row justify-content-center">
                    <!-- START:: PASSWORD INPUT GROUP -->
                    <div class="col-lg-7 my-3">
                        <div class="input_wrapper password_input_wrapper">
                            <input
                                type="password"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.password')"
                                v-model.trim="resetPasswordData.password"
                            />
                            <button
                                type="button"
                                class="password_visibility_toggler"
                                @click="togglePasswordVisibility"
                            >
                                <i class="fal fa-eye"></i>
                                <i class="fal fa-eye-slash"></i>
                            </button>
                        </div>
                    </div>
                    <!-- END:: PASSWORD INPUT GROUP -->

                    <!-- START:: CONFIRM PASSWORD INPUT GROUP -->
                    <div class="col-lg-7 my-3">
                        <div class="input_wrapper password_input_wrapper">
                            <input
                                type="password"
                                class="form-control"
                                :placeholder="
                                    $t('PLACEHOLDERS.confirm_password')
                                "
                                v-model.trim="
                                    resetPasswordData.confirm_password
                                "
                            />
                            <button
                                type="button"
                                class="password_visibility_toggler"
                                @click="togglePasswordVisibility"
                            >
                                <i class="fal fa-eye"></i>
                                <i class="fal fa-eye-slash"></i>
                            </button>
                        </div>
                    </div>
                    <!-- END:: CONFIRM PASSWORD INPUT GROUP -->

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <div class="col-lg-7 my-3">
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
export default {
    name: "ResetPasswordForm",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: LOGIN DATA
            resetPasswordData: {
                password: null,
                confirm_password: null,
            },
            // END:: LOGIN DATA
        };
    },

    methods: {
        // START:: TOGGLE PASSWORD VISIBILITY METHOD
        togglePasswordVisibility(e) {
            let passwordElement = e.currentTarget.parentElement.children[0];
            let passwordTogglerBtn = e.currentTarget;
            if (passwordElement.type == "password") {
                passwordElement.type = "text";
                passwordTogglerBtn.classList.add("password_is_visible");
            } else if (passwordElement.type == "text") {
                passwordElement.type = "password";
                passwordTogglerBtn.classList.remove("password_is_visible");
            }
        },
        // END:: TOGGLE PASSWORD VISIBILITY METHOD

        // START:: VALIDATE LOGIN FORM INPUTS
        validateResetPasswordInputs() {
            this.isWaitingRequest = true;

            if (!this.resetPasswordData.password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.resetPasswordData.password.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.resetPasswordData.confirm_password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.resetPasswordData.confirm_password.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (
                this.resetPasswordData.password !=
                this.resetPasswordData.confirm_password
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.not_equal_passwords"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitResetPasswordForm();
            }
        },
        // END:: VALIDATE LOGIN FORM INPUTS

        // START:: SUBMIT LOGIN FORM
        submitResetPasswordForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND GENERAL DATA
            theData.append(
                "code",
                localStorage.getItem("elmo3lm_elmosa3d_verification_code")
            );
            theData.append(
                "phone",
                localStorage.getItem("elmo3lm_elmosa3d_registered_user_phone")
            );
            theData.append(
                "country_id",
                localStorage.getItem(
                    "elmo3lm_elmosa3d_registered_user_country_id"
                )
            );
            theData.append("password", this.resetPasswordData.password);
            // END:: APPEND GENERAL DATA

            this.$axios
                .post("reset_password", theData, {
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
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });

                    // START:: REMOVE STORED ITEMS FROM LOCAL STORAGE
                    localStorage.removeItem(
                        "elmo3lm_elmosa3d_verification_code"
                    );
                    localStorage.removeItem(
                        "elmo3lm_elmosa3d_registered_user_phone"
                    );
                    localStorage.removeItem(
                        "elmo3lm_elmosa3d_registered_user_country_id"
                    );
                    // END:: REMOVE STORED ITEMS FROM LOCAL STORAGE

                    this.clearResetPasswordFormData();
                    this.$router.replace("/login");
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
        // END:: SUBMIT LOGIN FORM

        // START:: CLEAR LOGIN FORM DATA
        clearResetPasswordFormData() {
            this.resetPasswordData.password = null;
            this.resetPasswordData.phone = null;
        },
        // END:: CLEAR LOGIN FORM DATA
    },
};
</script>
