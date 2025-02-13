import { defineStore } from 'pinia'
import UserController from '@/service/UserController'
import StoreUtils from '@/util/storeUtils'

export const useUser_Store = defineStore('user_Store', {
    state: () => ({
        loading: false,
        users:null,
        adminUsers:null
    }),

    getters: {
        getUsers:state => state.users,
        getAdminUsers:state => state.adminUsers,
        getLoading: state => state.loading,
    },

    actions: {

    
        async readAdminUsers(pageNo:number){
            const response = await UserController.readAdminUsers(pageNo)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.adminUsers= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },

        async readUsers(){
            const response = await UserController.readUsers()
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    this.users= responseData.data
                    console.log(responseData)
                }else{
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },


        // async readByUsersId(payload:string){
        //     const response = await UserController.readByUsersID(payload)
        //     const responseData = response.data
        //
        //     try{
        //         if(responseData.responseCode === '00'){
        //             this.users= responseData.data
        //             console.log(responseData)
        //         }else{
        //             console.log(responseData.responseCode)
        //         }
        //     }catch(e){}
        // },

        async createUsers(payload:{}, toast:any){
            const response = await UserController.createAdminUsers(payload)
            const responseData = response.data

            try{
                if(responseData.responseCode === '00'){
                    toast.success(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    StoreUtils.getter()?.user.readAdminUsers(1)
                    console.log(responseData)
                }else{
                    toast.error(responseData.responseMessage, { position: 'bottom-right', timeout: 3000 })
                    console.log(responseData.responseCode)
                }
            }catch(e){}
        },



    }
})