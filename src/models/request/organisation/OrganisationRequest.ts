

class OrganisationRequest {
  static createOrganisation = {
    organisationAddress: null,
    organisationName: null,
    userEmail: null,
    userFirstName: null,
    userLastName: null,
    userPassword: null,
    userPhone: null,
    userRoleId: 0
  }

  static completeCreateOrganisation = {
    organisationAddress: null,
    organisationName: null,
    otp: null,
    referralCode: null,
    userEmail: null
  }
}

export default OrganisationRequest