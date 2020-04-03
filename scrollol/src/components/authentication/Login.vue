<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>

              <v-btn :disabled="!valid" color="success" @click="validateAndLogin">Login</v-btn>
              <v-btn color="error" @click="reset">Reset Form</v-btn>
              <v-btn style="float: right;" color="primary" @click="loginGoogle">
                <v-icon>mdi-google</v-icon>Login with Google
              </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signIn, signInGoogle } from "../../services/auth.service";

export default {
  data: () => ({
    passwordShow: false,
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
  methods: {
    validateAndLogin() {
      if (this.$refs.form.validate()) {
        this.loginWithFirebase();
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    async loginWithFirebase() {
      await signIn(this.email, this.password);
    },
    loginGoogle() {
      signInGoogle();
    }
  }
};
</script>

<style scoped>
.error {
  margin-left: 8px;
}
</style>