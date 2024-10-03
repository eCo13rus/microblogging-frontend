import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NewPost from '../views/NewPost.vue'
import PostView from '../views/PostView.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guestOnly: true }
    },
    {
        path: '/new-post',
        name: 'NewPost',
        component: NewPost,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id',
        name: 'PostView',
        component: PostView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login')
    } else if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
