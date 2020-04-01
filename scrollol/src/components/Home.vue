<template>
      <div class="d-flex align-center ml-5">
        <all-lols :lols="lols"></all-lols>
      </div>
</template>

<script>
import { getLols } from "../services/firestore.service";
import AllLols from "./lols/AllLols" ;

export default {
  name: "Home",
  components: { AllLols },
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
