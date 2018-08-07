const logger = require('../logger')
const datePadding = require('../date-padding')
const getSchoolInfo = require('tfk-schools-info')
const slugify = require('@sindresorhus/slugify')
const getTemplate = require('avtale-templates')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['setup-parts', data._id, data.agreementTemplate])
    const now = new Date()
    const schoolInfo = getSchoolInfo({organizationNumber: data.organization.replace(/\D/g, '')})[0]
    const recipient = data.dsfContactNormalized
    const contacts = data.agreementParts.map(item => ({ ReferenceNumber: item.fnr, Role: 'Mottaker' }))
    const template = getTemplate(data.type)
    let archive = {}
    archive._id = data._id
    archive.date = `${datePadding(now.getDate())}.${datePadding(now.getMonth() + 1)}.${now.getFullYear()}`
    archive.case = {
      generator: 'elevmappe-add-case',
      title: 'Elevmappe',
      unofficialTitle: `Elevmappe - ${recipient.fullName}`,
      type: 'elevmappe',
      accessCode: '13',
      accessGroup: 'TFK-robot',
      status: 'B',
      paragraph: 'Offl §13 jfr Fvl §13.1',
      subArchive: 'Elev',
      responsibleEnterpriseRecno: '506',
      responsiblePersonRecno: '200333'
    }

    archive.contacts = [
      {
        generator: 'add-private-person',
        personalIdNumber: recipient.personalIdNumber,
        firstName: recipient.firstName,
        middleName: recipient.middleName || '',
        lastName: recipient.lastName,
        fullName: recipient.fullName,
        email: data.studentMail || '',
        phone: data.studentPhone || '',
        streetAddress: recipient.address || '',
        zipCode: recipient.zip,
        zipPlace: recipient.city,
        area: 'Telemark',
        caseContact: 'Sakspart',
        secret: data.restrictedAddress
      }
    ]

    archive.documents = [
      {
        generator: 'add-documents',
        title: template.archive.Title,
        unofficialTitle: `${template.archive.Title} - ${recipient.fullName}`,
        accessCode: template.archive.AccessCode,
        accessGroup: schoolInfo.accessGroup,
        signOff: false,
        documentCreated: now.toISOString(),
        category: template.archive.Category,
        paragraph: template.archive.Paragraph,
        archive: 'Saksdokument',
        status: template.archive.Status,
        responsibleEnterpriseNumber: data.organization,
        responsiblePersonRecno: '200333',
        contacts,
        file: {
          title: `${slugify(data.agreementName)}.pdf`,
          fileName: `${slugify(data.agreementName)}.pdf`,
          data: data.agreementDocumentData
        }
      }
    ]
    data.archive = archive
    resolve(data)
  })
}
