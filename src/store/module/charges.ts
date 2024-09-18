import { defineStore } from 'pinia'
import StoreUtils from '@/util/storeUtils';
import { ChargesController } from '@/service/ChargesController';

// export type ChargesStoreState = {
//     charges: null,
//     partnerCharges:null
// }

export const useChargesStore = defineStore('charges_store', {
    state: () => ({
        charges: null as null,
        partnerCharges: null as null
    }),

    getters: {
        getCharges:state => state.charges,
        getPartnerCharges:state => state.partnerCharges,
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

        

    }
})