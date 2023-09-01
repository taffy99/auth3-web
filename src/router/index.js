import {createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        children: [
            {
                path: 'login',
                name: 'Login',
                component: ()=> import('@/views/login/index.vue')
            },
            {
                path: '404',
                name: 'NotFound',
                component: ()=>import('@/views/404.vue')
            },
            {
                path: 'personal',
                name: 'Personal',
                meta: {
                    requireAuth: true
                },
                component: ()=>import('@/views/personal/index.vue'),
                children: [
                    {
                        path: 'message',
                        name: 'PersonalMessage',
                        meta: {
                            requireAuth: true
                        },
                        component: ()=>import('@/views/personal/Message.vue'),
                    }
                ]
            },
            {
                path: 'app',
                name: 'App',
                meta: {
                    requireAuth: true
                },
                component: ()=>import('@/views/app/index.vue'),
            }
        ]
        
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        redirect: '/404',
        component: ()=> import('@/views/404.vue')
    }
]

const router =  createRouter({
    history:createWebHashHistory(),
    routes
})
router.beforeEach((to)=> {
    const token =  localStorage.getItem('pm_token')
    if (to.meta.requireAuth && !token) {
        return { name: 'Login'}
    }
    return true
})
export default router