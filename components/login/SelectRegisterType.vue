<template>
    <div class="select_registeration_type_wrapper col-12">
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
            <h2 class="form_title">{{ $t("TITLES.select_user_type") }}</h2>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <div class="routes_wrapper">
            <div class="container">
                <div class="row">
                    <!-- START:: REGISTER TYPE ROUTE -->
                    <div class="col-lg-4 my-3">
                        <router-link
                            to="/register-first-step/teacher"
                            class="register_type_route"
                        >
                            <h3>{{ $t("TITLES.teacher") }}</h3>
                            <img
                                src="../../assets/media/persons_vectors/teacher.png"
                                alt="Illustration"
                                width="200"
                                height="180"
                            />
                        </router-link>
                    </div>
                    <!-- END:: REGISTER TYPE ROUTE -->

                    <!-- START:: REGISTER TYPE ROUTE -->
                    <div class="col-lg-4 my-3">
                        <router-link
                            to="/register-first-step/student"
                            class="register_type_route"
                        >
                            <h3>{{ $t("TITLES.student") }}</h3>
                            <img
                                src="../../assets/media/persons_vectors/student.png"
                                alt="Illustration"
                                width="160"
                                height="180"
                            />
                        </router-link>
                    </div>
                    <!-- END:: REGISTER TYPE ROUTE -->

                    <!-- START:: REGISTER TYPE ROUTE -->
                    <div class="col-lg-4 my-3">
                        <router-link
                            to="/register-first-step/parent"
                            class="register_type_route"
                        >
                            <h3>{{ $t("TITLES.parent") }}</h3>
                            <img
                                src="../../assets/media/persons_vectors/parent.png"
                                alt="Illustration"
                                width="160"
                                height="180"
                            />
                        </router-link>
                    </div>
                    <!-- END:: REGISTER TYPE ROUTE -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SelectRegisterationType",
};
</script>
