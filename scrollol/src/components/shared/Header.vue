<template>
  <!-- display the navigation bar -->
  <v-toolbar>
    <v-toolbar-items>
      <v-btn to="/home" tag="span" style="cursor: pointer">ScrolLol</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <!-- navigation bar links -->
    <v-toolbar-items class="hidden-xs-only" v-if="!userLoggedIn">
      <v-btn v-for="item in items" :key="item.title" :to="item.link">
        <v-icon>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar-items>
    <!-- sign out button -->
    <v-toolbar-items class="hidden-xs-only" v-else>
      <v-btn @click="logoutFromFirebase">
        <v-icon>delete_sweep</v-icon>Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from "firebase/app"

export default {
  data(){
    return {
      user: {
        loggedIn: false,
        data: {}
      }
    }
  },
  computed: {
    items () {
      let menuItems = [
        {
          title: 'Register',
          icon: 'face',
          link: '/register'
        },
        {
          title: 'Login',
          icon: 'no_encryption',
          link: '/login'
        }
      ]
      return menuItems
    },
    userLoggedIn () {
      return this.user.loggedIn
    },
    // firstName() {
    //   if (this.user.data.displayName) {
    //     return this.user.data.displayName.split(' ')[0]
    //   }
    //   return null
    // }
  },
  methods: {
    logoutFromFirebase () {
      firebase.auth().signOut()
      .then(function() {})
      .catch(function(error) {
        console.log(error)});
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.user.loggedIn = true;
        this.user.data = user;
      }
      else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
    })
  }
}
</script>

<style scoped>
.v-toolbar {
  flex: 0;
}
</style>