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
import Door from '../components/blog/Door.vue'
import Deatil from '../components/blog/Detail.vue'
import UpdatePwd from '../components/system/UpdatePwd.vue'
import AddBlog from '../components/blog/AddBlog.vue'
import DoorDetail from '../components/door/DoorDetail.vue'
import DoorHome from '../components/door/DoorHome.vue'


Vue.use(VueRouter)
const router = new VueRouter({
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
                { path: '/tag', component: Tag },
                { path: '/updatePwd', component: UpdatePwd },
                { path: '/addBlog', name:'AddBlog',component: AddBlog },
            ]
        },
        { path: '/door', name:'Door',component: Door },
        { path: '/detail', name:'Detail', component: Deatil },
        { path: '/doorDetail', name:'doorDetail',component: DoorDetail },
        { path: '/doorHome', name:'doorHome',component: DoorHome },

    ]
})

router.beforeEach((to, from, next) => {
    if (to.path.includes("/home")) {
        let loginuser = localStorage.getItem("LoginUser")
        if (loginuser) {
            //有，则正常跳转
            next()//放行
        } else {
            //没有，则重定向到登录页面
            alert('请先登录！')
            next("/login")
        }
    } else {
        //去的不是home，直接放行
        next()//用于放行表示正常跳转
    }
})

export default router