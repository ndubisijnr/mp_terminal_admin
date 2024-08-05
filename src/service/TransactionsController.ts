import { apiClient } from "./BaseService.ts"
export default {
    readTransactions(page:Number, size:Number){
        return apiClient.appClient.get(`/dev/terminal-transaction/read?page=${page}&pageSize=${size}`)
    },

    readTransactionsByTransactionTerminalID(transactionTerminalId:string){
        return apiClient.appClient.get(`/dev/transaction/read-by-transaction-terminal-id/${transactionTerminalId}`)
    },

    readTransactionsByOrganisationId(organisationTransactionId:string){
        return apiClient.appClient.get(`/dev/transaction/read-by-transaction-terminal-id/${organisationTransactionId}`)
    },

    
    
}