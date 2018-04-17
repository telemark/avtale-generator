const normalizeContact = require('tfk-dsf-normalize-contact')
const filterGuardian = require('../filter-guardian')
const logger = require('../logger')
const formatSvarUtRecipient = require('../format-svarut-recipient')

function generateSvarutTitle (data) {
  let title = 'Brev fra videregående skole'
  return title
}

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
    if (data.dsf !== false) {
      let recipients = [
        normalizeContact(data.dsf.HOV)
      ]
      let distribution = {
        _id: data._id,
        title: generateSvarutTitle(data),
        agreementId: data.agreementId,
        agreementUserId: data.agreementUserId
      }
      if (data.requiresGuardianSignature !== false) {
        const parents = filterGuardian(data.dsf)
        logger('info', ['setup-distribution', data._id, 'requiresGuardianSignature', parents.length])
        const normalized = parents.map(normalizeContact)
        data.recipientCopies = normalized
        data.guardiansFound = normalized.length
        data.recipientCopies.forEach(recipient => recipients.push(recipient))
      } else {
        logger('info', ['setup-distribution', data._id, 'requiresGuardianSignature', false])
      }
      data.distribution = distribution
      data.agreementParts = recipients.map(formatSvarUtRecipient)
    } else {
      logger('error', ['setup-distribution', data._id, 'missing dsf data'])
    }
    resolve(data)
  })
}
