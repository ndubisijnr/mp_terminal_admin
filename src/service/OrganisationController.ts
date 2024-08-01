import { apiClient } from "./BaseService.ts"

export const OrganisationController = {
    readOrganisation(){
        return apiClient.appClient.get(`/dev/organisation/read`)
    },
    // readOrganisation(organisationCustomerId:string){
    //     return apiClient.appClient.get(`/dev/organisation/read-by-organisation-user-id/${organisationCustomerId}`)
    // },

    intiateCreateOrganisation(payload:any){
        return apiClient.appClient.post(`/dev/authentication/initiate-enrollment`, payload)
    },

    completeCreateOrganisation(payload:any){
        return apiClient.appClient.post(`/dev/authentication/complete-enrollment`, payload)
    },
    
    organisationCreateCharges(payload:{}){
        return apiClient.appClient.post('/dev/organisation-pricing/create', payload)
    },

    

    organisationStats(organisationId:string, startDate:string, endDate:string){
        return apiClient.appClient.get(`/dev/organisation/organisation-stats/${organisationId}/${startDate}/${endDate}`)
    },

    organisationPricing(organisationPricingOrganisationId:string){
        return apiClient.appClient.get(`/{stage}/organisation-pricing/read-by-organisation-pricing-organisation-id/${organisationPricingOrganisationId}`)
    }
    
}