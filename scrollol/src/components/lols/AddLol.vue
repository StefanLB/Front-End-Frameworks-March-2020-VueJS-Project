<template>
  <div>
    <h5 class="heading">Just fill out the fields below to share your masterpiece with the world!</h5>
    <v-form v-model="valid" lazy-validation>
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
        :items="categories.map(c => c.category)"
        :error-messages="categoryErrors"
        label="Category"
        required
        @change="$v.category.$touch()"
        @blur="$v.category.$touch()"
      ></v-select>

      <v-btn class="mr-4" :disabled="!valid" color="success" @click="validateAndOpenDialog">submit</v-btn>
      <v-btn @click="clear" color="error">clear</v-btn>
    </v-form>
    <app-dialog :data="dialogData" @dialog-result="submit"></app-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
import { addLol } from "../../services/firestore.service";
import { getCategories } from "../../services/firestore.service";
import AppDialog from "../shared/Dialog";

const urlsyntax = helpers.regex("urlsyntax", /^http[s]{0,1}:\/\/.*$/);

export default {
  mixins: [validationMixin],
  components: {
    AppDialog
  },
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
    categories: [],
    valid: true,
    dialogData: {
      visible: false,
      title: "",
      content: "",
      confirmButtonName: ""
    }
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
    validateAndOpenDialog() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.dialogData.title = "Confirm Post";
        this.dialogData.content =
          'Are you sure you want to post this Lol? Note that you can manage your Lols via the "My Lols" section under "Navigate Lols".';
        this.dialogData.confirmButtonName = "Add Lol";
        this.dialogData.visible = true;
      }
    },
    submit(confirmed) {
      if (!confirmed) {
        return;
      }

      const currentDate = new Date();
      const lolData = {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        category: this.category,
        likes: [],
        dislikes: [],
        comments: 0,
        createdOn: currentDate,
        updatedOn: currentDate
      };

      addLol(lolData)
        .then(() => {
          this.$root.$emit("show-snackbar", {
            content: "Lol successfully added!",
            color: "success"
          });

          this.clear();
          this.$router.push("/");
        })
        .catch(function() {
          this.$root.$emit("show-snackbar", {
            content: "Error creating Lol!",
            color: "error"
          });
        });
    },
    clear() {
      this.$v.$reset();
      this.title = "";
      this.description = "";
      this.imageUrl = "";
      this.category = "";
    }
  },
  created: function() {
    this.$bind("categories", getCategories());
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

.heading {
  margin-top: 48px;
  margin-bottom: 24px;
  text-align: center;
}
</style>