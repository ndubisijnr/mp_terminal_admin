import {createPinia} from "pinia";
import {watch} from "vue";

const pinia = createPinia()
const key = "state"

    //todo if $key exist assign it to general pinia state
    if (localStorage.getItem(key)){
        pinia.state.value = JSON.parse(localStorage.getItem(key))
    }

watch(
    pinia.state,
    (state)=>{
        localStorage.setItem(key, JSON.stringify(state))
    },
    {deep: true}
)

export const store = pinia