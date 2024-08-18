import { apiClient } from "./BaseService.ts"

export default {
    login(payload:{}){
        return apiClient.appClient.post(`admin/login`, payload)
    },
    initiateEnrolment(payload: {}){
        return apiClient.appClient.post(`admin/initiate-enrollment`, payload)
    },
    completeEnrolment(payload: {}){
        return apiClient.appClient.post(`admin/complete-enrollment`, payload)
    },
    initiatePasswordReset(payload: {}){
        return apiClient.appClient.post(`admin/initiate-password-reset`, payload)
    },
    completePasswordReset(payload: {}){
        return apiClient.appClient.post(`admin/complete-password-reset`, payload)
    },
    resendOtp(payload: {}){
        return apiClient.appClient.post(`admin/resend-otp`, payload)
    },
    userDetails(){
        return apiClient.appClient.get(`admin/user-details`)
    },
}