import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$host = "http://localhost:8081"
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
