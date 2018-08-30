const slugify = require('@sindresorhus/slugify')
const uuid = require('../generate-uuid')
const saveFile = require('../save-file')
const validateKor = require('../validate-kor')
const validateDistribution = require('../validate-distribution')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-distribution', data._id])
    if (data.errors.length === 0 && data.agreementParts.length > 0 && data.distribution && data.sendToDistribution === true && data.restrictedAddress === false) {
      logger('info', ['save-to-distribution', data._id, 'no errors', 'saving to distribution'])
      const jobs = data.agreementParts.map(async part => {
        const korIsValid = validateKor(part.kor)
        const validatedDistribution = validateDistribution(data.distribution, korIsValid)
        delete part.kor
        const job = {
          _id: uuid(),
          agreementId: data.agreementId,
          agreementUserId: data.agreementUserId,
          agreementType: data.agreementType,
          agreementName: data.agreementName,
          created: data.created,
          dueDays: data.dueDays,
          requireDigitalSignature: data.requireDigitalSignature,
          shipment: Object.assign({}, validatedDistribution),
          documents: [{
            data: data.agreementDocumentData,
            filnavn: `${slugify(data.agreementName)}.pdf`,
            mimetype: 'application/pdf',
            skalSigneres: data.requireDigitalSignature && korIsValid
          }],
          recipients: [part]
        }
        const fileName = `${config.DISTRIBUTION_DIRECTORY_PATH}/${job._id}.json`
        await saveFile({ filePath: fileName, data: job })
      })
      await Promise.all(jobs)
    } else {
      if (data.sendToDistribution === false || !data.distribution) {
        logger('info', ['save-to-distribution', data._id, 'nothing to distribute'])
        if (data.restrictedAddress === true) {
          logger('info', ['save-to-distribution', data._id, 'restricted address'])
        }
      } else {
        logger('warn', ['save-to-distribution', data._id, 'errors', data.errors.length])
      }
    }
    resolve(data)
  })
}
