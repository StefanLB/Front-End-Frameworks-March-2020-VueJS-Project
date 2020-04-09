<template>
  <v-card>
    <v-snackbar v-model="visible" bottom right :color="color" :timeout="timeout">
      {{ content }}
      <v-btn dark text @click="visible = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      visible: false,
      timeout: 3000,
      content: "",
      color: ""
    };
  },
  methods: {
    showSnackBar(snackbarData) {
      this.content = snackbarData.content;
      this.color = snackbarData.color;
      this.visible = true;
    }
  },
  mounted: function() {
    this.$root.$on("show-snackbar", this.showSnackBar);
  }
};
</script>