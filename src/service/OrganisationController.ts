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

    organisationAdminStats(startDate:string, endDate:string){
        return apiClient.appClient.get(`/dev/organisation/read-stats?startDate=${startDate}&endDate=${endDate}`)
    },


    organisationStats(organisationId:string, startDate:string, endDate:string){
        return apiClient.appClient.get(`/dev/organisation/organisation-stats/${organisationId}?startDate=${startDate}&endDate=${endDate}`)
    },

    organisationPricing(organisationPricingOrganisationId:string){
        return apiClient.appClient.get(`/dev/organisation-pricing/read-by-organisation-pricing-organisation-id/${organisationPricingOrganisationId}`)
    },
    
    readTransctionByOrganisationId(organisationId:string, startDate:string, endDate:string){
        return apiClient.appClient.get(`/dev/terminal-transaction/read-by-organisation-id/${organisationId}?startDate=${startDate}&endDate=${endDate}`)
    }
    
}