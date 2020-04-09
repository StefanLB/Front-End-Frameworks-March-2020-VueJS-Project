<template>
  <v-toolbar class="toolbar" extension-height="0" dense>
    <v-btn class="home-btn" to="/home">
      <v-icon class="mr-2">mdi-script-text-outline</v-icon>
      <v-toolbar-title>
        ScrolLol
      </v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only" v-if="!userLoggedIn">
      <v-btn v-for="item in items" :key="item.title" :to="item.link">
        <v-icon>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn to="/user/profile">Hello, {{getDisplayName}}</v-btn>
      <v-menu
        open-on-hover
        close-on-content-click
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Navigate Lols</v-btn>
        </template>
        <v-list>
          <v-list-item>
            <router-link to="/lols/add">
              <v-list-item-title>ADD LOL</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/user/lols">
              <v-list-item-title>MY LOLS</v-list-item-title>
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link to="/">
              <v-list-item-title>ALL LOLS</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn @click="logoutFromFirebase">
        <v-icon>delete_sweep</v-icon>Logout
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
      updatedDisplayName: null,
    };
  },
  computed: {
    items() {
      let menuItems = [
        {
          title: "Register",
          icon: "face",
          link: "/register"
        },
        {
          title: "Login",
          icon: "no_encryption",
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
      await logOut();
    },
    setDisplayName(newName) {
      this.updatedDisplayName = newName;
    }
  },
  mounted: function() {
    this.$root.$on("dname-changed", this.setDisplayName);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
      } else {
        this.loggedIn = false;
        this.user = null;
      }
    });
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
}

.v-toolbar {
  flex: 0;
}

/deep/ .v-toolbar__content {
  padding: 0px !important;
}

.toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
}
</style>