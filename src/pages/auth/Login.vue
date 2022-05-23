<!-- eslint-disable -->
<template>
<div class="auth-wrapper auth-v1">
    <div class="auth-inner">
        <v-card class="auth-card">
            <!-- logo -->
            <v-card-title class="d-flex align-center justify-center py-7">
                <router-link to="/" class="d-flex align-center">
                    <v-img :src="require('@/assets/images/logos/logo.svg')" max-height="30px" max-width="30px" alt="logo" contain class="me-3"></v-img>

                    <h2 class="text-2xl font-weight-semibold">Materio</h2>
                </router-link>
            </v-card-title>

            <!-- title -->
            <v-card-text>
                <p class="text-2xl font-weight-semibold text--primary mb-2">
                    Welcome to Materio! 👋🏻
                </p>
                <p class="mb-2">Please sign-in to your account and start the adventure</p>
            </v-card-text>

            <!-- login form -->
            <v-card-text>
                <v-form action="post" @submit.prevent="onLogin()">
                    <v-text-field v-model="userData.email" required outlined label="Email" placeholder="john@example.com" hide-details class="mb-3"></v-text-field>
                    <div v-if="errorEmail" style="color: red">{{ errorEmail }}</div>
                    <v-text-field v-model="userData.password" required outlined :type="isPasswordVisible ? 'text' : 'password'" label="Password" placeholder="············" :append-icon="
                isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
              " hide-details @click:append="isPasswordVisible = !isPasswordVisible"></v-text-field>
                    <div v-if="errorPassword != null" style="color: red">
                        {{ errorPassword.length }}
                    </div>

                    <div class="d-flex align-center justify-space-between flex-wrap">
                        <v-checkbox label="Remember Me" hide-details class="me-3 mt-1">
                        </v-checkbox>

                        <!-- forgot link -->
                        <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a>
                    </div>

                    <v-btn block color="primary" type="submit" class="mt-6"> Login </v-btn>
                </v-form>
            </v-card-text>

            <!-- divider -->
            <v-card-text class="d-flex align-center mt-2">
                <v-divider></v-divider>
                <span class="mx-5">or</span>
                <v-divider></v-divider>
            </v-card-text>

            <!-- social links -->
            <v-card-actions class="d-flex justify-center">
                <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
                    <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
                        {{ link.icon }}
                    </v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="173" :src="
        require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)
      " />

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
</div>
</template>

<script>
/* eslint-disable */
import {
    mdiFacebook,
    mdiTwitter,
    mdiGithub,
    mdiGoogle,
    mdiEyeOutline,
    mdiEyeOffOutline,
} from "@mdi/js";
import {
    ref
} from "@vue/composition-api";
import {
    mapActions,
    mapGetters
} from "vuex";
import {
    LOGIN_ACTION,
    GET_USER_TOKEN_GETTER,
IS_USER_AUTHENTICATED_GETTER
} from "../../store/storeConstants";

export default {
    created() {
      // if(this.$store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]){
      //   this.$router.push("/dashboard")

      //   console.log('====================================');
      //   console.log(this.$store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]);
      //   console.log('====================================');
      // }

    },
    data() {
        return {
            errorPassword: null,
            errorEmail: null,
            userData: {
                email: null,
                password: null,
            },
        };
    },
    computed: {
        ...mapGetters("auth", {
            token: GET_USER_TOKEN_GETTER,
        }),
    },
    methods: {
        ...mapActions("auth", {
            login: LOGIN_ACTION,
        }),
        onLogin() {
            if (this.userData.password.length == 0) {
                this.errorPassword = "password is required";
            }
            if (this.userData.email.length == 0) {
                this.errorEmail = "email is required";
            }

            if (this.userData.email.length > 0 && this.userData.password.length > 0) {
                this.errorEmail = null;
                this.errorPassword = null;

                this.login({
                        userData: this.userData
                    })
                    .then((response) => {
                      this.$router.push('/dashboard')
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            }
        },
    },
    setup() {
        const isPasswordVisible = ref(false);
        const email = ref("");
        const password = ref("");
        const socialLink = [{
                icon: mdiFacebook,
                color: "#4267b2",
                colorInDark: "#4267b2",
            },
            {
                icon: mdiTwitter,
                color: "#1da1f2",
                colorInDark: "#1da1f2",
            },
            {
                icon: mdiGithub,
                color: "#272727",
                colorInDark: "#fff",
            },
            {
                icon: mdiGoogle,
                color: "#db4437",
                colorInDark: "#db4437",
            },
        ];

        return {
            isPasswordVisible,
            socialLink,

            icons: {
                mdiEyeOutline,
                mdiEyeOffOutline,
            },
        };
    },
};
</script>

<style lang="scss">
@import "~@/plugins/vuetify/default-preset/preset/pages/auth.scss";
</style>
