<template>
  <form>
    <v-text-field
      v-model="title"
      :error-messages="titleErrors"
      :counter="30"
      label="Title"
      required
      @input="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="description"
      :error-messages="descriptionErrors"
      :counter="150"
      label="Description"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="imageUrl"
      :error-messages="imageUrlErrors"
      label="Image URL"
      required
      @input="$v.imageUrl.$touch()"
      @blur="$v.imageUrl.$touch()"
    ></v-text-field>
    <v-select
      v-model="category"
      :items="items"
      :error-messages="categoryErrors"
      label="Category"
      required
      @change="$v.category.$touch()"
      @blur="$v.category.$touch()"
    ></v-select>

    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import { lolsCollection } from "../../firebase";

const urlsyntax = helpers.regex("urlsyntax", /^http[s]{0,1}:\/\/.*$/);

export default {
  mixins: [validationMixin],
  validations: {
    title: { required, minLength: minLength(3), maxLength: maxLength(30) },
    description: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(150)
    },
    imageUrl: { required, urlsyntax },
    category: { required }
  },

  data: () => ({
    title: "",
    description: "",
    imageUrl: "",
    category: null,
    items: ["Funny", "Animals", "Art", "Games", "Nature"]
  }),

  computed: {
    categoryErrors() {
      const errors = [];
      if (!this.$v.category.$dirty) return errors;
      !this.$v.category.required && errors.push("Category is required");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Title must be at most 30 characters long");
      !this.$v.title.minLength &&
        errors.push("Title must be at least 3 characters long");
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push("Description must be at most 150 characters long");
      !this.$v.description.minLength &&
        errors.push("Description must be at least 3 characters long");
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    },
    imageUrlErrors() {
      const errors = [];
      if (!this.$v.imageUrl.$dirty) return errors;
      !this.$v.imageUrl.urlsyntax &&
        errors.push("Image Url must start with 'http://' or 'https://'");
      !this.$v.imageUrl.required && errors.push("Image Url is required");
      return errors;
    }
  },

  methods: {
    submit() {
      const currentDate = new Date();

      console.log(lolsCollection.data);
      console.log(lolsCollection);

      lolsCollection
        .add({
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          category: this.category,
          likes: [],
          dislikes: [],
          comments: [
            {
              content: "testComment",
              postedBy: "testUser",
              postedOn: currentDate
            }
          ],
          createdOn: currentDate,
          updatedOn: currentDate
        })
        .then(function(docRef) {
          console.log(docRef);
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.imageUrl = "";
      this.select = null;
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  width: 50%;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
}
</style>