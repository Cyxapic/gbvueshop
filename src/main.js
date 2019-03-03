import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faCodeBranch, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faCodeBranch, faPen)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({routes});

new Vue({
  router,
  data: {
    totalCart: 0,
    user: localStorage.getItem('user') ? true : false,
  },
  render: h => h(App),
}).$mount('#app')
