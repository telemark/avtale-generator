const uuid = require('../generate-uuid')
const getAge = require('get-age')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = data => {
  return new Promise((resolve, reject) => {
    const addons = {
      errors: [],
      agreementId: uuid(),
      agreementUserId: data.personalId,
      archive: {
        _id: data._id
      },
      agreementParts: [],
      requiresGuardianSignature: getAge(dateFromPersonalId(data.personalId)) < 18 && data.type === 'elevpc',
      agreementTemplate: 'elevpc'
    }
    resolve(Object.assign(data, addons))
  })
}
