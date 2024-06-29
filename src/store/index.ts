import {useAuthStore} from "./module/auth";
import { useOrganisationStore } from "./module/organization";
import {useTerminalStore} from "@/store/module/terminal.ts";
import { useChargesStore } from "./module/charges";
import { useUser_Store } from "./module/users";

const stores = {
    auth: useAuthStore(),
    organisation: useOrganisationStore(),
    terminal: useTerminalStore(),
    charges:useChargesStore(),
    user:useUser_Store()
}

export default stores