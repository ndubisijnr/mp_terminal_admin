import { apiClient } from "./BaseService.js"
export default {
    readUsers(){
        return apiClient.appClient.get(`user/read`)
    },

    readAdminUsers(pageNo:number){
        return apiClient.appClient.post(`admin/read-admin?pageNo=${pageNo}`)
    },

    readByUsersID(payload:string){
        return apiClient.appClient.get(`user/read-by-user-id/${payload}`)
    },

    createAdminUsers(payload:any){
        return apiClient.appClient.post(`admin/create-admin`, payload)
    },
    
}