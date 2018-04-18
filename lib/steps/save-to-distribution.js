const uuid = require('uuid/v4')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-distribution', data._id])
    if (data.errors.length === 0 && data.agreementParts.length > 0 && data.distribution) {
      logger('info', ['save-to-distribution', data._id, 'no errors', 'saving to distribution'])
      const jobs = data.agreementParts.map(async part => {
        let job = {
          _id: uuid(),
          agreementId: data.agreementId,
          agreementUserId: data.agreementUserId
        }
        let distribution = Object.assign({}, data.distribution)
        distribution._id = uuid()
        distribution.dokumenter = [{
          data: data.agreementDocumentData,
          filnavn: `avtale-${data.agreementId}.pdf`,
          mimetype: 'application/pdf',
          skalSigneres: true
        }]
        distribution.mottaker = [
          part
        ]
        const fileName = `${config.DISTRIBUTION_DIRECTORY_PATH}/${distribution._id}.json`
        job.payload = distribution
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
