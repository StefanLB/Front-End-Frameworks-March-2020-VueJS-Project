<template>
  <v-app>
    <app-header></app-header>
    <app-loading></app-loading>
    <div>
      <app-left-navigation></app-left-navigation>
      <router-view class="app-body"></router-view>
    </div>
    <app-footer></app-footer>
  </v-app>
</template>


<script>
import AppHeader from "./components/shared/Header.vue";
import AppFooter from "./components/shared/Footer.vue";
import AppLoading from "./components/shared/Loading.vue";
import AppLeftNavigation from "./components/shared/LeftNavigation";

export default {
  components: {
    AppHeader,
    AppFooter,
    AppLoading,
    AppLeftNavigation
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  margin-bottom: 120px;
}
</style>