import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKZVxFy3M01CxvFfOq3cNeXlj_rxosYM0",
  authDomain: "scrollol.firebaseapp.com",
  databaseURL: "https://scrollol.firebaseio.com",
  projectId: "scrollol",
  storageBucket: "scrollol.appspot.com",
  messagingSenderId: "57334373708",
  appId: "1:57334373708:web:dcc00ef2971549d7ba03e9"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.collection("users");
const lolsCollection = db.collection("lols");
const commentsCollection = db.collection("comments");

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  lolsCollection,
  commentsCollection,
  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {
        console.log(error);
      });
  }
};
