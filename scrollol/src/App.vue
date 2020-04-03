<template>
  <v-app>
    <app-header></app-header>
    <div class="app-body">
      <app-loader></app-loader>
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/shared/Header.vue";
import AppFooter from "./components/shared/Footer.vue";
import AppLoader from "./components/shared/Loader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppLoader
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  margin-bottom: 120px;
  margin-top: 51px;
}

.v-toolbar__extension {
  padding: 0px !important;
}
</style>