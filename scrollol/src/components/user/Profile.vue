<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card class="profile-card">
            <v-card-title >User Profile</v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md1>
                  <v-avatar class="profile" color="grey" size="64">
                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex xs12 md5>
                  <v-text-field
                    v-model="firstName"
                    :rules="firstNameRules"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md5>
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
                    label="New Password"
                    required
                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                    :type="passwordShow ? 'text' : 'password'"
                    @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm New Password"
                    :rules="passwordRules"
                    required
                    :append-icon="confirmPasswordShow ? 'visibility' : 'visibility_off'"
                    :type="confirmPasswordShow ? 'text' : 'password'"
                    @click:append="confirmPasswordShow = !confirmPasswordShow"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <div class="buttons">
              <v-btn :disabled="!valid" color="success" @click="validateAndUpdate">Update Profile</v-btn>
              <v-btn class="error" color="error" to="/">Cancel</v-btn>
            </div>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { updateUser } from "../../services/auth.service";

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
    validateAndUpdate() {
      if (this.$refs.form.validate()) {
        this.updateProfile();
        this.reset();
      }
    },
    async updateProfile() {
      const user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      await updateUser(user);
    }
  }
};
</script>

<style scoped>
.profile-card {
  padding: 12px;
  margin-top: 60px;
}

.buttons {
    text-align: center
}

.error {
    margin-left: 8px;
}
</style>