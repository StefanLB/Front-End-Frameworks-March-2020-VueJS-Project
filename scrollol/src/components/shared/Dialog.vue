<template>
  <v-row justify="center">
    <v-dialog v-model="data.visible" max-width="290">
      <v-card>
        <v-card-title class="headline">{{data.title}}</v-card-title>

        <v-card-text>{{data.content}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="closeAndReturnResult(false)">Cancel</v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="closeAndReturnResult(true)"
          >{{data.confirmButtonName}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    data: {
      visible: Boolean,
      title: "",
      content: "",
      confirmButtonName: ""
    }
  },
  methods: {
    closeAndReturnResult(result) {
      this.$emit("dialog-result", result);
      this.data.visible = false;
    }
  }
};
</script>