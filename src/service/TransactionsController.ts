import { apiClient } from "./BaseService.js"
export default {
    readTerminals(){
        return apiClient.appClient.post(`/dev/terminal/read`)
    },

    createTerminal(payload: any){
        return apiClient.appClient.post('/dev/terminal/create', payload)
    }
    
}