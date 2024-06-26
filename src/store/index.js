import {useAuthStore} from "./module/auth";
import { useOrganisationStore } from "./module/organization";


const stores = {
    auth:useAuthStore(),
    organisation:useOrganisationStore()
}

export default stores