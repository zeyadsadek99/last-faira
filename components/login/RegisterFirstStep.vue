<template>
    <div class="first_step_form_wrapper col-lg-6">
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
            <h2 class="form_title">{{ $t("TITLES.register") }}</h2>
            <h3 class="form_subtitle">{{ $t("TITLES.register_welcome") }}</h3>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-4" @submit.prevent="validateFirstStepFormInputs">
                <div class="row justify-content-center">
                    <!-- START:: NAME INPUT GROUP -->
                    <div
                        class="my-3"
                        :class="
                            registerationType == 'parent'
                                ? 'col-lg-12'
                                : 'col-lg-6'
                        "
                    >
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.user_name')"
                                v-model.trim="firstStepData.name"
                            />
                        </div>
                    </div>
                    <!-- END:: NAME INPUT GROUP -->

                    <!-- START:: STUDENT CODE INPUT GROUP -->
                    <div
                        class="col-lg-6 my-3"
                        v-if="registerationType == 'parent'"
                    >
                        <div class="input_wrapper form_repeater">
                            <input
                                type="text"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.student_code')"
                                v-model.trim="
                                    firstStepData.studentCodes[0].studentCode
                                "
                            />

                            <button
                                type="button"
                                class="add_another"
                                @click="addAnotherStudentCode"
                            >
                                <i class="fal fa-plus"></i>
                                {{ $t("BUTTONS.add_another") }}
                            </button>
                        </div>
                    </div>

                    <template v-if="registerationType == 'parent'">
                        <div
                            class="col-lg-6 my-3"
                            v-for="(code, index) in studentCodesShifted"
                            :key="code.id"
                        >
                            <div class="input_wrapper form_repeater">
                                <input
                                    type="text"
                                    class="form-control"
                                    :placeholder="
                                        $t('PLACEHOLDERS.student_code')
                                    "
                                    v-model="
                                        studentCodesShifted[index].studentCode
                                    "
                                />

                                <button
                                    type="button"
                                    class="delete_child"
                                    @click="deleteChild(code.id)"
                                >
                                    <i class="fal fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </template>
                    <!-- END:: STUDENT CODE INPUT GROUP -->

                    <!-- START:: STUDY DEGREE INPUT GROUP -->
                    <div
                        class="col-lg-6 my-3"
                        v-if="registerationType == 'student'"
                    >
                        <div class="input_wrapper select_wrapper">
                            <multiselect
                                v-if="studyDegreesData"
                                v-model="firstStepData.studyDegree"
                                track-by="name"
                                label="name"
                                :placeholder="$t('PLACEHOLDERS.study_degree')"
                                :options="studyDegreesData"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                                @input="
                                    getStudyYears(firstStepData.studyDegree.id)
                                "
                            >
                            </multiselect>
                        </div>
                    </div>
                    <!-- END:: STUDY DEGREE INPUT GROUP -->

                    <!-- START:: STUDY YEAR INPUT GROUP -->
                    <div
                        class="col-lg-6 my-3"
                        v-if="registerationType == 'student'"
                    >
                        <div class="input_wrapper select_wrapper">
                            <multiselect
                                v-model="firstStepData.studyYear"
                                track-by="name"
                                label="name"
                                :placeholder="$t('PLACEHOLDERS.study_year')"
                                :options="studyYearsData"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                            >
                            </multiselect>
                        </div>
                    </div>
                    <!-- END:: STUDY YEAR INPUT GROUP -->

                    <!-- START:: PHONE INPUT GROUP -->
                    <div class="col-lg-6 my-3">
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
                                                    );
                                                    getCities(countryKey.id);
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
                                v-model="firstStepData.phone"
                                @focus="countryKiesMenuIsOpen = false"
                            />
                        </div>
                    </div>
                    <!-- END:: PHONE INPUT GROUP -->

                    <!-- START:: CITY INPUT GROUP -->
                    <div class="col-12 my-3">
                        <div class="input_wrapper select_wrapper">
                            <multiselect
                                v-model="firstStepData.city"
                                track-by="name"
                                label="name"
                                :placeholder="$t('PLACEHOLDERS.city')"
                                :options="citiesData"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                            >
                            </multiselect>
                        </div>
                    </div>
                    <!-- END:: CITY INPUT GROUP -->

                    <!-- START:: PASSWORD INPUT GROUP -->
                    <div class="col-lg-6 my-3">
                        <div class="input_wrapper password_input_wrapper">
                            <input
                                type="password"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.password')"
                                v-model.trim="firstStepData.password"
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
                    <div class="col-lg-6 my-3">
                        <div class="input_wrapper password_input_wrapper">
                            <input
                                type="password"
                                class="form-control"
                                :placeholder="
                                    $t('PLACEHOLDERS.confirm_password')
                                "
                                v-model.trim="firstStepData.confirmPassword"
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

                    <!-- START:: POLICY TITLE -->
                    <div class="col-lg-7 my-3">
                        <p class="policy_title">
                            بمجرد إنشاء الحساب هذا دليل على موافقتك على
                            <button type="button" @click="toggleTermsModal">
                                {{ $t("BUTTONS.terms") }}
                            </button>
                            الخاصة بالتطبيق
                        </p>
                    </div>
                    <!-- END:: POLICY TITLE -->

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <div class="col-lg-7 my-3">
                        <div class="btn_wrapper">
                            <button class="w-100 mt-0">
                                {{ $t("BUTTONS.submit") }}
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
            <router-link to="/login" class="register_route mt-0">
                <span>{{ $t("BUTTONS.have_account") }}</span>
                <span> {{ $t("BUTTONS.login") }}</span>
            </router-link>
            <!-- END:: LOGIN ROUTE WRAPPER -->
        </div>
        <!-- END:: FORM -->

        <!-- START:: TERMS MODAL -->
        <TermsAndConditionsModal
            :modalApperanceData="termsModalIsOpen"
            @controleModalApperance="toggleTermsModal"
        />
        <!-- END:: TERMS MODAL -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING MODALS
