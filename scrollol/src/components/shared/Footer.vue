<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile justify-content: center>
      <v-card-title class="teal soc-icon">
        <v-btn class="mx-4" dark icon>
          <a href="https://www.facebook.com/">
            <v-icon size="32px">fab fa-facebook</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a href="https://www.twitter.com/">
            <v-icon size="32px">fab fa-twitter</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a href="https://github.com/StefanLB/">
            <v-icon size="32px">fab fa-github</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a href="https://www.linkedin.com/">
            <v-icon size="32px">fab fa-linkedin</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a href="https://www.instagram.com/">
            <v-icon size="32px">fab fa-instagram</v-icon>
          </a>
        </v-btn>
      </v-card-title>

      <v-card-text
        class="py-2 white--text text-center"
      >© {{ new Date().getFullYear() }} Copyright: SoftUni Front-End Frameworks - Vue.js</v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped>
.soc-icon {
  justify-content: center;
}
a {
  color: whitesmoke;
}
</style>