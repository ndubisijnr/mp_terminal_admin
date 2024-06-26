import { defineStore } from 'pinia'
import {TerminalController} from "@/service/TerminalController.ts";
import {ReadByTerminalOrganization} from "@/models/response/terminal/ReadByTerminalOrganization.ts";

export type TerminalStoreState = {
    loading: boolean,
    terminalOrganizes: ReadByTerminalOrganization
}
export const useTerminalStore = defineStore('terminal_store', {
    state: ():TerminalStoreState  => ({
        loading: false,
        terminalOrganizes: {} as ReadByTerminalOrganization,
    }),

    getters: {
        getTerminalOrganizes:state => state.terminalOrganizes,
        getLoading: state => state.loading,
    },

    actions: {
        async readOrganizationTerminal(payload: string){
            const response = await TerminalController.readOrganizationTerminal(payload)
            const responseData = response.data
            console.log('readOrganizationTerminal', response)

            try{
                if(responseData.responseCode === '00'){
                    this.terminalOrganizes= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData)
                }
            }catch(e){
                console.log('readOrganizationTerminal error', e)
            }
        },

    }
})