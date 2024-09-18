import { defineStore } from 'pinia'
import TransactionsController from "@/service/TransactionsController"

export const useTransactionStore = defineStore('transaction_Store', {
    state: () => ({
        loading: false,
        transactions:null,
        terminalTransactions:null,
        organisationTerminalTransaction:null
    }),

    getters: {
        getTransactions:state => state.transactions,
        getTerminalTransactions:state => state.terminalTransactions,
        getLoading: state => state.loading,
        getOrganisationTerminalTransaction:state => state.organisationTerminalTransaction,

    },

    actions: {

    
        async readCustomerOrganisationTransactions(page:Number, size:Number, endDate:string, startDate:string, searchParam:string){
            if(!this.transactions)this.loading = true
            const response = await TransactionsController.readTransactions(page, size, endDate, startDate, searchParam)
            const responseData = response.data

            try{
                this.loading = false
                if(responseData.responseCode === '00'){
                    this.transactions= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){
                this.loading =false
            }
        },

        async readTerminalTransactions(payload:string){
            const response = await TransactionsController.readTransactionsByTransactionTerminalID(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.terminalTransactions= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async readOrganisationTransactionsByOrganisationId(payload:string){
            const response = await TransactionsController.readTransactionsByOrganisationId(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisationTerminalTransaction= responseData.data
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

    }
})