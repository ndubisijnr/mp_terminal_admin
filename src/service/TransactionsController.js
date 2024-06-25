import { apiClient } from "./BaseService"
export default {
    readTerminals(){
        return apiClient.appClient.post(`/dev/terminal/read`)
    },

    createTerminal(payload){
        return apiClient.appClient.post('/dev/terminal/create', payload)
    }
    
}