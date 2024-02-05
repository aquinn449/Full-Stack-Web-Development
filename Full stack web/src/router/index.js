import { createRouter, createWebHistory } from 'vue-router'

// importing all the pages 

import Home from '../views/pages/Home.vue'
import Login from '../views/pages/Login.vue'
import Article from '../views/pages/Article.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Users from '../views/pages/User.vue'
import AddUser from '../views/pages/AddUser.vue'
import AddArticle from '../views/pages/AddArticle.vue'
import NotFound from '../views/pages/NotFound.vue'

// using authentication so when the user is logged in a session token is sorted in local storgae 

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if(loggedIn) {
        next()
        return
    }
    next('/login')
}

//All the routes so can navagate through different pages

const routes = [
    { path: "/", component: Home},
    { path: "/login", component: Login},
    { path: "/article/:id", component: Article},
    { path: "/Dashboard", component: Dashboard, beforeEnter: ifAuthenticated},
    { path: "/users", component: Users},
    { path: "/AddUser", component: AddUser},
    { path: "/AddArticle", component: AddArticle},
    { path: "/:pathMatch(.*)*", component: NotFound}
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
