import { apiClient } from "./BaseService"

export const OrganisationController = {
    readOrganisation(organisationCustomerId: string){
        return apiClient.appClient.get(`/dev/organisation/read-by-organisation-customer-id/${organisationCustomerId}`)
    },

}