import Vue from 'vue'
import Router from 'vue-router'
import err from '@/views/err.vue'
import setting from '@/views/main/setting.vue'
// import { id } from 'postcss-selector-parser';
import {authToken} from '@/service/getData'
Vue.use(Router)

const routes = [
    {
        path:'/',
        redirect:'/channel/1',
        component:()=>import('@/views/main.vue'),
        children:[
            {
                path:'404',
                component:err,
                meta:{
                    title:'未找到页面'
                }
            },{
                path:'login',
                component:()=>import('@/views/main/login.vue'),
                meta:{
                    title:'登陆'
                }
            },{
                path:'channel/:id',
                component:()=>import('@/views/main/channel.vue'),
                meta:{
                    title:'列表'
                }
            },{
                path:'article/:id',
                // component:article
                component:()=>import('@/views/main/article.vue'),
                meta:{
                    title:'文章'
                }
            },{
                path:'join'
            },{
                path:'about'
            },{
                path:'setting',
                component:setting,
                meta:{
                    requireAuth:true,
                    title:'设置'
                },
                
                children:[
                    {
                        path:'base'
                    },{
                        path:'avatar'
                    },{
                        path:'password'
                    }
                ]
            },
        ]
    },{
        path:'/user'
    }
]
const router = new Router({
    // mode:'history',
    routes
})
router.beforeEach((to,from,next)=>{
    //将当前页面的标题设置为to.meta.title
    document.title=to.meta.title

    //判断是fo登入
    if(to.matched.some(route=>route.meta.requireAuth)){
        const token = localStorage.getItem('token')
        if(token){
            // 判断是fo有效
            authToken().then(res=>{
                if(res.data.res_code===200){
                    next()
                }
            })
        }else{
            next('/login')
        }
    }else{
        next()
    }
})
export default router