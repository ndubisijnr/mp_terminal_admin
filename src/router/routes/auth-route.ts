import {RouteConstantUtil} from "@/util/constant/RouteConstantUtil.ts";
import LoginView from "@/view/auth/LoginView.vue";
import {BaseRouteProps} from "./base-route.ts";
import InitiateForgotPasswordView from "../../view/auth/InitiateForgotPasswordView.vue";
export const authRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.auth.login,
        path: "/login",
        component: LoginView,
        meta: {
            auth: false
        }
    },
    {
        name: RouteConstantUtil.auth.initiateForgotPassword,
        path: "/initiate/forgetPassword",
        component: InitiateForgotPasswordView,
        meta: {
            auth: false
        }
    },
]