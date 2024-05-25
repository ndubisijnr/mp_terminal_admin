import {RouteConstantUtil} from "../../util/constant/RouteConstantUtil.ts";
import {BaseRouteProps} from "./base-route.ts";
export const dashboardRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.dashboard.homePage,
        path: '/dashboard',
        component: () => import("@/view/dashboard/HomePageView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard'}
    },

]