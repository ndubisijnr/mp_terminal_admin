import { apiClient } from "./BaseService.js"
export default {
    readUsers(){
        return apiClient.appClient.get(`/dev/user/read`)
    },
    
}