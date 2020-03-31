<template>
  <div>
    <v-subheader>All Lols Component</v-subheader>
    <div class="color"></div>
    <div class="list" v-for="lol of lols" :key="lol.id" :to="'/comments/' + lol.id">
      <v-card class="d-inline-block mx-auto list-item">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-title>{{lol.title}}</v-card-title>
              <v-img width="500" :src="lol.imageUrl"></v-img>
            </v-col>
            <v-col cols="auto" class="text-center pl-0">
              <v-row class="flex-column ma-0 fill-height" justify="center">
                <v-col class="px-0"></v-col>
                <v-col class="px-0">
                  <v-btn icon>
                    <v-icon color="green darken-2">thumb_up</v-icon>
                    <div class="counter">{{lol.likes.length}}</div>
                  </v-btn>
                </v-col>

                <v-col class="px-0">
                  <v-btn icon>
                    <v-icon color="red darken-2">thumb_down</v-icon>
                    <div class="counter">{{lol.dislikes.length}}</div>
                  </v-btn>
                </v-col>

                <v-col class="px-0">
                  <v-btn icon>
                    <v-icon color="blue darken-2">comment</v-icon>
                    <div class="counter">{{lol.comments.length}}</div>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div class="overline">Added: {{formatDate(lol.createdOn)}}</div>
        </v-container>
      </v-card>
      <v-divider class="divider"></v-divider>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "AllLols",
  props: {
    lols: Array
  },
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
// .color {
//   background: linear-gradient(to bottom, #2980b9, #6dd5fa, #a5def3);
//   width: 1%;
//   height: inherit;
//   float: left;
// }

.list {
  float: right;
  width: 98%;
}

// .list-item {
//     margin-left: 100px;
// }

.md-list {
  margin: 10%;
  margin-top: 5%;
}

.counter {
  margin-left: 4px;
}

.divider {
  width: 650px;
}
</style>