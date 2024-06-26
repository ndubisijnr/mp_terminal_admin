import {useAuthStore} from "./module/auth";
import { useOrganisationStore } from "./module/organization";
import {useTerminalStore} from "@/store/module/terminal.ts";


const stores = {
    auth: useAuthStore(),
    organisation: useOrganisationStore(),
    terminal: useTerminalStore(),
}

export default stores