import { apiClient } from "./BaseService.ts"

export default {
    manualReversal(payload: {}){
        return apiClient.appClient.post(`payment/manual-reversal`, payload)
    }
}