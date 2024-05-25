import {authRoute} from "./auth-route.ts";
import {pageRoute} from "./page-route.ts";
export type BaseRouteProps = {
    name: string,
    path: string,
    component: object,
    meta: Meta
}

type Meta = {
    auth: boolean
}

const initialRoute:any[] = []
export const baseRoute = initialRoute.concat(authRoute, pageRoute)

console.log(baseRoute)