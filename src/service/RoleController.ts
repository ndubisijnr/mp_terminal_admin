import { apiClient } from "./BaseService.js"
export default {
    readRoles(){
        return apiClient.appClient.get(`role/read`)
    },

    createRole(){
        return apiClient.appClient.get(`role/create`)
    },

    deleteRole(){
        return apiClient.appClient.get(`role/delete`)
    },

    updateeRole(){
        return apiClient.appClient.get(`role/update`)
    },
    
}