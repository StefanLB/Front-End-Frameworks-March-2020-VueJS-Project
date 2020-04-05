<template>
  <div class="lol-details">
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
                <v-btn icon :to="'/lols/details/' + lol.id" target="_blank">
                  <v-icon v-bind:style="{ color: lol.comments > 0 ? '#0D47A1' : '#64B5F6'}">comment</v-icon>
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
    <app-all-comments :comments="comments"></app-all-comments>
  </div>
</template>

<script>
import AppAllComments from "../comments/AllComments";
import { changeLoaderState } from "../../services/loader.service";
import { getComments } from "../../services/firestore.service";
import { getLol } from "../../services/firestore.service";
import {
  addLike,
  removeLike,
  addDislike,
  removeDislike
} from "../../services/firestore.service";
import moment from "moment";
import firebase from "firebase/app";

export default {
  name: "LolDetails",
  components: {
    AppAllComments
  },
  data() {
    return {
      user: {
        id: String
      },
      lol: Object,
      comments: Array
    };
  },
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    },
    userInvolved(collection) {
      if (collection) {
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
      }
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.user.id = user.uid;
    });
  },
  created: async function() {
    changeLoaderState();
    this.$bind("lol", await getLol(this.$route.params.id))
      .then(() => {
        this.$bind("comments", getComments(this.$route.params.id));
      })
      .finally(() => {
        changeLoaderState();
        console.log(this.comments);
      });
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 98%;
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

a {
  text-decoration: none;
}

.lol-details {
  text-align: center;
  margin-top: 12px;
}
</style>