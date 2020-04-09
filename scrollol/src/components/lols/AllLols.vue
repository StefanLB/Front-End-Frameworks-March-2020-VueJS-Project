<template>
  <div>
    <div class="heading">
      <h4>Browse our fine collection of LoLs below</h4>
      <p v-if="filterCategory" style="font-style: italic;">(Filtered by {{filterCategory}})</p>
    </div>
    <div v-for="lol of lols" :key="lol.id">
      <div v-if="matchesCategory(lol.category)">
        <v-card class="d-inline-block mx-auto list-item">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="auto">
                <div class="lol-details" @click="viewLolDetails(lol.id)">
                  <v-card-title>{{lol.title}}</v-card-title>
                  <v-img width="500" :src="lol.imageUrl"></v-img>
                </div>
              </v-col>
              <v-col cols="auto" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill-height" justify="center">
                  <v-col class="px-0"></v-col>
                  <v-col class="px-0">
                    <v-btn icon @click="likeLol(lol)">
                      <v-icon
                        v-bind:style="{ color: userInvolved(lol.likes) ? '#1B5E20' : '#81C784'}"
                      >thumb_up</v-icon>
                      <div class="counter">{{lol.likes.length}}</div>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon @click="dislikeLol(lol)">
                      <v-icon
                        v-bind:style="{ color: userInvolved(lol.dislikes) ? '#B71C1C' : '#E57373'}"
                      >thumb_down</v-icon>
                      <div class="counter">{{lol.dislikes.length}}</div>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon @click="viewLolDetails(lol.id)">
                      <v-icon
                        v-bind:style="{ color: lol.comments > 0 ? '#0D47A1' : '#64B5F6'}"
                      >comment</v-icon>
                      <div class="counter">{{lol.comments}}</div>
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
  </div>
</template>

<script>
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike
} from "../../services/firestore.service";
import moment from "moment";
import firebase from "firebase/app";

export default {
  name: "AllLols",
  data() {
    return {
      user: {
        loggedIn: false,
        id: String
      }
    };
  },
  computed: {
    showGreeting() {
      return this.filterCategory
        ? ` (Filtered by ${this.filterCategory})`
        : "Browse our fine collection of LoLs below";
    }
  },
  props: {
    lols: Array,
    filterCategory: String
  },
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    },
    matchesCategory(category) {
      return this.filterCategory ? category == this.filterCategory : true;
    },
    userInvolved(collection) {
      if (this.user.loggedIn && collection) {
        return collection.indexOf(this.user.id) > -1;
      }
      return false;
    },
    likeLol(lol) {
      const alreadyLiked = lol.likes.indexOf(this.user.id) > -1;
      const alreadyDisliked = lol.dislikes.indexOf(this.user.id) > -1;

      if (this.user.loggedIn) {
        if (alreadyDisliked) {
          removeDislike(lol.id, lol.dislikes, this.user.id);
        }

        if (alreadyLiked) {
          removeLike(lol.id, lol.likes, this.user.id);
        } else {
          addLike(lol.id, lol.likes, this.user.id);
        }
      } else {
        this.$root.$emit("show-snackbar", {
          content: "You need to be logged-in in order to vote!",
          color: "info"
        });
      }
    },
    dislikeLol(lol) {
      const alreadyDisliked = lol.dislikes.indexOf(this.user.id) > -1;
      const alreadyLiked = lol.likes.indexOf(this.user.id) > -1;

      if (this.user.loggedIn) {
        if (alreadyLiked) {
          removeLike(lol.id, lol.likes, this.user.id);
        }

        if (alreadyDisliked) {
          removeDislike(lol.id, lol.dislikes, this.user.id);
        } else {
          addDislike(lol.id, lol.dislikes, this.user.id);
        }
      } else {
        this.$root.$emit("show-snackbar", {
          content: "You need to be logged-in in order to vote!",
          color: "info"
        });
      }
    },
    viewLolDetails(lolId) {
      if (this.user.loggedIn) {
        window.open("/lols/details/" + lolId, "_blank");
      } else {
        this.$root.$emit("show-snackbar", {
          content: "Only logged-in users can comment and view post details!",
          color: "info"
        });
      }
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.id = user.uid;
      } else {
        this.user.loggedIn = false;
        this.user.id = null;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 98%;
}

.heading {
  margin-bottom: 24px;
}

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

.v-card__title {
  padding-top: 0px;
  color: #007bff;
}

.v-card__title:hover {
  padding-top: 0px;
  color: #3f51b5;
}

.lol-details:hover {
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>