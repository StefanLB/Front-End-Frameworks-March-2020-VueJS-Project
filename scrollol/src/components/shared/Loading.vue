<template>
  <v-dialog v-model="showLoading" persistent width="300">
    <v-card class="pt-4">
      <v-card-text>
        <v-progress-linear indeterminate class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

const getters = {
  showLoading: state => state.showLoading
};

const mutations = {
  SHOW_LOADING(state, value) {
    state.showLoading = value;
  }
};

const state = {
  showLoading: false
};

export default {
  // computed: mapGetters(["showLoading"]),
  state,
  getters,
  mutations
};
</script>
