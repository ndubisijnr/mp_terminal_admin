import { defineStore } from 'pinia'
import StoreUtils from '@/util/storeUtils';
import DocumentController from "@/service/DocumentController.ts";
export const useDocumentStore = defineStore('document_Store', {
    state: () => ({
        loading: false,
        documents:null
    }),

    getters: {
        getLoading: state => state.loading,
        getDocuments: state => state.documents,

    },

    actions: {

        async readDocument(){
            const response = await DocumentController.read()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.documents = responseData.data
                }
                else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async createDocument(payload:{ },toast:any){

            const response = await DocumentController.create(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().document.readDocument()
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async updateDocument(payload:{ },toast:any){

            const response = await DocumentController.update(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().document.readDocument()
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async deleteDocument(payload:{ },toast:any){
            const response = await DocumentController.delete(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().document.readDocument()
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

    }
})