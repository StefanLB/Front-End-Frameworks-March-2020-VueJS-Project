import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import './firebase'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import {router} from './router'
import App from './App.vue'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
