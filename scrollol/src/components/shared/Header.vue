<template>
  <v-toolbar class="toolbar" elevation="2" dense>
    <v-btn dark elevation="1" class="home-btn" to="/home">
      <v-icon class="mr-2">mdi-script-text-outline</v-icon>
      <v-toolbar-title>ScrolLol</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only" v-if="!userLoggedIn">
      <v-btn dark elevation="1" v-for="item in items" :key="item.title" :to="item.link">
        <v-icon class="icons">{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn dark elevation="1" to="/user/profile">
        <v-icon class="icons">mdi-account</v-icon>
        Hello, {{getDisplayName}}
      </v-btn>
      <v-menu open-on-hover close-on-content-click offset-y>
        <template v-slot:activator="{ on }">
          <v-btn dark elevation="1" v-on="on">
            <v-icon class="icons">mdi-chevron-double-down</v-icon>Navigate Lols
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="navigateTo('/lols/add')">
            <v-list-item-title class="theme">
              <v-icon small class="icons theme">mdi-image-plus</v-icon>ADD LOL
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/user/lols')">
            <v-list-item-title class="theme">
              <v-icon small class="icons theme">mdi-image-multiple</v-icon>MY LOLS
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="navigateTo('/')">
            <v-list-item-title class="theme">
              <v-icon small class="icons theme">mdi-image-search</v-icon>ALL LOLS
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn dark elevation="1" @click="logoutFromFirebase">
        <v-icon class="icons">mdi-logout</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
import firebase from "firebase/app";
import { logOut } from "../../services/auth.service";

export default {
  data() {
    return {
      loggedIn: false,
      user: null,
      updatedDisplayName: null
    };
  },
  computed: {
    items() {
      let menuItems = [
        {
          title: "Register",
          icon: "mdi-account-plus",
          link: "/register"
        },
        {
          title: "Login",
          icon: "mdi-login",
          link: "/login"
        }
      ];
      return menuItems;
    },
    userLoggedIn() {
      return this.loggedIn;
    },
    getDisplayName: function() {
      return this.updatedDisplayName
        ? this.updatedDisplayName
        : this.user.displayName;
    }
  },
  methods: {
    async logoutFromFirebase() {
      await logOut()
        .then(() => {
          this.$root.$emit("show-snackbar", {
            content: "Successfully logged out!",
            color: "#35A0AE"
          });
        })
        .catch(() => {
          this.$root.$emit("show-snackbar", {
            content: "Error logging out!",
            color: "error"
          });
        });
    },
    setDisplayName(newName) {
      this.updatedDisplayName = newName;
    },
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  beforeMount: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
      } else {
        this.loggedIn = false;
        this.user = null;
      }
    });
  },
  mounted: function() {
    this.$root.$on("dname-changed", this.setDisplayName);
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: 46px;
}

.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  height: 46px;
  background-color: #35a0ae;
}

.v-toolbar {
  flex: 0;
}

::v-deep .v-toolbar__content {
  padding: 0px;
  background-color: #35a0ae;
}

.toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
}

.icons {
  margin-right: 8px;
}

.theme {
  color: #35a0ae;
}

.theme:hover {
  color: #ffaa00;
}
</style>