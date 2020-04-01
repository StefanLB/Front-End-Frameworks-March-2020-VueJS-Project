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
        floating
      >
        <v-list dense nav class="py-0">
          <v-list-item class="categories">
            <v-list-item-icon>
              <v-icon>mdi-grid</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>CATEGORIES</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in categories" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.category }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>

<script>
import { getCategories } from "../../services/firestore.service";

export default {
  data() {
    return {
      drawer: true,
      categories: []
    };
  },
  created: function() {
    this.$bind("categories", getCategories());
  }
};
</script>

<style lang="scss" scoped>
.left-nav {
  margin-top: 48px;
}

.categories {
  margin-top: 20px;
}
</style>