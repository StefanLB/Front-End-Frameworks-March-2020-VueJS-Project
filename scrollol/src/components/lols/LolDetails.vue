<template>
  <div v-if="lol" class="lol-details">
    <v-card class="d-inline-block mx-auto list-item">
      <div class="overline">
        Added: {{formatDate(lol.createdOn)}} ///
        Category: {{lol.category}}
      </div>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-card-title>{{lol.title}}</v-card-title>
            <v-card-subtitle class="card-subtitle">{{lol.description}}</v-card-subtitle>
            <v-img width="500" :src="lol.imageUrl"></v-img>
            <div class="likeDislike">
              <v-btn icon @click="likeLol(lol)" style="margin-right: 48px;">
                <v-icon
                  v-bind:style="{ color: userInvolved(lol.likes) ? '#1B5E20' : '#81C784'}"
                >thumb_up</v-icon>
                <div class="counter">{{lol.likes.length}}</div>
              </v-btn>

              <v-btn icon @click="dislikeLol(lol)">
                <v-icon
                  v-bind:style="{ color: userInvolved(lol.dislikes) ? '#B71C1C' : '#E57373'}"
                >thumb_down</v-icon>
                <div class="counter">{{lol.dislikes.length}}</div>
              </v-btn>
            </div>
          </v-col>

          <v-divider vertical class="vert-divider"></v-divider>

          <v-col class="comments" cols="auto">
            <v-card-title class="comments">Comments</v-card-title>
            <app-all-comments v-if="comments" :comments="comments"></app-all-comments>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
      lol: null,
      comments: []
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

      if (alreadyDisliked) {
        removeDislike(lol.id, lol.dislikes, this.user.id);
      }

      if (alreadyLiked) {
        removeLike(lol.id, lol.likes, this.user.id);
      } else {
        addLike(lol.id, lol.likes, this.user.id);
      }
    },
    dislikeLol(lol) {
      const alreadyDisliked = lol.dislikes.indexOf(this.user.id) > -1;
      const alreadyLiked = lol.likes.indexOf(this.user.id) > -1;

      if (alreadyLiked) {
        removeLike(lol.id, lol.likes, this.user.id);
      }

      if (alreadyDisliked) {
        removeDislike(lol.id, lol.dislikes, this.user.id);
      } else {
        addDislike(lol.id, lol.dislikes, this.user.id);
      }
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user.id = user.uid;
    });
  },
  async created() {
    changeLoaderState();
    this.$bind("comments", getComments(this.$route.params.id));
    await this.$bind("lol", await getLol(this.$route.params.id)).finally(() => {
      changeLoaderState();
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

.v-card__title {
  padding-top: 0px;
  padding-left: 8px;
}

.lol-details {
  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
}

.v-card {
  padding: 24px;
}

.overline {
  text-align: left;
}

.comments {
  justify-content: center;
}

.card-subtitle {
  max-width: 500px;
  text-align: justify;
  padding: 8px;
}

.comments {
  min-width: 320px;
  max-width: 400px;
  text-align: justify;
}

.vert-divider {
  margin-left: 20px;
  margin-right: 20px;
}

.likeDislike {
  margin-top: 12px;
}
</style>