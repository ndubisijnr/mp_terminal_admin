import { apiClient } from "./BaseService.ts"
import {LoginRequest} from "@/models/request/auth/LoginRequest.ts";
import {CompleteEnrollment, InitialEnrollment} from "@/models/request/auth/RegisterRequest.ts";
import {CompletePasswordReset, InitialPasswordReset} from "@/models/request/auth/PasswordReset.ts";
import {ResendOtpRequest} from "@/models/request/auth/ResendOtpRequest.ts";

export default {
    login(payload: LoginRequest){
        return apiClient.appClient.post(`/dev/authentication/login`, payload)
    },
    initiateEnrolment(payload: InitialEnrollment){
        return apiClient.appClient.post(`/dev/authentication/initiate-enrollment`, payload)
    },
    completeEnrolment(payload: CompleteEnrollment){
        return apiClient.appClient.post(`/dev/authentication/complete-enrollment`, payload)
    },
    initiatePasswordReset(payload: InitialPasswordReset){
        return apiClient.appClient.post(`/dev/authentication/initiate-password-reset`, payload)
    },
    completePasswordReset(payload: CompletePasswordReset){
        return apiClient.appClient.post(`/dev/authentication/complete-password-reset`, payload)
    },
    resendOtp(payload: ResendOtpRequest){
        return apiClient.appClient.post(`/dev/authentication/resend-otp`, payload)
    },
    userDetails(){
        return apiClient.appClient.get(`/dev/authentication/user-details`)
    },
}