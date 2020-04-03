<template>
  <div>
    <v-subheader>All Lols Component</v-subheader>
    <div class="color"></div>
    <div class="list" v-for="lol of lols" :key="lol.id" :to="'/comments/' + lol.id">
      <div v-if="matchesCategory(lol.category)">
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
                    <v-btn icon>
                      <v-icon
                        v-bind:style="{ color: userInvolved(lol.comments) ? '#0D47A1' : '#64B5F6'}"
                      >comment</v-icon>
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
  </div>
</template>

<script>
import { addLike, removeLike, addDislike, removeDislike } from "../../services/firestore.service";
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
    userActivity() {
      return true;
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
        if(alreadyDisliked) {
          removeDislike(lol.id, lol.dislikes, this.user.id);
        }
        
        if(alreadyLiked) {
          removeLike(lol.id, lol.likes, this.user.id);
        } else {
          addLike(lol.id, lol.likes, this.user.id);
        }
      }
      //TODO : if not logged in - notify user to log in
    },
    dislikeLol(lol){
      const alreadyDisliked = lol.dislikes.indexOf(this.user.id) > -1;
      const alreadyLiked = lol.likes.indexOf(this.user.id) > -1;

      if (this.user.loggedIn) {
        if(alreadyLiked) {
          removeLike(lol.id, lol.likes, this.user.id);
        }

        if(alreadyDisliked) {
          removeDislike(lol.id, lol.dislikes, this.user.id);
        } else {
          addDislike(lol.id, lol.dislikes, this.user.id);
        }
      }
      //TODO : if not logged in - notify user to log in
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
// .color {
//   background: linear-gradient(to bottom, #2980b9, #6dd5fa, #a5def3);
//   width: 1%;
//   height: inherit;
//   float: left;
// }

.list {
  //   float: right;
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