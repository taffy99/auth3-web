import {createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import PageFrame from '@/layout/components/PageFrame.vue'
import store from '@/store'
import { menuTree } from '@/apis/personal'
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
            }
        ]   
    }
    
]
const route404= {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/404'
}
const router =  createRouter({
    history:createWebHashHistory(),
    routes
})
router.beforeEach(async(to)=> {
    const isLogin = store.getters["user/isLogin"]
    if(to.path === '/login') {
        if(isLogin) {
            return { name: 'Home'}
        }
       return true 
    }
    if(to.meta.requireAuth) {
        if(!isLogin) {
            return { name: 'Login'}
        }
    }
    await addDynamic()
    if(!to.name && hasRoute(to)) {
        return { ...to }
    }
    if(to.path === '/' && store.state.firstRoute) {
        return store.state.firstRoute
    }
    return true
})
function hasRoute(to) {
    const item = router.getRoutes().find((item)=> item.path === to.path)
    return !!item
}
function addDynamic() {
    if(store.state.routeLoaded) {
        return
    }
    return menuTree().then((res)=> {
        // 添加动态路由
        if(res.data && res.data.length) {
            addDynamicRoutes(res.data)
        }
        router.addRoute(route404)
        store.commit('setRouteLoaded', true)
        // 保存菜单树
        store.commit("setMenuTree", res.data)
    })
}
// 动态引入views 下所有.vue文件（组件）
// vite中可以使用 import.meta.glob 方法动态引入资源，这种引入方式默认是懒加载的
const modules = import.meta.glob('../views/**/*.vue')
function addDynamicRoutes(data, parent) {
        data.forEach((item,i) => {
            const route = {
                path: item.path,
                name: item.name,
                meta: {
                    title: item.title,
                    icon: item.icon
                },
                children: []
            };
        if(parent) {
            if(item.parentId !==0) {
                const compParr = item.path.replace("/", "").split("/")
                const l = compParr.length - 1
                const compPath = compParr.map((v,i)=> {
                    return i===l ? v.replace(/\w/,(L)=>L.toUpperCase()) + '.vue':v
                }).join('/')
                route.path = compParr[l]
                // 设置动态组件
                route.component = modules[`../views/${compPath}`]
                parent.children.push(route)
            }
        } else {
            if(item.children && item.children.length) {
                route.redirect = item.children[0].path
                addDynamicRoutes(item.children, route)
            }
            route.component = PageFrame
            if(i === 0) {
                store.commit('setFirstRoute', route)
            }
            router.addRoute('Home', route)
        }
    })
}
export default router   