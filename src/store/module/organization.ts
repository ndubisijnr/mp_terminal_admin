import { defineStore } from 'pinia'
import {OrganisationController} from "@/service/OrganisationController.ts";
import { currentOrganisation } from '@/models/response/organisation/CurrentOrganisation';
import StoreUtils from '@/util/storeUtils';

export const useOrganisationStore = defineStore('organisation_Store', {
    state: () => ({
        loading: false,
        organisations:null,
        currentOrganisation:{} as currentOrganisation,
        onboardingStage:'1',
        organisationStats:null,
        organisationPricing:null
    }),

    getters: {
        getOrganisation:state => state.organisations,
        getLoading: state => state.loading,
        getCurrentOrganisation:state => state.currentOrganisation,
        getOnboardingStage:state => state.onboardingStage,
        getOrganisationStats:state => state.organisationStats,
        getOrganisationPricing:state => state.organisationPricing

    },

    actions: {
        async readCustomerOrganisation(){
            const response = await OrganisationController.readOrganisation()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.organisations= responseData.data
                    this.currentOrganisation = responseData.data[0]
                    // sessionStorage.mid = this.currentOrganisation.mid

                    StoreUtils.getter()?.terminal?.getOrganisationTerminal()

                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async createOrganisation(payload:any, toast:any){
            const response = await OrganisationController.intiateCreateOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    this.onboardingStage = '2'

                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        },

        async organisationCreateCharges(payload:{}, toast:any){
            const response = await OrganisationController.organisationCreateCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.organisation.readCustomerOrganisation()
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
                    this.organisationStats = responseData.data
                }else{
                    console.log(responseData)

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
            await StoreUtils.getter()?.organisation.readOrganisationPricing(organisationId)
            await StoreUtils.getter()?.terminal.readOrganisationTerminalOrganisationId(organisationId)


        },

        async completeCreateOrganisation(payload:any, toast:any){
            const response = await OrganisationController.completeCreateOrganisation(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                     this.onboardingStage = '1'
                     StoreUtils.getter().organisation.readCustomerOrganisation()

                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
            }catch(e){}
        },


    }
})