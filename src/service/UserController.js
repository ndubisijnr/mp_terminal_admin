import { apiClient } from "./BaseService"
export default {
    readUsers(payload){
        return apiClient.appClient.post(`/dev/terminal/read`, payload)
    },
    
}