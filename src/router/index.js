import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index"
import About from "../components/Pages/About"
import Privacy from "../components/Pages/Privacy";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy
        }
    ],
    mode: 'history'
})
