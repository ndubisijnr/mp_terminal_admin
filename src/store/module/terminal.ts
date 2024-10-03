import { defineStore } from 'pinia'
import {TerminalController} from "@/service/TerminalController.ts";
import StoreUtils from '@/util/storeUtils';


export const useTerminalStore = defineStore('terminal_store', {
    state: () => ({
        loading: false,
        terminalOrganisations: null,
        terminalOrganisationTransactions:null,
        organisationTerminal:null,
        terminalSerials:null,
        terminalMapping:null
    }),

    getters: {
        getTerminalOrganisations:state => state.terminalOrganisations,
        getTerminalOrganisationTransactions:state => state.terminalOrganisationTransactions,
        getLoading: state => state.loading,
        getOrganisationTerminals:state => state.organisationTerminal,
        getTerminalSerial:state => state.terminalSerials,
        getTerminalMapping:state => state.terminalMapping
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

        async readTerminalTransactionByTerminalId(terminalId:string,page:string,size:string,startDate:string,endDate:string,searchParam:string){
            const response = await TerminalController.readTerminaTransactionByTerminalId(terminalId,page,size,startDate,endDate,searchParam)
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
                    StoreUtils.getter()?.terminal.readTerminalSerial()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async reAssignTerminal(payload:any, toast:any){
            const response = await TerminalController.reAssignTerminal(payload)
            const responseData = response.data
            console.log('readOrganizationTerminal', response)

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.getOrganisationTerminal()
                    StoreUtils.getter()?.terminal.readTerminalSerial()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async changePin(payload:any, toast:any){
            const response = await TerminalController.changeTerminalPin(payload)
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


        async readTerminalSerial(){
            const response = await TerminalController.readTerminalSerial()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.terminalSerials = responseData.data
                
                }else{
                    console.log(responseData)

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async uploadNewTerminalSerial(payload:any, toast:any){
            const response = await TerminalController.createTerminalSerial(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.readTerminalSerial()
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async uploadBulkTerminalSerial(payload:any, toast:any){
            const response = await TerminalController.createBulkTerminalSerial(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.terminal.readTerminalSerial()
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
            const response = await TerminalController.deleteTerminalMapping(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().terminal.readTerminalMapping()

                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createTerminalMapping(payload:{}, toast:any){
            const response = await TerminalController.createTerminalMapping(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().terminal.readTerminalMapping()
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async updateTerminalMapping(payload:{}, toast:any){
            const response = await TerminalController.updateTerminalMapping(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().terminal.readTerminalMapping()

                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }else{
                    console.log(responseData)
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })

                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async readTerminalMapping(){
            const response = await TerminalController.readTerminalMapping()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){

                    this.terminalMapping = responseData.data
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

        async createBulkTerminalMapping(payload:{}, toast:any){
            const response = await TerminalController.createBulkTerminalSerial(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    await StoreUtils.getter().terminal.readTerminalMapping()

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