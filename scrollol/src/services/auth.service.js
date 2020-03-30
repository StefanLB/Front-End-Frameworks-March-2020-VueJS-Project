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
  return await auth
    .createUserWithEmailAndPassword(userdata.email, userdata.password)
    .then(async d => {
      const data = {
        uid: d.user.uid,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
      };
      return await setUserData(data).then(() => {
        router.push("/");
      });
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
