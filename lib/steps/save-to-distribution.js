const uuid = require('../generate-uuid')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-distribution', data._id])
    if (data.errors.length === 0 && data.agreementParts.length > 0 && data.distribution) {
      logger('info', ['save-to-distribution', data._id, 'no errors', 'saving to distribution'])
      const jobs = data.agreementParts.map(async part => {
        const job = {
          _id: uuid(),
          agreementId: data.agreementId,
          agreementUserId: data.agreementUserId,
          agreementType: data.agreementType,
          created: data.created,
          dueDays: data.dueDays,
          shipment: Object.assign({}, data.distribution),
          documents: [{
            data: data.agreementDocumentData,
            filnavn: `avtale-${data.agreementId}.pdf`,
            mimetype: 'application/pdf',
            skalSigneres: true
          }],
          recipients: [part]
        }
        const fileName = `${config.DISTRIBUTION_DIRECTORY_PATH}/${job._id}.json`
        await saveFile({filePath: fileName, data: job})
      })
      await Promise.all(jobs)
    } else {
      if (data.sendToDistribution === false || !data.distribution) {
        logger('info', ['save-to-distribution', data._id, 'nothing to distribute'])
      } else {
        logger('warn', ['save-to-distribution', data._id, 'errors', data.errors.length])
      }
    }
    resolve(data)
  })
}
