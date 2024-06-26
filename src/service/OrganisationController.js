import { apiClient } from "./BaseService"
export default {
    readOrganisation(organisationCustomerId){
        return apiClient.appClient.get(`/dev/organisation/read-by-organisation-customer-id/${organisationCustomerId}`)
    },

    createOrganisation(payload){
        return apiClient.appClient.post(`/dev/organisation/create`, payload)
    },
    
}