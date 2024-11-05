import { apiClient } from "./BaseService.ts"

export default {
    create(payload:{}){
        return apiClient.appClient.post(`director/create`, payload)
    },

    read(){
        return apiClient.appClient.get(`director/read`)
    },

    update(payload:{}){
        return apiClient.appClient.post(`director/upload`, payload)
    },

    delete(payload:{}){
        return apiClient.appClient.post(`director/delete`, payload)
    },

}