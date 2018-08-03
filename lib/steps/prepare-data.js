const getAge = require('get-age')
const getTemplate = require('avtale-templates')
const uuid = require('../generate-uuid')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const template = getTemplate(data.type)
    const addons = {
      errors: [],
      agreementId: uuid(),
      agreementUserId: data.personalId,
      agreementType: data.type,
      agreementName: template.name,
      created: new Date().getTime(),
      archive: {
        _id: data._id
      },
      agreementParts: [],
      requireGuardianSignature: getAge(dateFromPersonalId(data.personalId)) < 18 && template.requireGuardianSignature === true,
      requireGuardianConsent: getAge(dateFromPersonalId(data.personalId)) < 18 && template.requireGuardianConsent === true,
      agreementTemplate: data.type,
      sendToDistribution: true
    }
    resolve(Object.assign(data, addons))
  })
}
