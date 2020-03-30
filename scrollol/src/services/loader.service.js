import Vue from 'vue';

const loaderState = Vue.observable({ loader: false });

export function getLoaderState() {
    return loaderState.loader;
}

export function changeLoaderState() {
    loaderState.loader = !loaderState.loader;
}