import {authRoute} from "./auth-route.ts";
import {pageRoute} from "./page-route.ts";
import {dashboardRoute} from "./dashboard-route.ts";

export type BaseRouteProps = {
    name: string,
    path: string,
    component: object,
    meta: Meta
}

type Meta = {
    authRequired: boolean,
    layout: string,
}

// Variable initialRoute implicitly has type any[] in some locations where its type cannot be determined.
const initialRoute:any = []
export const baseRoute = initialRoute.concat(authRoute, dashboardRoute,pageRoute)
