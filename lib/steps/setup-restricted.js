const getTemplate = require('avtale-templates')
const getSchoolsInfo = require('tfk-schools-info')
const datePadding = require('../date-padding')
const generateDocumentData = require('../generate-document-data')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-restricted', data._id, 'start'])
    if (data.restrictedAddress) {
      logger('info', ['setup-restricted', data._id, 'create document'])
      const now = new Date()
      const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
      const template = getTemplate('restricted')
      const agreementTemplate = getTemplate(data.type)
      const school = getSchoolsInfo({organizationNumber: data.organization})[0]
      const documentData = {
        title: template.name,
        offTitle: template.name,
        data: {
          dato: date,
          navnElev: data.dsfContactNormalized.fullName,
          navnSkole: school.officialName,
          navnAvtale: agreementTemplate.archive.Title
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
