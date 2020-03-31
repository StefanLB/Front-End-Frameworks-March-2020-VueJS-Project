<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name" required></v-text-field>

          <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name" required></v-text-field>

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

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            :rules="passwordRules"
            required
            :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
            :type="confirmPasswordShow ? 'text' : 'password'"
            @click:append="confirmPasswordShow = !confirmPasswordShow"
          ></v-text-field>

          <v-btn :disabled="!valid" color="success" @click="validateAndRegister">Register</v-btn>

          <v-btn class="error" color="error" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signUp } from "../../services/auth.service";

export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    firstName: "",
    firstNameRules: [
      v => !!v || "First Name is required",
      v => /.{3,}/.test(v) || "First Name must be at least 3 symbols long"
    ],
    lastName: "",
    lastNameRules: [
      v => !!v || "Last Name is required",
      v => /.{3,}/.test(v) || "Last Name must be at least 3 symbols long"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [v => !!v || "Password and Confirm password Required"]
  }),
  methods: {
    validateAndRegister() {
      if (this.$refs.form.validate()) {
        this.registerWithFirebase();
        this.reset();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    async registerWithFirebase() {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        };
        await signUp(user);
      }
    }
  };
</script>

<style scoped>
.error {
  margin-left: 8px;
}
</style>