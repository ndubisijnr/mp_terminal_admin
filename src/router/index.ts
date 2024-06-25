import {createRouter, createWebHistory} from "vue-router";
import {baseRoute} from "./routes/base-route.ts";
import {RouteConstantUtil} from "../util/constant/RouteConstantUtil.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes: baseRoute,
    scrollBehavior() {
        // always scroll to top
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 })
            }, 100)
        })
    } // added scroll behavior to always return to the top of the page.

})


router.beforeEach(async (routeTo, routeFrom, next) => {
    // Check if auth is required on this route
    // Check if auth is required on this route
    // (including nested router).
    console.log(routeFrom)
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);

    // If auth isn't required for the route, just continue.
    if (!authRequired) return next();
    // console.log("userManagement getter info: "+StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo))
    if (sessionStorage?.token != null) {
        return next()
    }
    redirectToLogin();
    // eslint-disable-next-line no-unused-vars
    function redirectToLogin() {
        next({ name: RouteConstantUtil.auth.login, query: { redirectFrom: routeTo.fullPath } });
    }
});

router.beforeResolve(async (routeTo:any, routeFrom:any, next:(...args: any[]) => void) =>  {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise<void>((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args:any[]) =>  {
                        // If the userManagement chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            // Complete the redirect.
                            next(...args);
                            reject(new Error("Redirected"));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // Otherwise, continue resolving the route.
                    resolve();
                }
            });
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }

    // If we reach this point, continue resolving the route.
    next();
});

router.afterEach(() => {

});


// router.beforeEach((to, from, next)=>{
//     const isLogin = false
//     console.log(to.matched.some((record)=> record.meta.auth ))
//     if (to.matched.some((record)=> record.meta.auth ) && !isLogin){
//        return  next({name: RouteConstantUtil.auth.login})
//     }else {
//        return  next()
//     }
// })