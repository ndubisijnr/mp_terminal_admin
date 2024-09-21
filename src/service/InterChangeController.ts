import { apiClient } from "./BaseService.ts"

export default {
    readInterChange(){
        return apiClient.appClient.get(`interchange-config/read`)
    },

    createInterChange(payload: {}){
        return apiClient.appClient.post(`interchange-config/create`, payload)
    },

    deleteInterChange(payload: {}){
        return apiClient.appClient.post(`interchange/delete`, payload)
    },

    readRoutingRule(){
        return apiClient.appClient.get(`routing-rule/read`)
    },

    createRoutingRule(payload: {}){
        return apiClient.appClient.post(`routing-rule/create`, payload)
    },

    updateRoutingRule(payload: {}){
        return apiClient.appClient.post(`routing-rule/update`, payload)
    },

    deleteRoutingRule(payload: {}){
        return apiClient.appClient.post(`routing-rule/delete`, payload)
    }
}