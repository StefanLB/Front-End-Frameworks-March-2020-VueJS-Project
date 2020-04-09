<template>
  <div>
    <app-left-navigation @add-filter="addFilter"></app-left-navigation>
    <div class="d-flex align-center ml-5 all-lols">
      <app-all-lols :filterCategory="filterCategory" :lols="lols"></app-all-lols>
    </div>
  </div>
</template>

<script>
import { getLols } from "../services/firestore.service";
import AppAllLols from "./lols/AllLols";
import AppLeftNavigation from "../components/shared/LeftNavigation";
import { changeLoaderState } from "../services/loader.service";

export default {
  name: "Home",
  components: {
    AppAllLols,
    AppLeftNavigation
  },
  data: function() {
    return {
      lols: [],
      filterCategory: null
    };
  },
  created: async function() {
    changeLoaderState();
    this.$bind("lols", await getLols()).then(() => changeLoaderState());
  },
  methods: {
    addFilter(category) {
      this.filterCategory = category;
    }
  }
};
</script>

<style lang="scss" scoped>
.all-lols {
  justify-content: space-evenly;
}
</style>