<template>
      <div class="d-flex align-center ml-5">
        <h2>Home Component</h2>
      </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  data: () => ({
    })
}
</script>
