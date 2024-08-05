class TerminalRequest {
    static createTerminal= {
        terminalOrganisationId: null,
        terminalPin: null,
        terminalSerialNumber: null,
      }

    static deleteTerminal = {
      terminalId: null
    }  

    static changeTerminalPin = {
      terminalId: null,
      terminalPin: null
    }  

    static uploadTerminalSerial = {
      terminalPin: null,
      terminalSerialName: null,
      terminalSerialNumber: null,
      terminalSerialVersion: null
    }

}

export default TerminalRequest