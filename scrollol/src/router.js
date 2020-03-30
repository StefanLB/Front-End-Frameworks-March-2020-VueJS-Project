import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Contact from "./components/Contact.vue";
import Login from "./components/authentication/Login.vue";
import Register from "./components/authentication/Register.vue";
import AllLols from "./components/lols/AllLols.vue";
import AddLol from "./components/lols/AddLol.vue";

import { auth } from "./firebase"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/lols",
    name: "AllLols",
    component: AllLols
  },
  {
    path: "/lols/add",
    name: "AddLol",
    component: AddLol
  },
  {
    path: "*",
    redirect: "/",
    component: Home
  }
];

// WHEN YOU REACH A PATH WHICH REQUIRES AUTHENTICATION, ADD THE BELOW META
// meta: {
//   requiresAuth: true
// }

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth) {
    auth.onAuthStateChanged(u => u ? next() : next('/'));
  } else {
    next();
  }
});

