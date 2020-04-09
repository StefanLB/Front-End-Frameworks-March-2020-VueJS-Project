<template>
  <div>
    <div v-if="comments">
      <div v-for="comment of comments" :key="comment.id">
        <v-card class="d-inline-block mx-auto list-item comment">
          <v-container>
            <v-icon
              v-if="userIsAuthor(comment.addedBy)"
              small
              class="del-btn"
              @click="openConfirmDialog(comment.id, comment.lolId, comment.addedBy)"
            >mdi-trash-can</v-icon>
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
      <app-dialog :data="dialogData" @dialog-result="delComment"></app-dialog>
    </div>
    <div v-else class="no-comments">
      <div>No comments yet.</div>
      <div>Be the first to comment!</div>
    </div>
    <app-add-comment :totalComments="totalComments"></app-add-comment>
  </div>
</template>


<script>
import AppAddComment from "./AddComment";
import AppDialog from "../shared/Dialog";
import { deleteComment } from "../../services/firestore.service";
import firebase from "firebase/app";
import moment from "moment";

export default {
  name: "AllComments",
  components: {
    AppAddComment,
    AppDialog
  },
  data() {
    return {
      user: {
        id: String
      },
      delCommentId: "",
      delCommentLolId: "",
      delAddedById: "",
      dialogData: {
        visible: false,
        title: "",
        content: "",
        confirmButtonName: ""
      }
    };
  },
  computed: {
    totalComments() {
      if (this.comments) {
        return this.comments.length;
      }

      return 0;
    }
  },
  props: {
    comments: null
  },
  methods: {
    formatDate(timestamp) {
      return moment(timestamp.seconds * 1000, "x").fromNow();
    },
    openConfirmDialog(commentId, lolId, creatorId) {
      this.delCommentId = commentId;
      this.delLolId = lolId;
      this.delAddedById = creatorId;

      this.dialogData.title = "Confirm Delete";
      this.dialogData.content =
        "Are you sure you want to delete this comment? Note that this action cannot be undone.";
      this.dialogData.confirmButtonName = "Delete Comment";
      this.dialogData.visible = true;
    },
    async delComment(confirmed) {
      if (!confirmed) {
        return;
      }

      if (this.delAddedById == this.user.id) {
        const newTotalComments = this.totalComments - 1;
        await deleteComment(this.delCommentId, this.delLolId, newTotalComments)
          .then(() => {
            this.$root.$emit("show-snackbar", {
              content: "Comment successfully deleted!",
              color: "#35A0AE"
            });
          })
          .catch(() => {
            this.$root.$emit("show-snackbar", {
              content: "Error deleting comment!",
              color: "error"
            });
          });
      }

      this.delCommentId = "";
      this.delLolId = "";
      this.delAddedById = "";
    },
    userIsAuthor(addedBy) {
      return addedBy == this.user.id;
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

.del-btn {
  float: right;
}

.del-btn:hover {
  color: #b71c1c;
}

.no-comments {
  text-align: center;
  color: red;
}
</style>
