import {createPinia} from "pinia";
import {watch} from "vue";


const pinia = createPinia()
pinia.use((context)=>{
    const storeId = context.store.$id
    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }
    
    const fromJson = serializer.deserialize(localStorage.getItem(storeId)!)

    if (fromJson){
        context.store.$patch(fromJson)
    }


    watch(
        ()=> pinia.state.value[storeId],
        (state)=>{
            // console.log(serializer.serialize(state))
            localStorage.setItem(storeId, serializer.serialize(state))
        },
        {
            deep: true
        })
})

export default pinia