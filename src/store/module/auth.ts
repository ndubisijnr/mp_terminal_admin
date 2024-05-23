import { defineStore } from 'pinia'

type State={
    loading: boolean,
    login: boolean
}
const auth = defineStore("auth", {
    state: (): State=>{
        return {
            loading: false,
            login: false
        }
    },
    getters: {
        getLoading: (state)=> state.loading,
        getLoading: (state)=> state.login,
    },
    actions: {

    }
})
