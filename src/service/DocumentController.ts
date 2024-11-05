import { apiClient } from "./BaseService.ts"

export default {
    create(payload:{}){
        return apiClient.appClient.post(`document/create`, payload)
    },

    read(){
        return apiClient.appClient.get(`document/read`)
    },

    update(payload:{}){
        return apiClient.appClient.post(`document/update`, payload)
    },

    delete(payload:{}){
        return apiClient.appClient.post(`document/delete`, payload)
    },

}