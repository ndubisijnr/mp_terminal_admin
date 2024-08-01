import {BaseResponse} from "@/models/response/BaseResponse.ts";

export type ReadByTerminalOrganization = BaseResponse<ReadByTerminalOrganizationData>

export type ReadByTerminalOrganizationData = {
    terminalAccountNumber: string,
    terminalCallHomeTimeInHours: number,
    terminalCardAcceptorId: string,
    terminalCountryCode: string,
    terminalCreatedAt: string,
    terminalCurrencyCode: string,
    terminalId: string,
    terminalMcc: string,
    terminalMerchantNameLocation: string,
    terminalOrganisationId: number,
    terminalPin: string,
    terminalSerialNumber: string,
    terminalStatus: string,
    terminalTimeOutInSeconds: number,
    terminalUpdatedAt: string,
    tid: number
}