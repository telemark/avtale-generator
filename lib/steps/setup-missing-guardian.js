const getTemplate = require('document-templates')
const getSchoolsInfo = require('tfk-schools-info')
const datePadding = require('../date-padding')
const generateDocumentData = require('../generate-document-data')
const logger = require('../logger')

module.exports = async data => {
  logger('info', ['setup-missing-guardian', data._id, 'start'])
  if ((data.requireGuardianSignature !== false || data.requireGuardianConsent !== false) && data.guardiansFound === 0) {
    logger('info', ['setup-missing-guardian', data._id, 'create document'])
    const now = new Date()
    const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
    const template = getTemplate({ domain: 'avtaler', templateId: 'manuell-foresatt' })
    const agreementTemplate = getTemplate({ domain: 'avtaler', templateId: data.type })
    const school = getSchoolsInfo({ organizationNumber: data.organization })[0]
    const documentData = {
      title: template.name,
      offTitle: template.name,
      data: {
        dato: date,
        navnElev: data.dsfContactNormalized.fullName,
        navnSkole: school.officialName,
        navnAvtale: agreementTemplate.archive.Title
      },
      templateId: 'manuell',
      template: template.filePath,
      type: 'manuell',
      recipients: []
    }
    const missingGuardianDocumentData = await generateDocumentData(documentData)
    data.missingGuardianDocumentData = missingGuardianDocumentData
    logger('info', ['setup-missing-guardian', data._id, 'document created'])
  } else {
    logger('info', ['setup-missing-guardian', data._id, 'no guardian missing - pass through'])
  }
  return data
}
