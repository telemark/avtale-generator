const getTemplate = require('avtale-templates')
const generateTitle = require('elev-varsel-generate-document-title')
const logger = require('../logger')
const generateDocumentData = require('../generate-document-data')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-restricted', data._id, 'start'])
    if (data.restrictedAddress) {
      logger('info', ['setup-restricted', data._id, 'create document'])
      const thisData = Object.assign({}, data, {documentCategory: 'restricted', documentTemplate: 'restricted'})
      const now = new Date()
      const template = getTemplate('restricted')
      const documentData = {
        title: generateTitle(thisData, true),
        offTitle: generateTitle(thisData),
        data: {
          dato: now
        },
        templateId: 'restricted',
        template: template.filePath,
        type: 'restricted',
        recipients: []
      }
      const restrictedDocumentData = await generateDocumentData(documentData)
      data.restrictedDocumentData = restrictedDocumentData
    } else {
      logger('info', ['setup-restricted', data._id, 'not restricted - pass through'])
    }
    resolve(data)
  })
}
