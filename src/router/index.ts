import {createRouter, createWebHistory} from "vue-router";
import {baseRoute} from "./routes/base-route.ts";
import {RouteConstantUtil} from "../util/constant/RouteConstantUtil.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes: baseRoute
})

router.beforeEach((to, from, next)=>{
    const isLogin = false
    console.log(to.matched.some((record)=> record.meta.auth ))
    if (to.matched.some((record)=> record.meta.auth ) && !isLogin){
       return  next({name: RouteConstantUtil.auth.login})
    }else {
       return  next()
    }
})