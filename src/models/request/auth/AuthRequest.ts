class AuthRequest{

    static InitiateEnrollmentRequest = {
        organisationAddress:null,
        organisationName:	null,
        userEmail:	null,
        userFirstName:	null,
        userLastName:	null,
        userPassword:	null,
        userPhone:	null,
        userRoleId:	0

    }

    static CompleteEnrollmentRequest = {
        organisationAddress:	null,
        organisationName:	null,
        otp:	null,
        referralCode:	null,
        userEmail:	null
    }

    static LoginRequest = {
        adminEmail: null,
        adminPassword: null,
        deviceId: null,
        latitude: null,
        longitude: null,
        otp: null
    }



    static InitiatePasswordResetRequest = {
        userEmail:	null,
    }

    static CompletePasswordResetRequest = {
        otp:	null,
        userEmail:	null,
        userPassword:	null,
        }

}

export default AuthRequest