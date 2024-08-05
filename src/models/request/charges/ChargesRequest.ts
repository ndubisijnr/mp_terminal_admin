class ChargesRequest {
  static createChargesRequest = {
    pricingAmount: null,
    pricingAmountType: null,
    pricingCode: null,
    pricingDescription: null,
    pricingMaxAmount: null,
    pricingMinAmount: null,
    pricingType: null
  }

  static organisationCreateChargesRequest = {
    organisationPricingAmount: null,
    organisationPricingAmountType: null,
    organisationPricingBeneficiaryOrganisationId: 0,
    organisationPricingCode: null,
    organisationPricingDescription: null,
    organisationPricingMaxAmount: null,
    organisationPricingMinAmount: null,
    organisationPricingOrganisationId: null,
    organisationPricingType: null

  }

  static deleteCharges = {
    pricingId: null
  }

  static deleteOrgCharges = {
    organisationPricingPricingId: null
  }
}

export default ChargesRequest 
