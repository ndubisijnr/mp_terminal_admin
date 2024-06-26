import { defineStore } from 'pinia'
import {OrganisationController} from "@/service/OrganisationController.ts";

export const useOrganisationStore = defineStore('organisation_Store', {
    state: () => ({
        loading: false,
        organisation:null,
    }),

    getters: {
        getOrganisation:state => state.organisation,
        getLoading: state => state.loading,
    },

    actions: {
        async readCustomerOrganisation(payload:any){
            const response = await OrganisationController.readOrganisation(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisation= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async createOrganisation(payload:any, toast:any){
            const response = await OrganizationController.createOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        },


    }
})