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
  // mounted() {
  //   this.scroll();
  // },
  methods: {
    addFilter(category) {
      this.filterCategory = category;
    }
    // async scroll() {
    //   window.onscroll = async () => {
    //     let bottomOfWindow =
    //       document.documentElement.scrollTop + window.innerHeight ===
    //       document.documentElement.offsetHeight;

    //     if (bottomOfWindow) {
    //       console.log('Reached bottom of window!');
    //     }
    //   };
    // }
  }
};
</script>

<style lang="scss" scoped>
.all-lols {
  justify-content: space-evenly;
}
</style>