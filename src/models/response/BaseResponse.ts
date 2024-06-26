export type BaseResponse<T=any>  = {
    responseCode: string,
    responseMessage: string
    data: T
}