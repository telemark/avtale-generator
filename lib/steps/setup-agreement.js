const logger = require('../logger')
const generateDocumentData = require('../generate-document-data')

module.exports = async data => {
  logger('info', ['setup-agreement', data._id])
  const agreementDocumentData = await generateDocumentData(data.document)
  data.agreementDocumentData = agreementDocumentData
  return data
}
