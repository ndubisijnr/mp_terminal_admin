import stores from '../store'

class StoreUtils {

    static getter() {
        if(stores)
            return stores
    }
    
} 

export default StoreUtils
