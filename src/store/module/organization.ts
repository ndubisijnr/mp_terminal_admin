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

    }
})