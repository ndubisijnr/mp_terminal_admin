import { apiClient } from "./BaseService"
export default {
    readTransactions(){
        return apiClient.appClient.get(`/dev/transaction/read`)
    },
    
}