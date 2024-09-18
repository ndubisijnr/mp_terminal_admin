import { apiClient } from "./BaseService.ts"
export  class  ChargesController {
    static readCharges(){
        return apiClient.appClient.get(`pricing/read`)
    }

    static readPartnerCharges(){
        return apiClient.appClient.get(`provider-pricing/read`)
    }

    static readOrgCharges(){
        return apiClient.appClient.get(`organisation-pricing/read`)
    }

    static createCharges(payload:{}){
        return apiClient.appClient.post('pricing/create', payload)
    }

    static deleteCharges(payload:{}){
        return apiClient.appClient.post('pricing/delete', payload)
    }

    static deleteOrganisationCharges(payload:{}){
        return apiClient.appClient.post('organisation-pricing/delete', payload)
    }

    static updateCharges(payload:{}){
        return apiClient.appClient.post('pricing/update', payload)
    }
   
    static updateOrgCharges(payload:{}){
        return apiClient.appClient.post('organisation-pricing/update', payload)
    }
    
}