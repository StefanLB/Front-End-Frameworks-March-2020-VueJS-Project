<template>
  <div class="user-lols">
    <app-stats :totals="totals"></app-stats>
    <h5 class="heading">Manage your content contribution via the below drop-downs</h5>
    <v-expansion-panels v-if="lols" hover>
      <v-expansion-panel v-for="lol of lols" :key="lol.id">
        <v-expansion-panel-header>
          <div style="font-size: large;">{{lol.title}}</div>
          <div class="added-format">Added: {{formatDate(lol.createdOn)}}</div>
          <template v-slot:actions>
            <v-icon color="primary" class="mr-2">mdi-chevron-down-circle</v-icon>
            <v-icon color="error" @click.stop="deleteLol(lol.id)">mdi-close-circle</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row justify="center">
              <v-col cols="auto">
                <div class="subtitle">{{lol.description}}</div>
                <router-link :to="'/lols/details/' + lol.id" target="_blank">
                  <v-img width="500" :src="lol.imageUrl"></v-img>
                </router-link>
                <div class="overline ml-4">Category: {{lol.category}}</div>
              </v-col>
              <v-col cols="auto" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="px-0"></v-col>
                  <v-col class="px-0">
                    <v-btn icon>
                      <v-icon style="color: #1B5E20;">thumb_up</v-icon>
                      <div class="counter">{{lol.likes.length}}</div>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon>
                      <v-icon style="color: #B71C1C;">thumb_down</v-icon>
                      <div class="counter">{{lol.dislikes.length}}</div>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon :to="'/lols/details/' + lol.id" target="_blank">
                      <v-icon
                        v-bind:style="{ color: lol.comments > 0 ? '#0D47A1' : '#64B5F6'}"
                      >comment</v-icon>
                      <div class="counter">{{lol.comments}}</div>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>It seems that you haven't submitted any lols yet... go ahead and do so!</div>
  </div>
</template>

<script>
import { getUserLols } from "../../services/firestore.service";
import { changeLoaderState } from "../../services/loader.service";
import moment from "moment";
import AppStats from "./Stats";

export default {
  components: {
    AppStats
  },
  data: () => ({
    lols: [],
    totals: {
      posts: 0,
      points: 0,
      likes: 0,
      dislikes: 0,
      comments: 0
    }
  }),
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    },
    deleteLol(lolId) {
      console.log("Deleting lol with id: " + lolId);
    }
  },
  mounted: async function() {
    changeLoaderState();
    this.$bind("lols", await getUserLols())
    .then(() => {
        this.totals.posts = this.lols.length;
        this.lols.forEach(l => {
            this.totals.likes += l.likes.length;
            this.totals.dislikes += l.dislikes.length;
            this.totals.points += (l.likes.length - l.dislikes.length);
            this.totals.comments += l.comments;
        })

    })
    .finally(() => {
        changeLoaderState()
    });
  }
};
</script>

<style lang="scss" scoped>
.user-lols {
  margin-bottom: 24px;
}

.added-format {
  text-align: right;
  padding-right: 12px;
  font-style: italic;
}

.heading {
  text-align: center;
  margin-top: 48px;
  margin-bottom: 24px;
}

.v-expansion-panels {
  width: 75%;
  margin: auto;
}

.subtitle {
  max-width: 500px;
  text-align: justify;
  padding: 8px;
}

.stats {
  position: fixed;
  top: 33%;
  right: 0%;
  z-index: 10;
}
</style>