import { defineStore } from 'pinia'
import StoreUtils from '@/util/storeUtils';
import { ChargesController } from '@/service/ChargesController';
import InterChangeController from "@/service/InterChangeController.ts";

// export type ChargesStoreState = {
//     charges: null,
//     partnerCharges:null
// }

export const useChargesStore = defineStore('charges_store', {
    state: () => ({
        charges: null as null,
        partnerCharges: null as null,
        interChanges: null as null,
        routing:null as null,
        testDataResult:null as null,
        testDataType: null as null,
        testResponse: null as null,
        testRequest: null as null,
        packagers:null as null,
    }),

    getters: {
        getCharges:state => state.charges,
        getPartnerCharges:state => state.partnerCharges,
        getInterChanges:state => state.interChanges,
        getRouting:state => state.routing,
        getTestDataResult:state => state.testDataResult,
        getTestDataType:state => state.testDataType,
        getTestResponse:state => state.testResponse,
        getTestRequest:state => state.testRequest,
        getPackagers:state => state.packagers,
    },

    actions: {
        async getOrganizationCharges(){
            const response = await ChargesController.readCharges()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                   this.charges = responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async callPartnerCharges(){
            const response = await ChargesController.readPartnerCharges()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                   this.partnerCharges = responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createCharges(payload:{}, toast:any){
            const response = await ChargesController.createCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.charges.getOrganizationCharges()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async deleteCharges(payload:{}, toast:any){
            const response = await ChargesController.deleteCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.charges.getOrganizationCharges()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async deleteOrgCharges(payload:{}, toast:any){
            const response = await ChargesController.deleteOrganisationCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateCharges(payload:{}, toast:any){
            const response = await ChargesController.updateCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.charges.getOrganizationCharges()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateOrganisationCharges(payload:{}, toast:any){
            const response = await ChargesController.updateOrgCharges(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readInterChange(toast:any){
            const response = await InterChangeController.readInterChange()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.interChanges = responseData.data
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readRoutingRule(toast:any){
            const response = await InterChangeController.readRoutingRule()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.routing = responseData.data
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },


        async createInterChange(payload:{}, toast:any){
            const response = await InterChangeController.createInterChange(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    await StoreUtils.getter().charges.readInterChange(toast)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateInterChange(payload:{}, toast:any){
            const response = await InterChangeController.updateInterchange(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    await StoreUtils.getter().charges.readInterChange(toast)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateInterChangeComponent(payload:{}, toast:any){
            const response = await InterChangeController.updateInterchangeComponent(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    await StoreUtils.getter().charges.readInterChange(toast)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async testInterChange(payload:{}, toast:any){
            this.testResponse = null
            this.testRequest = null

            const response = await InterChangeController.interChangeTest(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.testResponse = responseData.response
                    this.testRequest = responseData.request
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readInterChangeTestData(toast:any){
            const response = await InterChangeController.interChangeTestData()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.testDataResult = responseData.data
                    await StoreUtils.getter().charges.readInterChange(toast)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readInterChangePackagers(){
            const response = await InterChangeController.readPackagers()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.packagers = responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readInterChangeTestDataType(toast:any){
            const response = await InterChangeController.interChangeTestDataType()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.testDataType = responseData.data
                    await StoreUtils.getter().charges.readInterChange(toast)
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createRoutingRule(payload:{}, toast:any){
            const response = await InterChangeController.createRoutingRule(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    await StoreUtils.getter().charges.readRoutingRule(toast)

                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateRoutingRule(payload:{}, toast:any){
            const response = await InterChangeController.updateRoutingRule(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    await StoreUtils.getter().charges.readRoutingRule(toast)

                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

    }
})