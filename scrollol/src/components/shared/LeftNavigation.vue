<template>
  <v-container>
    <v-card max-width="250">
      <v-navigation-drawer
        v-model="drawer"
        color="teal"
        expand-on-hover
        fixed
        class="left-nav"
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://www.yourfirstpatient.com/assets/default-user-avatar-thumbnail@2x-ad6390912469759cda3106088905fa5bfbadc41532fbaa28237209b1aa976fc9.png">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        color: 'teal',
      }
    }
  }
</script>

<style lang="scss" scoped>
.left-nav {
    margin-top: 48px;
}

// @media ()
// <style>
// .container {
//     max-width: 1185px;
// }
</style>