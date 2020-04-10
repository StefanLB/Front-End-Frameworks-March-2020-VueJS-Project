<template>
<div class="contact-container">
<v-card class="contact-us">
    <v-card-title>
        <v-avatar class="contact-header-image"></v-avatar>
        <v-card-title>Contact Us</v-card-title>
        <v-card-text>Below are our contact details</v-card-text>
    </v-card-title>
    <v-img src="../assets/contact.jpg" alt="contact"></v-img>
    <v-card-text>
        <p class="contact-info">
            <v-icon>phone</v-icon> <span class="contactInfo">+359 888 123 456</span>
            <v-divider></v-divider>
        </p>
        <p class="contact-info">
            <v-icon>email</v-icon> <span class="contactInfo"> <a href="mailto:info@scrollol.com">info@scrollol.com</a></span>
            <v-divider></v-divider>
        </p>
        <p class="contact-info">
            <v-icon>my_location</v-icon> <span class="contactInfo"> <a href="https://en.wikipedia.org/wiki/Area_51">37°14′0″N 115°48′30″W</a>, Nevada, United States</span>
        </p>
    </v-card-text>
</v-card>
</div>
</template>

<style lang="scss" scoped>
.contact-container {
  padding: 25px 40px 0;
  margin-bottom: 40px;
}

.contact-us {
    margin: auto;
    width: 50%;
  }
  
  .contact-header-image {
    background-image: url('../assets/joker-hat.svg');
    background-size: cover;
  }


.contactInfo {
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.v-card__text {
    margin-top: 12px;
}
</style>