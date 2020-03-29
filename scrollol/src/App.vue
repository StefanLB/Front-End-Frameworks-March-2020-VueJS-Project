<template>
  <v-app>
    <app-header></app-header>
    <app-loading></app-loading>
    <router-view class="app-body"></router-view>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/shared/Header.vue";
import AppFooter from "./components/shared/Footer.vue";
import AppLoading from "./components/shared/Loading.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppLoading
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  margin-bottom: 120px;
}
</style>