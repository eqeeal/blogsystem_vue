import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Category from '../components/category/Category.vue'
import Blog from '../components/blog/Blog.vue'
import Comment from '../components/comment/Comment.vue'
import Dashbord from '../components/dashbord/Dashbord.vue'
import Link from '../components/link/Link.vue'
import System from '../components/system/System.vue'
import Tag from '../components/tag/Tag.vue'

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home', component: Home,
            children: [
                { path: '/category', component: Category },
                { path: '/blog', component: Blog }, 
                { path: '/comment', component: Comment },
                { path: '/dashbord', component: Dashbord },
                { path: '/link', component: Link },
                { path: '/system', component: System },
                { path: '/tag', component: Tag }
            ]
        },
    ]
})