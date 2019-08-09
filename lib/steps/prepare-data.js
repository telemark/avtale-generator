const getAge = require('get-age')
const getTemplate = require('document-templates')
const nanoid = require('nanoid')
const dateFromPersonalId = require('birthdate-from-id')
const logger = require('../logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const template = getTemplate({ domain: 'avtaler', templateId: data.type })
    let addons = {
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
    if (process.env.NODE_ENV === 'development') {
      logger('info', ['steps', 'prepare-data', 'isDevelopment', 'adds dummy data'])
      const dummydata = {
        p360Data: {},
        p360Contact: {
          PrivateAddress: {
            StreetAddress: 'Snippestadvegen 28'
          }
        },
        p360Elevmappe: {
          CaseNumber: '12334577/178-87',
          Recno: 98765432
        }
      }
      addons = Object.assign({}, addons, dummydata)
    }
    resolve(Object.assign(data, addons))
  })
}
