import { auth, firestore } from "../firebase";
//import firebase from 'firebase/app';

export function getLols() {
        return firestore.collection('lols');
}

export function getCategories() {
    return firestore.collection('categories').orderBy('category');
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

export async function setProject(data) {
    return await setData(data, `projects/${data.id}`);
}

export function getUsersCollection() {
    return firestore.collection('users');
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
        return getUsersCollection().doc(uid);
    }
    return null;
}

export function searchUserByName(name) {
    return getUsersCollection().where('firstName', '>=', name).limit(5);
}


export function getLol(id) {
    return getLols().doc(id);
}

export function getLolsByCreator(id) {
    return firestore.collection('lols').where('addedBy', '==', id);
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

function updateOneFieldFromProfile(field, data) {
    return getMyProfile().update({ [field]: data });
}

export async function updateFieldFromLol(id, field, value) {
    return getLol(id).update({ [field]: value });
}

export async function updateNames(first, last) {
    updateOneFieldFromProfile('firstName', first);
    updateOneFieldFromProfile('lastName', last);
}