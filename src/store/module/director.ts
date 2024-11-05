import { defineStore } from 'pinia'
import DirectorController from "@/service/DirectorController.ts";

export const useDirectorStore = defineStore('director_Store', {
    state: () => ({
        loading: false,
        directors: Array,
    }),

    getters: {
        getDirectors:state => state.directors,
        getLoading: state => state.loading,
    },


    actions: {
        async readDirectors(){
            const response = await DirectorController.read()
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    this.directors = responseData.data
                }
                else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async createDirector(payload:{ },toast:any){

            const response = await DirectorController.create(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async updateDocument(payload:{ },toast:any){

            const response = await DirectorController.update(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async deleteDocument(payload:{ },toast:any){
            const response = await DirectorController.delete(payload)
            const responseData = response.data
            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                }
                else{
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },
    }
})