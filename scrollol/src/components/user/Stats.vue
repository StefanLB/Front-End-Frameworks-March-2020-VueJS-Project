<template>
  <v-card class="mx-auto stats" tile>
    <v-list dense flat>
      <v-subheader>YOUR LOLS' STATS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="stat of stats" :key="stat.name">
          <v-list-item-icon>
            <v-icon v-bind:style="{color: stat.color}">{{stat.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <span style="margin-right: 16px;">{{getFirstUpperCase(stat.name)}}:</span>
              <div style="float: right;">{{getStatTotal(stat.name)}}</div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    stats: [
      {
        name: "posts",
        icon: "mdi-post",
        color: "#35A0AE"
      },
      {
        name: "points",
        icon: "mdi-star-four-points",
        color: "#FFAA00"
      },
      {
        name: "likes",
        icon: "mdi-thumb-up",
        color: "#1B5E20"
      },
      {
        name: "dislikes",
        icon: "mdi-thumb-down",
        color: "#B71C1C"
      },
      {
        name: "comments",
        icon: "mdi-message-reply-text",
        color: "#35A0AE"
      }
    ]
  }),
  props: {
    totals: {
      posts: 0,
      points: 0,
      likes: 0,
      dislikes: 0,
      comments: 0
    }
  },
  computed: {},
  methods: {
    getStatTotal(statName) {
      return this.totals[statName];
    },
    getFirstUpperCase(statName) {
      return statName[0].toUpperCase() + statName.slice(1);
    }
  }
};
</script>