import TermsAndConditionsModal from "../modals/TermsModal.vue";
// END:: IMPORTING MODALS

export default {
    name: "RegisterFirstStepForm",

    components: {
        TermsAndConditionsModal,
    },

    computed: {
        // START:: VUEX GET API GETS DATA
        ...mapGetters("ApiGetsModule", [
            "countriesData",
            "citiesData",
            "studyDegreesData",
            "studyYearsData",
        ]),
        // END:: VUEX GET API GETS DATA

        // START:: STUDENTS CODES SHIFTED FIRST DUMMY ELEMENT ARRAY
        studentCodesShifted() {
            return this.firstStepData.studentCodes.filter((item, index) => {
                return index != 0;
            });
        },
        // END:: STUDENTS CODES SHIFTED FIRST DUMMY ELEMENT ARRAY
    },

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: MODALS HANDLING DATA
            termsModalIsOpen: false,
            // END:: MODALS HANDLING DATA

            // START:: REGISTER TYPE DATA
            registerationType: this.$route.params.user_type,
            // END:: REGISTER TYPE DATA

            // START:: COUNTRIES KEYS MENU HANDLING DATA
            countryKiesMenuIsOpen: false,
            // END:: COUNTRIES KEYS MENU HANDLING DATA

            // START:: FIRST STEP DATA
            firstStepData: {
                name: null,
                countryId: null,
                studyDegree: null,
                studentCodes: [
                    {
                        id: 1,
                        studentCode: null,
                    },
                ],
                studyYear: null,
                phone: null,
                city: null,
                password: null,
                confirmPassword: null,
            },
            // END:: FIRST STEP DATA
        };
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: VUEX API GETS ACTIONS
        ...mapActions("ApiGetsModule", [
            "getCountries",
            "getCities",
            "changeSelectedPhoneCode",
            "getStudyDegrees",
            "getStudyYears",
        ]),
        // END:: VUEX API GETS ACTIONS

        // START:: TOGGLE TERMS MODAL METHOD
        toggleTermsModal() {
            this.termsModalIsOpen = !this.termsModalIsOpen;
        },
        // END:: TOGGLE TERMS MODAL METHOD

        // START:: TOGGLE COUNTRIES KEYS MENU
        toggleCountryKeysMenu() {
            this.countryKiesMenuIsOpen = !this.countryKiesMenuIsOpen;
        },
        // END:: TOGGLE COUNTRIES KEYS MENU

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

        // START:: ADD ANOTHER STUDENT CODE
        addAnotherStudentCode() {
            this.firstStepData.studentCodes.push({
                id: Date.now(),
                studentCode: null,
            });
        },
        // END:: ADD ANOTHER STUDENT CODE

        // START:: DELETE CHILD CODE
        deleteChild(codeId) {
            let newArr = this.firstStepData.studentCodes.filter(
                (element) => element.id != codeId
            );
            this.firstStepData.studentCodes = newArr;
        },
        // END:: DELETE CHILD CODE

        // START:: SET STUDENT CODE
        setUserCode(e) {
            this.firstStepData.studentCodes.push(e.target.value);
        },
        // END:: SET STUDENT CODE

        // START:: VALIDATE FIRST STEP FORM INPUTS
        validateFirstStepFormInputs() {
            this.isWaitingRequest = true;

            if (!this.firstStepData.name) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (
                this.registerationType == "parent" &&
                !this.firstStepData.studentCodes[0].studentCode
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.student_code"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (
                this.registerationType == "student" &&
                !this.firstStepData.studyYear
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.study_year"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (
                this.registerationType == "student" &&
                !this.firstStepData.studyDegree
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.study_degree"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.firstStepData.phone) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone_number"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.firstStepData.city) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.select_city"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.firstStepData.password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.firstStepData.password.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.firstStepData.confirmPassword) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.firstStepData.confirmPassword.length < 6) {
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
                this.firstStepData.password !=
                this.firstStepData.confirmPassword
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
                this.submitFirstStepForm();
            }
        },
        // END:: VALIDATE FIRST STEP FORM INPUTS

        // START:: SUBMIT FIRST STEP FORM
        submitFirstStepForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            // END:: APPEND STATIC DATA

            // START:: APPEND GENERAL DATA
            theData.append("fullname", this.firstStepData.name);
            theData.append("country_id", this.countriesData.selectedCountry.id);
            theData.append(
                "phone",
                this.firstStepData.phone.replace(/^[0.]+/, "")
            );
            theData.append("city_id", this.firstStepData.city.id);
            theData.append("password", this.firstStepData.password);
            theData.append(
                "password_confirmation",
                this.firstStepData.confirmPassword
            );
            // END:: APPEND GENERAL DATA

            // START:: CHECK REGISTERATION TYPE
            if (this.registerationType == "parent") {
                // START:: APPEND PARENT DATA
                let childrenCodes = this.firstStepData.studentCodes;
                childrenCodes.forEach((item, index) => {
                    theData.append(
                        `studentIds[${index}][student_id]`,
                        item.studentCode
                    );
                });
                // END:: APPEND PARENT DATA

                // START:: SEND REQUEST
                this.$axios
                    .post("parent/register", theData, {
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
                            message: res.data.message,
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });

                        // START:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_user_id",
                            res.data.data.id
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_country_id",
                            res.data.data.country.id
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_phone",
                            res.data.data.phone
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_phone_and_key",
                            res.data.data.country.key + res.data.data.phone
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_verification_code",
                            res.data.data.code
                        );
                        // END:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE

                        this.clearFirstStepFormData();
                        this.$router.replace(
                            "/phone-verification/activate-account"
                        );
                        return;
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
                // END:: SEND REQUEST
            } else if (this.registerationType == "student") {
                // START:: APPEND STUDENT DATA
                theData.append("degree_id", this.firstStepData.studyDegree.id);
                theData.append(
                    "academic_year_id",
                    this.firstStepData.studyYear.id
                );
                // END:: APPEND STUDENT DATA

                // START:: SEND REQUEST
                this.$axios
                    .post("student/register", theData, {
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
                            message: res.data.message,
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        // START:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_user_id",
                            res.data.data.id
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_country_id",
                            res.data.data.country.id
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_phone",
                            res.data.data.phone
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_registered_user_phone_and_key",
                            res.data.data.country.key + res.data.data.phone
                        );
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_verification_code",
                            res.data.data.code
                        );
                        // END:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE

                        this.clearFirstStepFormData();
                        this.$router.replace(
                            "/phone-verification/activate-account"
                        );
                        return;
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
                // END:: SEND REQUEST
            } else if (this.registerationType == "teacher") {
                this.isWaitingRequest = false;

                this.$axios
                    .post("teacher/register", theData, {
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
                        this.$iziToast.success({
                            timeout: 2000,
                            message: res.data.message,
                            messageSize: "22",
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        // START:: LOCAL STORAGE SET REGISTERED USER DATA
                        this.setAuthenticatedUserData({
                            type: res.data.data.user_type,
                            token: res.data.data.token.access_token,
                        });
                        localStorage.setItem(
                            "elmo3lm_elmosa3d_user_id",
                            res.data.data.id
                        );
                        // END:: LOCAL STORAGE SET REGISTERED USER DATA
                        this.clearFirstStepFormData();
                        this.$router.replace("/register-second-step");
                        return;
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
            }
            // END:: CHECK REGISTERATION TYPE
        },
        // END:: SUBMIT FIRST STEP FORM

        // START:: CLEAR FIRST STEP FORM DATA
        clearFirstStepFormData() {
            this.firstStepData.phone = null;
            this.firstStepData.password = null;
        },
        // END:: CLEAR FIRST STEP FORM DATA
    },

    mounted() {
        // START:: FIRE METHODS
        this.getCountries();
        setTimeout(() => {
            if (this.countriesData) {
                this.getCities(this.countriesData?.selectedCountry?.id);
            }
        }, 900);
        this.getStudyDegrees();
        // END:: FIRE METHODS
    },
};
</script>
