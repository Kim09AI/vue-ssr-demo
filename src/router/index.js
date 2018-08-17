import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('../views/home')
            },
            {
                path: '/about',
                component: () => import('../views/about')
            }
        ]
    })
}
