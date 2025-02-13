<template>
    <div class="second_step_form_wrapper col-lg-6">
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

        <div class="form_wrapper">
            <form class="mt-4" @submit.prevent="validateSecondStepFormInputs">
                <div class="row justify-content-center">
                    <!-- START:: LICENCE NUMBER INPUT GROUP -->
                    <div class="col-lg-6 my-3">
                        <div class="input_wrapper">
                            <input
                                type="number"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.licence_number')"
                                v-model.trim="secondStepData.licenceNumber"
                            />
                        </div>
                    </div>
                    <!-- END:: LICENCE NUMBER INPUT GROUP -->

                    <!-- START:: FACULTY INPUT GROUP -->
                    <div class="col-lg-6 my-3">
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.faculty')"
                                v-model.trim="secondStepData.faculty"
                            />
                        </div>
                    </div>
                    <!-- END:: FACULTY INPUT GROUP -->

                    <div class="col-12 p- 0 form_repeater_wrapper">
                        <div class="row">
                            <!-- START:: STUDY DEGREE INPUT GROUP -->
                            <div class="col-lg-6 my-3">
                                <div class="input_wrapper select_wrapper">
                                    <multiselect
                                        v-if="studyDegreesData"
                                        v-model="
                                            secondStepData.studyDegree[0].degree
                                        "
                                        :open-direction="'bottom'"
                                        track-by="name"
                                        label="name"
                                        :placeholder="
                                            $t('PLACEHOLDERS.study_degree')
                                        "
                                        :options="studyDegreesData"
                                        :searchable="true"
                                        :allow-empty="false"
                                        :show-labels="false"
                                        @input="
                                            getSpecializations(
                                                secondStepData.studyDegree[0]
                                                    .degree.id
                                            );
                                            secondStepData.studyDegree[0].specializations =
                                                [];
                                        "
                                    >
                                    </multiselect>
                                </div>
                            </div>
                            <!-- END:: STUDY DEGREE INPUT GROUP -->

                            <!-- START:: TEACHER SPECIALTY INPUT GROUP -->
                            <div class="col-lg-6 my-3">
                                <div
                                    class="input_wrapper select_wrapper form_repeater"
                                >
                                    <multiselect
                                        v-model="
                                            secondStepData.studyDegree[0]
                                                .specializations
                                        "
                                        :open-direction="'bottom'"
                                        track-by="name"
                                        label="name"
                                        :placeholder="
                                            $t('PLACEHOLDERS.teacher_specialty')
                                        "
                                        :options="specializationsData"
                                        :searchable="true"
                                        :allow-empty="false"
                                        :show-labels="false"
                                        :multiple="true"
                                        :allowEmpty="true"
                                    >
                                    </multiselect>

                                    <button
                                        type="button"
                                        class="add_another"
                                        @click="addAnotherDegree"
                                    >
                                        <i class="fal fa-plus"></i>
                                        {{ $t("BUTTONS.add_another") }}
                                    </button>
                                </div>
                            </div>
                            <!-- END:: TEACHER SPECIALTY  INPUT GROUP -->
                        </div>

                        <div
                            class="row"
                            v-for="(degree, index) in degreesShifted"
                            :key="degree.id"
                        >
                            <!-- START:: STUDY DEGREE INPUT GROUP -->
                            <div class="col-lg-6 my-3">
                                <div class="input_wrapper select_wrapper">
                                    <multiselect
                                        v-if="studyDegreesData"
                                        v-model="degreesShifted[index].degree"
                                        :open-direction="'bottom'"
                                        track-by="name"
                                        label="name"
                                        :placeholder="
                                            $t('PLACEHOLDERS.study_degree')
                                        "
                                        :options="studyDegreesData"
                                        :searchable="true"
                                        :allow-empty="false"
                                        :show-labels="false"
                                        @input="
                                            getSpecializations(
                                                degreesShifted[index].degree.id
                                            );
                                            degreesShifted[
                                                index
                                            ].specializations = [];
                                        "
                                    >
                                    </multiselect>
                                </div>
                            </div>
                            <!-- END:: STUDY DEGREE INPUT GROUP -->

                            <!-- START:: TEACHER SPECIALTY INPUT GROUP -->
                            <div class="col-lg-6 my-3">
                                <div
                                    class="input_wrapper select_wrapper form_repeater"
                                >
                                    <multiselect
                                        v-model="
                                            degreesShifted[index]
                                                .specializations
                                        "
                                        :open-direction="'bottom'"
                                        track-by="name"
                                        label="name"
                                        :placeholder="
                                            $t('PLACEHOLDERS.teacher_specialty')
                                        "
                                        :options="specializationsData"
                                        :searchable="true"
                                        :allow-empty="false"
                                        :show-labels="false"
                                        :multiple="true"
                                        :allowEmpty="true"
                                    >
                                    </multiselect>

                                    <button
                                        type="button"
                                        class="delete_child"
                                        @click="deleteChild(degree.id)"
                                    >
                                        <i class="fal fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- END:: TEACHER SPECIALTY  INPUT GROUP -->
                        </div>
                    </div>

                    <!-- START:: FACULTY INPUT GROUP -->
                    <div class="col-lg-12 my-3">
                        <div class="input_wrapper">
                            <textarea
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.note')"
                                v-model.trim="secondStepData.note"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <!-- END:: FACULTY INPUT GROUP -->

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
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "RegisterSecondStepForm",

    computed: {
        // START:: VUEX GET API GETS DATA
        ...mapGetters("ApiGetsModule", [
            "studyDegreesData",
            "specializationsData",
        ]),
        // END:: VUEX GET API GETS DATA

        // START:: STUDY DEGREES SHIFTED FIRST DUMMY ELEMENT ARRAY
        degreesShifted() {
            return this.secondStepData.studyDegree.filter((item, index) => {
                return index != 0;
            });
        },
        // END:: STUDY DEGREES SHIFTED FIRST DUMMY ELEMENT ARRAY
    },

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            specialties: [],

            // START:: SECOND STEP DATA
            secondStepData: {
                licenceNumber: null,
                // teacherSpecialty: null,
                studyDegree: [
                    {
                        id: 1,
                        degree: null,
                        specializations: [],
                    },
                ],
                faculty: null,
                note: null,
            },
            // END:: SECOND STEP DATA
        };
    },

    methods: {
        // START:: VUEX API GETS ACTIONS
        ...mapActions("ApiGetsModule", [
            "getStudyDegrees",
            "getSpecializations",
        ]),
        // END:: VUEX API GETS ACTIONS

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

        // START:: ADD ANOTHER DEGREE
        addAnotherDegree() {
            this.secondStepData.studyDegree.push({
                id: Date.now(),
                degree: null,
                specializations: [],
            });
        },
        // END:: ADD ANOTHER DEGREE

        // START:: DELETE CHILD DEGREE
        deleteChild(degreeId) {
            let newArr = this.secondStepData.studyDegree.filter(
                (element) => element.id != degreeId
            );
            this.secondStepData.studyDegree = newArr;
        },
        // END:: DELETE CHILD DEGREE

        // START:: VALIDATE FIRST STEP FORM INPUTS
        validateSecondStepFormInputs() {
            this.isWaitingRequest = true;

            if (!this.secondStepData.licenceNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.licence_number"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (
                this.secondStepData.studyDegree[0].specializations.length == 0
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.teacher_specialty"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.secondStepData.studyDegree[0].degree) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.study_degree"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.secondStepData.faculty) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.faculty"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.secondStepData.note) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.note"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitSecondStepForm();
            }
        },
        // END:: VALIDATE FIRST STEP FORM INPUTS

        // START:: SUBMIT FIRST STEP FORM
        submitSecondStepForm() {
            this.isWaitingRequest = false;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            // END:: APPEND STATIC DATA

            // START:: APPEND TEACHER DATA
            theData.append("university", this.secondStepData.faculty);
            this.secondStepData.studyDegree.forEach((element, index) => {
                theData.append(
                    `degreeIds[${index}][degree_id]`,
                    element.degree.id
                );
                theData.append(
                    `specializationIds[${index}][degree_id]`,
                    element.degree.id
                );
                element.specializations.forEach(
                    (specializationsElement, index) => {
                        theData.append(
                            `specializationIds[${index}][specialization_id]`,
                            specializationsElement.id
                        );
                    }
                );
            });
            theData.append(
                "professional_license_number",
                this.secondStepData.licenceNumber
            );
            theData.append("desc", this.secondStepData.note);
            // END:: APPEND TEACHER DATA

            // START:: SEND REQUEST
            this.$axios
                .post("teacher/complate_register", theData, {
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
                    // START:: LOCAL STORAGE DELETE PREVIOUS STEP DATA
                    localStorage.removeItem("elmo3lm_elmosa3d_user_type");
                    localStorage.removeItem("elmo3lm_elmosa3d_user_token");
                    // END:: LOCAL STORAGE DELETE PREVIOUS STEP DATA

                    // START:: LOCAL STORAGE SET REGISTERED USER PHONE AND VERIFY CODE
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

                    this.$router.replace(
                        "/phone-verification/activate-account"
                    );
                    this.clearSecondStepFormData();
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
        // END:: SUBMIT FIRST STEP FORM

        // START:: CLEAR FIRST STEP FORM DATA
        clearSecondStepFormData() {
            this.secondStepData.licenceNumber = null;
            this.secondStepData.teacherSpecialty = null;
            this.secondStepData.studyDegree = null;
            this.secondStepData.faculty = null;
            this.secondStepData.note = null;
        },
        // END:: CLEAR FIRST STEP FORM DATA
    },

    mounted() {
        // START:: FIRE METHODS
        this.getStudyDegrees();
        // END:: FIRE METHODS
    },
};
</script>
