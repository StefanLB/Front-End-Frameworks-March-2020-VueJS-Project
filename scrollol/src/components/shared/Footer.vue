<template>
  <v-footer class="v-footer" absolute dark padless>
    <v-card class="flex" flat tile justify-content: center>
      <v-card-title class="teal soc-icon">
        <v-btn class="mx-4" dark icon>
          <a class="soc-icon" href="https://www.facebook.com/">
            <v-icon size="32px">fab fa-facebook</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a class="soc-icon" href="https://www.twitter.com/">
            <v-icon size="32px">fab fa-twitter</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a class="soc-icon" href="https://github.com/StefanLB/">
            <v-icon size="32px">fab fa-github</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a class="soc-icon" href="https://www.linkedin.com/">
            <v-icon size="32px">fab fa-linkedin</v-icon>
          </a>
        </v-btn>
        <v-btn class="mx-4" dark icon>
          <a class="soc-icon" href="https://www.instagram.com/">
            <v-icon size="32px">fab fa-instagram</v-icon>
          </a>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center teal">
        © {{ new Date().getFullYear() }} Copyright: SoftUni Front-End Frameworks - Vue.js
        <div>
          <router-link to="/about" class="footer-nav">About |</router-link><router-link to="/contact" class="footer-nav"> Contact Us</router-link>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.soc-icon {
  justify-content: center;
  color: whitesmoke;
  padding: 12px;
}
.footer-nav {
  color: whitesmoke;
}
</style>