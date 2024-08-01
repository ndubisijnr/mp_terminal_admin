import { defineStore } from 'pinia'
import {TerminalController} from "@/service/TerminalController.ts";
import StoreUtils from '@/util/storeUtils';


export const useTerminalStore = defineStore('terminal_store', {
    state: () => ({
        loading: false,
        terminalOrganisations: null,
        terminalOrganisationTransactions:null,
        organisationTerminal:null
    }),

    getters: {
        getTerminalOrganisations:state => state.terminalOrganisations,
        getTerminalOrganisationTransactions:state => state.terminalOrganisationTransactions,
        getLoading: state => state.loading,
        getOrganisationTerminals:state => state.organisationTerminal
    },

    actions: {
        async getOrganisationTerminal(){
            const response = await TerminalController.readTerminals()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.terminalOrganisations= responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readTerminalTransactionByTerminalId(terminalId:string){
            const response = await TerminalController.readTerminaTransactionByTerminalId(terminalId)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.terminalOrganisationTransactions= responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readOrganisationTerminalOrganisationId(OrganisationId:string){
            const response = await TerminalController.readOrganisationTerminal(OrganisationId)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.organisationTerminal= responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createNewTerminal(payload:any, toast:any){
            const response = await TerminalController.createTerminal(payload)
            const responseData = response.data
            console.log('readOrganizationTerminal', response)

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.getOrganisationTerminal()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateTerminal(payload:any, toast:any){
            const response = await TerminalController.updateTerminal(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.getOrganisationTerminal()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async deleteTerminal(payload:{}, toast:any){
            const response = await TerminalController.deleteTerminal(payload)
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