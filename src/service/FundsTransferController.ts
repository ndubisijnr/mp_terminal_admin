import { apiClient } from "./BaseService.ts"

export default {
    nameEnquiry(payload:{}){
        return apiClient.appClient.post(`/dev/payment/name-enquiry`, payload)
    },
    transfer(payload: {}){
        return apiClient.appClient.post(`/dev/payment/transfer`, payload)
    },
}