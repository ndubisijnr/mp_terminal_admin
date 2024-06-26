import { apiClient } from "./BaseService.ts"
export  class  TerminalController {
    static readTerminals(){
        return apiClient.appClient.get(`/dev/terminal/read`)
    }

    static createTerminal(payload: any){
        return apiClient.appClient.post('/dev/terminal/create', payload)
    }

    static readOrganizationTerminal(payload: string){
        return apiClient.appClient.get(`/dev/terminal/read-by-terminal-organization-id/${payload}`)
    }
    
}