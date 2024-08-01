import { apiClient } from "./BaseService.ts"

export default {
    login(payload:{}){
        return apiClient.appClient.post(`/dev/admin/login`, payload)
    },
    initiateEnrolment(payload: {}){
        return apiClient.appClient.post(`/dev/admin/initiate-enrollment`, payload)
    },
    completeEnrolment(payload: {}){
        return apiClient.appClient.post(`/dev/admin/complete-enrollment`, payload)
    },
    initiatePasswordReset(payload: {}){
        return apiClient.appClient.post(`/dev/admin/initiate-password-reset`, payload)
    },
    completePasswordReset(payload: {}){
        return apiClient.appClient.post(`/dev/admin/complete-password-reset`, payload)
    },
    resendOtp(payload: {}){
        return apiClient.appClient.post(`/dev/admin/resend-otp`, payload)
    },
    userDetails(){
        return apiClient.appClient.get(`/dev/admin/user-details`)
    },
}