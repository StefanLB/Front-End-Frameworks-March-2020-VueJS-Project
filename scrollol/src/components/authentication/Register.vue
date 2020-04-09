<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card class="register-card">
            <v-card-title>Register</v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="firstName"
                    :rules="firstNameRules"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="lastName"
                    :rules="lastNameRules"
                    label="Last Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field v-model="phone" :rules="phoneRules" label="Phone Number" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="photoUrl"
                    :rules="photoUrlRules"
                    label="Photo URL"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                    :type="passwordShow ? 'text' : 'password'"
                    @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    :rules="passwordRules"
                    required
                    :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                    :type="confirmPasswordShow ? 'text' : 'password'"
                    @click:append="confirmPasswordShow = !confirmPasswordShow"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-card-subtitle
                v-if="showConfirmPasswordError"
                class="errorMessage"
                style="color: darkred;"
              >Password and confirm password must match</v-card-subtitle>
            </v-container>
            <v-btn
              class="reg-button"
              :disabled="!valid"
              color="success"
              @click="validateAndRegister"
            >Register</v-btn>
            <v-btn class="reg-button" color="error" @click="reset">Reset Form</v-btn>
          </v-card>
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
    showConfirmPasswordError: false,
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
    phone: "",
    phoneRules: [
      v => !!v || "Phone number is required",
      v =>
        /^\+[0-9]+$/.test(v) ||
        "Phone number must start with '+' and contain only digits after."
    ],
    photoUrl: "",
    photoUrlRules: [
      v => !!v || "Photo URL is required",
      v =>
        /^http[s]{0,1}:\/\/.*$/.test(v) ||
        "Photo URL must start with 'http://' or 'https://'"
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [v => !!v || "Password and Confirm password Required"]
  }),
  methods: {
    validateAndRegister() {
      if (this.$refs.form.validate()) {
        if (this.password === this.confirmPassword) {
          this.showConfirmPasswordError = false;
          this.registerWithFirebase();
          this.reset();
        } else {
          this.showConfirmPasswordError = true;
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.showConfirmPasswordError = false;
    },
    async registerWithFirebase() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        photoUrl: this.photoUrl,
        password: this.password
      };
      await signUp(user)
        .then(() => {
          this.$root.$emit("show-snackbar", {
            content: "Registered successfully!",
            color: "success"
          });
        })
        .catch(() => {
          this.$root.$emit("show-snackbar", {
            content: "Error during registration!",
            color: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.register-card {
  padding: 12px;
  margin-top: 60px;
}

.reg-button {
  margin-left: 8px;
}

.errorMessage {
  padding: 0px;
}
</style>