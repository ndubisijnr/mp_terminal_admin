import {useAuthStore} from "./module/auth";
import { useOrganisationStore } from "./module/organization";
import { useTransactionStore } from "./module/transactions";



const stores = {
    auth:useAuthStore(),
    organisation:useOrganisationStore(),
    transactions:useTransactionStore()
}

export default stores