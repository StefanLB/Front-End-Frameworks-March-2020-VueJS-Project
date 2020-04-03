import { auth } from "./../firebase";
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
      };

      setUserData(data);
      auth.currentUser.displayName = userdata.firstName;
      auth.currentUser.updateProfile({displayName: userdata.firstName}).then(router.push('/'));
    })
    .finally(() => {
      changeLoaderState();
    });
}

export async function logOut() {
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

    //firebase.auth().currentUser.updateProfile({displayName: 'TESTDISPLAYNAME'});