import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'
import { firestorePlugin } from 'vuefire'
import firebase from './firebase.js'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

firebase.auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
