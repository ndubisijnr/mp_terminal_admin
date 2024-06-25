import { apiClient } from "./BaseService"
export default {
    login(payload){
        return apiClient.appClient.post(`/dev/authentication/login`, payload)
    },
    initiateEnrolment(payload){
        return apiClient.appClient.post(`/dev/authentication/initiate-enrollment`, payload)
    },
    completeEnrolment(payload){
        return apiClient.appClient.post(`/dev/authentication/complete-enrollment`, payload)
    },
    initiatePasswordReset(payload){
        return apiClient.appClient.post(`/dev/authentication/initiate-password-reset`, payload)
    },
    completePasswordReset(payload){
        return apiClient.appClient.post(`/dev/authentication/complete-password-reset`, payload)
    },
    resendOtp(payload){
        return apiClient.appClient.post(`/dev/authentication/resend-otp`, payload)
    },
    userDetails(){
        return apiClient.appClient.get(`/dev/authentication/user-details`)
    },
}