<template>
  <div id="app">
    <app-header></app-header>
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>


<script>
import AppHeader from './components/shared/Header.vue'

export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
