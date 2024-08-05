import { defineStore } from 'pinia'
import FundsTransferController from '@/service/FundsTransferController'

export const useFundTransfer_Store = defineStore('fundTransfer_Store', {
    state: () => ({
        nameEnquiryResponse:null,
    }),

    getters: {
        getNameEnquiryResponse:state => state.nameEnquiryResponse,
    },

    actions: {

    
        async doNameEnquiry(toast:any, payload:{}){
            const response = await FundsTransferController.nameEnquiry(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.nameEnquiryResponse= responseData.data
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData)
                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async doTransfer(toast:any, payload:{}){
            const response = await FundsTransferController.transfer(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                    console.log(responseData)
                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

    }
})