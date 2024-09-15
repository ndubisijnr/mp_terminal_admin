import axios from "axios";
import { router} from '@/router'

const BASE_URL = window.location.hostname.includes("-dev.") ||  window.location.hostname === "localhost" ?
    import.meta.env.VITE_BASE_URL_DEV : import.meta.env.VITE_BASE_URL_PROD

export const appClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

export const appClient1 = axios.create({
    baseURL:BASE_URL,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

appClient.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.token;
    config.headers.mid = 0
    return config
})

appClient.interceptors.response.use(response => {
    if (response != null) {
        if (response.data != null) {
            if (response.data.responseCode === '115') {
                 sessionStorage.clear()
                 router.push({path:'/',  query: { error: 'SessionTimedOut'}})
                //  location.reload()
                // StoreUtils.getter().auth.commitSessionStory(true)
                // sessionStorage.removeItem('token')
                // localStorage.clear();
                // let timerInterval
                // if (router.currentRoute.meta.layout !== "auth"){
                //     isTimedOut = true
                //     localStorage.clear()
                //     StoreUtils.dispatch(StoreUtils.actions.auth.logOut,{customerEmail: StoreUtils.rootGetters(StoreUtils.getters.auth.getUserInfo).customerEmail}).then()
                //     // Swal.fire({
                //     //   title: 'Session timed out',
                //     //   html: 'Please re-authenticate',
                //     //   icon:"info",
                //     // })
                //     //     .then((result) => {
                //     // })
                // }
            }
        }
    }
    return response
});

export const apiClient = {
    appClient: appClient,
    appClient1: appClient1
}
  