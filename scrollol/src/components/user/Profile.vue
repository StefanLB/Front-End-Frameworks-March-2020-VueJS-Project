<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 md10>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card class="profile-card">
            <v-card-title>User Profile</v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md1>
                  <v-avatar class="profile" color="grey" size="64">
                    <v-img :lazy-src="photoUrl"></v-img>
                  </v-avatar>
                </v-flex>
                <v-flex xs12 md5>
                  <v-text-field
                    v-model="user.firstName"
                    :rules="firstNameRules"
                    label="First Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md5>
                  <v-text-field
                    v-model="user.lastName"
                    :rules="lastNameRules"
                    label="Last Name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="email" label="E-mail" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="user.phoneNumber" :rules="phoneRules" label="Phone Number" required></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="photoUrl"
                    :rules="photoUrlRules"
                    label="Photo URL"
                    required
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
import firebase from "firebase/app";
import { updateUser } from "../../services/auth.service";
import { getMyProfile } from "../../services/firestore.service";

export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    user: {
      firstName: null,
      lastName: null,
      phoneNumber: null
    },
    firstNameRules: [
      v => !!v || "First Name is required",
      v => /.{3,}/.test(v) || "First Name must be at least 3 symbols long"
    ],
    lastNameRules: [
      v => !!v || "Last Name is required",
      v => /.{3,}/.test(v) || "Last Name must be at least 3 symbols long"
    ],
    email: null,
    phoneRules: [
      v => !!v || "Phone number is required",
      v => /^\+[0-9]+$/.test(v) || "Phone number must start with '+' and contain only digits after."
    ],
    photoUrl: null,
    photoUrlRules: [
      v => !!v || "Photo URL is required",
      v => /^http[s]{0,1}:\/\/.*$/.test(v) || "Photo URL must start with 'http://' or 'https://'"
    ]
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
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        photoURL: this.photoUrl
      };
      await updateUser(user);
    }
  },
  created: function() {
    this.$bind("user", getMyProfile());
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.email = user.email;
        this.photoUrl = user.photoURL;
      }
    });
  }
};
</script>

<style scoped>
.profile-card {
  padding: 12px;
  margin-top: 60px;
}

.buttons {
  text-align: center;
}

.error {
  margin-left: 8px;
}
</style>