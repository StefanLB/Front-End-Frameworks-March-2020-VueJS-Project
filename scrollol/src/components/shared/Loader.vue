<template>
  <v-progress-linear
    v-if="state"
    :indeterminate="true"
    class="ma-0 loader-indeterminate"
    height="5"
    color="#FFAA00"
    style="top: -1px;"
  ></v-progress-linear>
</template>

<script>
import { getLoaderState } from "../../services/loader.service";

export default {
  name: "Loader",
  computed: {
    state: function() {
      return getLoaderState();
    }
  }
};
</script>

<style scoped>
.loader-indeterminate {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>