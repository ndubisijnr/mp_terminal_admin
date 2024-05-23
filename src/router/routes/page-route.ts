import {RouteConstantUtil} from "../../util/constant/RouteConstantUtil.ts";
import {BaseRouteProps} from "./base-route.ts";
import NoPageFoundView from "../../view/page/NoPageFoundView.vue";
export const pageRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.page.noPageFound,
        path: "/:catchAll(.*)",
        component: NoPageFoundView,
        meta: {
            auth: false
        }
    }
]