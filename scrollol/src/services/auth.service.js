import { auth } from "./../firebase";
import { authGoogle } from "./../firebase";
import { router } from "./../router";
import { setUserData } from "./firestore.service";
import { changeLoaderState } from "./loader.service";

export async function signIn(email, password) {
  changeLoaderState();
  return await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      router.push("/");
    })
    .finally(() => {
      changeLoaderState();
    });
}

export async function signUp(userdata) {
  changeLoaderState();
  await auth
    .createUserWithEmailAndPassword(userdata.email, userdata.password)
    .then(async d => {
      const data = {
        uid: d.user.uid,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        phoneNumber: userdata.phone
      };

      auth.currentUser.displayName = userdata.firstName;
      await setUserData(data);
    })
    .then(async () => {
      auth.currentUser
        .updateProfile({
          displayName: userdata.firstName,
          photoURL: userdata.photoUrl
        })
        .then(router.push("/"));
    })
    .finally(() => {
      changeLoaderState();
    });
}

export async function logOut() {
  console.log(auth.currentUser);

  changeLoaderState();
  return await auth
    .signOut()
    .then(() => {
      router.push("/");
    })
    .finally(() => {
      changeLoaderState();
    });
}

export async function signInGoogle() {
  const provider = new authGoogle.GoogleAuthProvider();

  auth
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result);
      router.push("/");
    })
    .catch(() => {
      console.log("Error Logging in!");
    });
}

export async function updateUser(userdata) {
  changeLoaderState();

  const updatedData = {
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    phoneNumber: userdata.phoneNumber,
    uid: auth.currentUser.uid
  };

  setUserData(updatedData);

  await auth.currentUser
    .updateProfile({
      displayName: userdata.firstName,
      photoURL: userdata.photoURL
    })
    .then(() => {
      router.push("/");
    })
    .finally(() => {
      changeLoaderState();
    });
}
