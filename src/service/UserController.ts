import { apiClient } from "./BaseService.js"
export default {
    readUsers(payload){
        return apiClient.appClient.post(`/dev/terminal/read`, payload)
    },
    
}