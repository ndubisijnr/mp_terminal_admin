import { apiClient } from "./BaseService.ts"
export  class  TerminalController {
    static readTerminals(){
        return apiClient.appClient.get(`terminal/read`)
    }
    
    static createTerminal(payload:{}){
        return apiClient.appClient.post('terminal/create', payload)
    }

    static createTerminalSerial(payload:{}){
        return apiClient.appClient.post('terminal-serial/create', payload)
    }

    static createBulkTerminalSerial(payload:{}){
        return apiClient.appClient.post('terminal-serial/bulk-create', payload)
    }

    static readTerminalSerial(){
        return apiClient.appClient.get('terminal-serial/read')
    }

    static reAssignTerminal(payload:{}){
        return apiClient.appClient.post('terminal/reassign', payload)
    }
    static changeTerminalPin(payload:{}){
        return apiClient.appClient.post('terminal/change-pin', payload)
    }

    static updateTerminal(payload:{}){
        return apiClient.appClient.post('terminal/update', payload)
    }

    static readOrganisationTerminal(payload: string){
        return apiClient.appClient.get(`terminal/read-by-terminal-organization-id/${payload}`)
    }

    static deleteTerminal(payload: {}){
        return apiClient.appClient.post(`terminal/delete`, payload)
    }

    static readTerminaTransactionByOrganisationId(organisationId: string){
        return apiClient.appClient.post(`terminal-transaction/read-by-terminal-transaction-organisation-id/${organisationId}`)
    }

    static readTerminaTransactionByTerminalId(terminalId: string,page:string,size:string,startDate:string,endDate:string,searchParam:string){
        return apiClient.appClient.get(`terminal-transaction/read-by-terminal-id/${terminalId}?page=${page}&pageSize=${size}&startDate=${startDate}&endDate=${endDate}&searchParam=${searchParam}`)
    }

    static readTerminalMapping(){
        return apiClient.appClient.get(`terminal-mapping/read`)
    }

    static createTerminalMapping(payload: { }){
        return apiClient.appClient.post(`terminal-mapping/create`, payload)
    }
    static updateTerminalMapping(payload:{}){
        return apiClient.appClient.post(`terminal-mapping/update`, payload)
    }

    static deleteTerminalMapping(payload:{}){
        return apiClient.appClient.post(`terminal-mapping/delete`, payload)
    }

    static bulkCreateTerminalMapping(payload:{}){
        return apiClient.appClient.post(`terminal-mapping/bulk-create`, payload)
    }

   
}