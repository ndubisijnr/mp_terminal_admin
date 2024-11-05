import {useAuthStore} from "./module/auth";
import { useOrganisationStore } from "./module/organization";
import {useTerminalStore} from "@/store/module/terminal.ts";
import { useChargesStore } from "./module/charges";
import { useUser_Store } from "./module/users";
import { useTransactionStore } from "./module/transactions";
import {useFundTransfer_Store} from "./module/fundtransfer"
import {useDocumentStore} from "./module/document";
import {useDirectorStore} from "./module/director";

const stores = {
    auth: useAuthStore(),
    organisation: useOrganisationStore(),
    terminal: useTerminalStore(),
    charges:useChargesStore(),
    user:useUser_Store(),
    transactions:useTransactionStore(),
    fundTransfer:useFundTransfer_Store(),
    document:useDocumentStore(),
    director:useDirectorStore()
}

export default stores