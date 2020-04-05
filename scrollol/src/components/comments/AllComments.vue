<template>
  <div>
    <div v-for="comment of comments" :key="comment.id">
      <v-card class="d-inline-block mx-auto list-item comment">
        <v-container>
          <div class="overline">By: {{comment.addedByName}}</div>
          <v-row justify="space-between">
            <v-col class="comment-content" cols="auto">
              <v-card-text>{{comment.content}}</v-card-text>
            </v-col>
            <v-col cols="auto" class="text-center pl-0"></v-col>
          </v-row>
          <div class="overline">Posted: {{formatDate(comment.addedOn)}}</div>
        </v-container>
      </v-card>
      <v-divider></v-divider>
    </div>
  </div>
</template>


<script>
// import {
//   addComment,
//   deleteComment
// } from "../../services/firestore.service";
import firebase from "firebase/app";
import moment from "moment";

export default {
  name: "AllComments",
  data() {
    return {
      user: {
        id: String
      }
    };
  },
  props: {
    comments: Array
  },
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    }
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      this.user.id = user.uid;
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
  color: #007bff;
}

.v-card__title:hover {
  padding-top: 0px;
  color: #3f51b5;
}

a {
  text-decoration: none;
}

.comment {
  width: 100%;
}

.comment-content {
  padding: 0px;
}
</style>
