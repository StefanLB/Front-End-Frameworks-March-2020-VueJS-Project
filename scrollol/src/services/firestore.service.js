import { auth, firestore } from "../firebase";

export async function addComment(comment) {
  console.log(comment);
}

export async function deleteComment(commentId) {
  console.log(commentId);
}

export function getComments(lolId) {
  return firestore.collection("comments").where("lolId", "==", lolId);
}

export async function getLol(lolId) {
  return await firestore.collection("lols").doc(lolId);
}

export function addLike(lolId, likes, userId) {
  likes.push(userId);

  firestore
    .collection("lols")
    .doc(lolId)
    .update({ ["likes"]: likes });
}

export function removeLike(lolId, likes, userId) {
  const updatedLikes = likes.filter(l => l != userId);

  firestore
    .collection("lols")
    .doc(lolId)
    .update({ ["likes"]: updatedLikes });
}

export function addDislike(lolId, dislikes, userId) {
  dislikes.push(userId);

  firestore
    .collection("lols")
    .doc(lolId)
    .update({ ["dislikes"]: dislikes });
}

export function removeDislike(lolId, dislikes, userId) {
  const updatedDislikes = dislikes.filter(l => l != userId);

  firestore
    .collection("lols")
    .doc(lolId)
    .update({ ["dislikes"]: updatedDislikes });
}

export function getLols() {
  return firestore.collection("lols").orderBy("createdOn", "desc");
}

export function getCategories() {
  return firestore.collection("categories").orderBy("category", "asc");
}

export async function addLol(lol) {
  if (auth.currentUser) {
    lol.addedBy = auth.currentUser.uid;
    return await getLols().add(lol);
  }
  return null;
}

export async function setUserData(data) {
  return await setData(data, `users/${data.uid}`);
}

export function getUsersCollection() {
  return firestore.collection("users");
}

export function getLoggedInUser() {
  return auth.currentUser;
}

export function getUser(id) {
  return getUsersCollection().doc(id);
}

export function getMyProfile() {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    let user = getUsersCollection().doc(uid);
    return user;
  }
  return null;
}

export function getLolsByCreator(id) {
  return firestore.collection("lols").where("addedBy", "==", id);
}

export function getMyLols() {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    return getLolsByCreator(uid);
  }
  return null;
}

async function setData(data, ref) {
  return await firestore.doc(ref).set(data);
}