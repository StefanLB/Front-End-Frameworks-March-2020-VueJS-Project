import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "@firebase/auth";

const configOptions = {
  apiKey: "AIzaSyBEYO4SUE3sAKneRagHz9H3MZtXY4rSm0g",
  authDomain: "scrollol-66fd7.firebaseapp.com",
  databaseURL: "https://scrollol-66fd7.firebaseio.com",
  projectId: "scrollol-66fd7",
  storageBucket: "scrollol-66fd7.appspot.com",
  messagingSenderId: "367875413683",
  appId: "1:367875413683:web:6448c235f850acafc642c6"
};

export const db = firebase.initializeApp(configOptions);
export const firestore = db.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const authGoogle = firebase.auth;