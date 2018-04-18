const logger = require('../logger')
const generateDocumentData = require('../generate-document-data')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-agreement', data._id])
    const agreementDocumentData = await generateDocumentData(data.document)
    data.agreementDocumentData = agreementDocumentData
    resolve(data)
  })
}
