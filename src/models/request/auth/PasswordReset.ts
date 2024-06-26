export type InitialPasswordReset = {
    userEmail: string
}

export type CompletePasswordReset = {
    otp: string,
    userEmail: string,
    userPassword: string}