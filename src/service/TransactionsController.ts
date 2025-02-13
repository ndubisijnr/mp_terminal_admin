import { apiClient } from "./BaseService.ts"
export default {
    readTransactions(page:Number, size:Number,endDate:string, startDate:string,searchParam:string){
        return apiClient.appClient.get(`terminal-transaction/read?page=${page}&pageSize=${size}&startDate=${startDate}&endDate=${endDate}&searchParam=${searchParam}`)
    },

    transactions(page:Number, size:Number,endDate:string, startDate:string,searchParam:string){
        return apiClient.appClient.get(`transaction/read?page=${page}&pageSize=${size}&startDate=${startDate}&endDate=${endDate}&searchParam=${searchParam}`)
    },

    readTransactionsByTransactionTerminalID(transactionTerminalId:string){
        return apiClient.appClient.get(`transaction/read-by-transaction-terminal-id/${transactionTerminalId}`)
    },

    readTransactionsByOrganisationId(organisationTransactionId:string){
        return apiClient.appClient.get(`transaction/read-by-transaction-terminal-id/${organisationTransactionId}`)
    },

    
    
}