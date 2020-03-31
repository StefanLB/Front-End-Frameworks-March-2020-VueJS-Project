import { auth, firestore } from "../firebase";
import firebase from 'firebase/app';

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

export function getProjects() {
    return firestore.collection('projects');
}

export function getProjectsByName(name) {
    return getProjects().where('name', '>=', name);
}

export function getProject(id) {
    return getProjects().doc(id);
}

export function getProjectsByCreator(id) {
    return firestore.collection('projects').where('creator', '==', id);
}

export function getMyProjects() {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        return getProjectsByCreator(uid);
    }
    return null;
}

export function getProjectsWhereIAmMember() {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        return getProjects().where('members', 'array-contains', uid);
    }
    return null;
}

async function setData(data, ref) {
    return await firestore.doc(ref).set(data);
}

function updateOneFieldFromProfile(field, data) {
    return getMyProfile().update({ [field]: data });
}

export async function updateFieldFromProject(id, field, value) {
    return getProject(id).update({ [field]: value });
}

export async function updateDiaryFromProject(id, value) {
    if (auth.currentUser) {
        const newMessage = {
            user: auth.currentUser.uid,
            text: value,
            timestamp: new Date()
        }

        return await getProject(id).update({
            diary: firebase.firestore.FieldValue.arrayUnion(newMessage)
        });
    }
}

export async function updateMembersFromProject(id, value) {
    if (auth.currentUser) {
        const ref = getProject(id);
        return await ref.update({
            members: firebase.firestore.FieldValue.arrayUnion(value)
        }).then(() => {
            ref.update({
                requests: firebase.firestore.FieldValue.arrayRemove(value)
            })
        });
    }
}

export function makeRequestToBeMember(id) {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        return getProject(id).update({
            requests: firebase.firestore.FieldValue.arrayUnion(uid)
        });
    }
    return null;
}

export async function updateNames(first, last) {
    updateOneFieldFromProfile('firstName', first);
    updateOneFieldFromProfile('lastName', last);
}

export async function createProject(project) {
    if (auth.currentUser) {
        project.creator = auth.currentUser.uid;
        project.members.push(auth.currentUser.uid);
        return await getProjects().doc(project.id).set(project);
    }
    return null;
}