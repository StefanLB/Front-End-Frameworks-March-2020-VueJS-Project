import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Contact from "./components/Contact.vue";
import Login from "./components/authentication/Login.vue";
import Register from "./components/authentication/Register.vue";
import AddLol from "./components/lols/AddLol.vue";
import LolDetails from "./components/lols/LolDetails.vue";
import UserProfile from "./components/user/Profile.vue";


import { auth } from "./firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
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
    component: Login,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/lols/add",
    name: "AddLol",
    component: AddLol,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/lols/details/:id",
    component: LolDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    redirect: "/",
    component: Home
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresAnon = to.matched.some(x => x.meta.requiresAnon);

  if (requiresAnon) {
    auth.onAuthStateChanged(u => (u ? next("/") : next()));
  } else if (requiresAuth) {
    auth.onAuthStateChanged(u => (u ? next() : next("/login")));
  } else {
    next();
  }

  //TODO: fix redirect for logged in users who try to access Login or Register
});
