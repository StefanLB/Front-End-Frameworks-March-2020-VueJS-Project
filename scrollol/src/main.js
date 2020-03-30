import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import { firestorePlugin } from 'vuefire'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

// firebase.auth.onAuthStateChanged(user => {
//   store.dispatch("fetchUser", user);
// });

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
