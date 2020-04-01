<template>
      <div class="d-flex align-center ml-5 all-lols">
        <app-all-lols :lols="lols"></app-all-lols>
      </div>
</template>

<script>
import { getLols } from "../services/firestore.service";
import AppAllLols from "./lols/AllLols" ;

export default {
  name: "Home",
  components: { AppAllLols },
  data: function() {
    return {
      size: 520,
      lols: []
    };
  },
  created: function() {
    this.$bind("lols", getLols());
  }
};
</script>

<style lang="scss" scoped>
.all-lols {
  justify-content: space-evenly;
  margin-top: 48px;
}
</style>