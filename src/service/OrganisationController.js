import { apiClient } from "./BaseService"
export default {
    readOrganisation(organisationCustomerId){
        return apiClient.appClient.get(`/dev/organisation/read-by-organisation-customer-id/${organisationCustomerId}`)
    },
    
}