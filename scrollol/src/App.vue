<template>
  <v-app>
    <app-header></app-header>
    <div class="app-body">
      <app-loader></app-loader>
      <router-view></router-view>
    </div>
    <app-snackbar></app-snackbar>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/shared/Header.vue";
import AppFooter from "./components/shared/Footer.vue";
import AppLoader from "./components/shared/Loader.vue";
import AppSnackbar from "./components/shared/Snackbar.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppLoader,
    AppSnackbar
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  margin-bottom: 120px;
  margin-top: 51px;
  padding: 0px;
}

.theme--light.v-application {
  background-color: #F2EDE8;
}
</style>