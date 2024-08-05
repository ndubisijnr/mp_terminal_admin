import stores from '../store'

class StoreUtils {
    static getter() {
        return stores
    }

    static commit(store:any, state:any, data:any){
        const s:any = this.getter()[store]
        s[state] = data
        return s
    }
} 

export default StoreUtils
