<template>
  <form>
    <v-textarea
      v-model="content"
      :error-messages="contentErrors"
      :counter="150"
      label="Add Comment:"
      required
      @input="$v.content.$touch()"
      @blur="$v.content.$touch()"
    />
    <div class="buttons">
      <v-btn small class="mr-2" @click="clear">Cancel</v-btn>
      <v-btn small color="info" @click="submit">Post</v-btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { addComment } from "../../services/firestore.service";

export default {
  mixins: [validationMixin],
  validations: {
    content: { required, minLength: minLength(3), maxLength: maxLength(150) }
  },
  data: () => ({
    content: ""
  }),
  computed: {
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.maxLength &&
        errors.push("Content must be at most 150 characters long");
      !this.$v.content.minLength &&
        errors.push("Content must be at least 3 characters long");
      !this.$v.content.required && errors.push("Content is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      const commentData = {
        content: this.content,
        addedOn: new Date(),
        lolId: this.$route.params.id
      };

      addComment(commentData)
        .then(() => {
          this.clear();
          console.log("Comment added successfully!");
        })
        .catch(function(error) {
          console.log("Error adding comment!" + error);
        });
    },
    clear() {
      this.$v.$reset();
      this.content = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons {
    margin-top: 8px;
    float: right;
}

form {
  width: 100%;
  margin: 0 auto;
  padding: 8px;
}
</style>