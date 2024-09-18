import { defineStore } from 'pinia'
import {OrganisationController} from "@/service/OrganisationController.ts";
import { currentOrganisation } from '@/models/response/organisation/CurrentOrganisation';
import StoreUtils from '@/util/storeUtils';

export const useOrganisationStore = defineStore('organisation_Store', {
    state: () => ({
        loading: false,
        organisations:null,
        currentOrganisation:{} as currentOrganisation,
        onboardingStage:'false',
        organisationStats:null as any,
        organisationPricing:null,
        adminStats:null as any,
        organisationTransaction:null
    }),

    getters: {
        getOrganisation:state => state.organisations,
        getLoading: state => state.loading,
        getCurrentOrganisation:state => state.currentOrganisation,
        getOnboardingStage:state => state.onboardingStage,
        getOrganisationStats:state => state.organisationStats,
        getOrganisationPricing:state => state.organisationPricing,
        getAdminStats:state => state.adminStats,
        getOrganisationTransaction:state => state.organisationTransaction



    },

    actions: {
        async readCustomerOrganisation(){
            if(!this.organisations) this.loading = true
            const response = await OrganisationController.readOrganisation()
            const responseData = response.data

            try{
                this.loading = false
                if(responseData.responseCode === '00'){
                    this.organisations= responseData.data
                    this.currentOrganisation = responseData.data[0]
                    // sessionStorage.mid = this.currentOrganisation.mid

                    StoreUtils.getter()?.terminal?.getOrganisationTerminal()

                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){
                this.loading = false
            }
        },

        async createOrganisation(payload:any, toast:any){
            const response = await OrganisationController.intiateCreateOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    if(this.onboardingStage === 'true') {
                        this.onboardingStage = 'false'
                        toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 1000 })
                    }else{
                        this.onboardingStage = 'true'
                    }
                
                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 1000 })
                }
            }catch(e){}
        },

        async organisationCreateCharges(payload:{}, toast:any){
            const response = await OrganisationController.organisationCreateCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 1000 })
                
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readOrganisationPricing(organisationPricingOrganisationId:string){
            const response = await OrganisationController.organisationPricing(organisationPricingOrganisationId)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisationPricing = responseData.data
                }else{
                    console.log(responseData)

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },


        async readOrganisationStats(organisationId:string, startDate:string, endDate:string){
            const response = await OrganisationController.organisationStats(organisationId,startDate,endDate)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisationStats = responseData
                }else{
                    console.log(responseData)

                }
            

            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
            

        },

        async readAdminStats(startDate:string, endDate:string){
            const response = await OrganisationController.organisationAdminStats(startDate,endDate)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.adminStats = responseData
                }else{
                    console.log(responseData)

                }
            

            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
            

        },

        async completeCreateOrganisation(payload:any, toast:any){
            const response = await OrganisationController.completeCreateOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                     this.onboardingStage = 'false'
                     StoreUtils.getter().organisation.readCustomerOrganisation()

                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async readOrganisationTransactionsByOrganisationId(payload:string, startDate:string, endDate:string, searchParam:string){
            const config = {
                headers: {
                    mid: payload // Setting mid header before making the request
                }
            };
            const response = await OrganisationController.readTransctionByOrganisationId(payload, startDate, endDate, searchParam, config)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisationTransaction= responseData.data
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },


    }
})