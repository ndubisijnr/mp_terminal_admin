import stores from '../store/index.js'

class StoreUtils {

    static getter() {
        if(stores)
            return stores
    }
    
} 

export default StoreUtils
