import {RouteConstantUtil} from "../../util/constant/RouteConstantUtil.ts";
import {BaseRouteProps} from "./base-route.ts";
export const dashboardRoute: BaseRouteProps[] = [
    {
        name: RouteConstantUtil.dashboard.homePage,
        path: '/dashboard',
        component: () => import("@/view/dashboard/HomePageView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, manage your transactions in real time!'},
    },

    {
        name: RouteConstantUtil.dashboard.institutions,
        path: '/institutions',
        component: () => import("@/view/dashboard/Institutions.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, manage your institutions in real time!'},
    },
    
    {
        name: RouteConstantUtil.dashboard.teminalPage,
        path: '/terminals',
        component: () => import("@/view/dashboard/TerminalsView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, manage your terminals in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.transactions,
        path: '/transactions',
        component: () => import("@/view/dashboard/TransactionsView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage your transactions in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.journals,
        path: '/journals',
        component: () => import("@/view/dashboard/JournalsView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage your journals in real time!'},
    },
    {
        name: RouteConstantUtil.dashboard.organisations,
        path: '/merchants',
        component: () => import("@/view/dashboard/MerchantView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage Organisations!'},
    },
    {
        name: RouteConstantUtil.dashboard.charges,
        path: '/charges',
        component: () => import("@/view/dashboard/ManageCharges.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage charges!'},
    },
    {
        name: RouteConstantUtil.dashboard.terminalMapping,
        path: '/terminal-mapping',
        component: () => import("@/view/dashboard/TerminalMapping.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Map, Terminals!'},
    },
    {
        name: RouteConstantUtil.dashboard.terminalTransactions,
        path: '/terminal-transaction',
        component: () => import("@/view/dashboard/TerminalTransactions.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage Terminal Transactions!'},
    },
    {
        name: RouteConstantUtil.dashboard.institutionsCharges,
        path: '/institution/charges',
        component: () => import("@/view/dashboard/InstitutionCharges.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Manage Institution!'},
    },
    {
        name: RouteConstantUtil.dashboard.user,
        path: '/users',
        component: () => import("@/view/dashboard/UserView.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage users!'},
    },
    {
        name: RouteConstantUtil.dashboard.settings,
        path: '/settings',
        component: () => import("@/view/dashboard/Settings.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Manage your account!'},
    },
    {
        name: RouteConstantUtil.dashboard.support,
        path: '/support',
        component: () => import("@/view/dashboard/Support.vue"),
        meta: {authRequired:RouteConstantUtil.dashboard.authRequired, layout:'dashboard', sub_title:'Track, Manage charges!'},
    },


]