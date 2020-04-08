<template>
<div class=about-us-container>
  <v-card class="about-us">
    <v-card-title>
      <v-avatar class="about-header-image"></v-avatar>
      <v-card-title>About Us</v-card-title>
    </v-card-title>
    <v-img src="../assets/about.png" alt="About"></v-img>
    <v-card-text>
      <p>
        Want to relax and maybe have a good laugh after a long hard day at work? <span
          style="color: green;">Scroll through our fine collection of images and gifs!</span>
      </p>
      <p>
        Want to share with the world the funniest picture you've ever seen? The cutest "pupper" that ever existed? The "dankest" meme since 2011?
        <span
          style="color: green;">Post it here and see what others think of it!</span>
      </p>
      <div style="text-align: center;">
          <div><v-icon color="blue" small>mdi-music-note</v-icon><v-icon color="blue" small>mdi-music-note</v-icon><v-icon color="blue" small>mdi-music-note</v-icon></div>
          <div> Want to be the very best?</div>
          <div>Like no one ever was?</div>
          <div>To browse them is your real test</div>
          <div>To rate them is your cause</div>
          <div><v-icon color="blue" small>mdi-music-note</v-icon><v-icon color="blue" small>mdi-music-note</v-icon><v-icon color="blue" small>mdi-music-note</v-icon></div>
      </div>
      <div style="margin-top: 12px;">
          <span style="color: green;">Don't forget to tell a friend!</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" @click="goBack()">COUNTRY ROADS</v-btn>
      <v-btn color="error" @click="goBack()">TAKE ME HOME</v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>
.about-us-container {
    padding: 25px 40px 0;
    margin-bottom: 40px;
  }

  .about-us {
    margin: auto;
    width: 50%;
  }
  
  .about-header-image {
    background-image: url('../assets/joker-hat.svg');
    background-size: cover;
  }

  .piper {
      color: red;
      font-weight:bold;
  }
</style>