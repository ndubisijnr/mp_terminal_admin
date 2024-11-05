import { apiClient } from "./BaseService.ts"

export default {
    create(payload:{}){
        return apiClient.appClient.post(`director-address/create`, payload)
    },

    read(payload:{}){
        return apiClient.appClient.post(`director-address/read`, payload)
    },

    upload(payload:{}){
        return apiClient.appClient.post(`director-address/upload`, payload)
    },

    delete(payload:{}){
        return apiClient.appClient.post(`director-address/delete`, payload)
    },
}