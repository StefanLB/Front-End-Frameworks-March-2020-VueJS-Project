<template>
  <v-app>
      <app-header></app-header>
        <router-view></router-view>
      <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/shared/Header.vue";
import AppFooter from "./components/shared/Footer.vue";

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
