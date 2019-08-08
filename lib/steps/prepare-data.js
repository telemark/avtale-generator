const getAge = require('get-age')
const getTemplate = require('document-templates')
const nanoid = require('nanoid')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const template = getTemplate({ domain: 'avtaler', templateId: data.type })
    const addons = {
      errors: [],
      agreementId: nanoid(),
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
      sendToDistribution: true,
      dropDistribution: false,
      restrictedDocumentData: false,
      missingGuardianDocumentData: false,
      needsDummyGuardian: false
    }
    resolve(Object.assign(data, addons))
  })
}
