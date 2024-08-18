 export const globalDispatch = async (payload:any, toast:any, wait:any, controller:any, service:string, errorPosition:string) =>{
    try{
        const response = await controller[service](payload)
        const responseData = response.data
        console.log(responseData)
        await wait.stop('DATA_SUBMITTING')
        return responseData;
        
    }   
    catch(e){
    await wait.stop('DATA_SUBMITTING')
    await toast.error(e, { position: errorPosition, timeout: 3000 })
    }
}
