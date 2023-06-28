import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './components/Login.vue'

Vue.use(VueRouter)
export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'login', component: Login }
    ]
})